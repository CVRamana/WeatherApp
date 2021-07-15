import React, { useEffect,useState } from 'react';
import { Text, View,Platform,PermissionsAndroid,ToastAndroid } from 'react-native';
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
function WeatherHome() {
    const [state, setState] = useState({
        location: '',
        locationData: {},
        isLocationLoading: false,
    })

    useEffect(() => {
        getLocation()
    }, [])

    const getLocation = async () => {
        const hasLocationPermission1 = await hasLocationPermission();
        if (hasLocationPermission1) {
            setState({ ...state, isLocationLoading: true })
            Geolocation.getCurrentPosition(
                (info) => {
                    console.log('get the location::', info);
                    getAddress(info.coords)
                },
                (error) => {
                    console.log('err in current loc', error);
                    //   utils.commonFunctions.showSnackbar(error.message)

                    if (error.code === 1 || error.code === 2) {
                        state.isLocationLoading = false
                        state.showPermissionPopUp = true
                        setState({ ...state })
                        // Linking.openSettings();
                    }
                },
                {
                    enableHighAccuracy: true,
                    timeout: 15000,
                },
            );
        } else {
            setState({ ...state, isLocationLoading: false })

        }
    }

    const getAddress = (coords) => {
        const lat = coords.latitude;
        const long = coords.longitude;

        //@ts-ignore
        Geocoder.init('AIzaSyBcbkKQqrkjSKNmkq_2ke83nqkyniogrnQ', { language: "en" });
        //@ts-ignore
        Geocoder.from(
            lat, long)
            .then((res) => {
                setState({
                    ...state,
                    isLocationLoading: false
                })
            })
            .catch((error) => {
                console.warn(error)
                setState({
                    ...state,
                    isLocationLoading: false
                })
            });

    }

    const hasLocationPermission = async () => {
        if (Platform.OS === 'ios') {
            const hasPermission = await hasPermissionIOS();
            return hasPermission;
        }

        if (Platform.OS === 'android' && Platform.Version < 23) {
            return true;
        }

        const hasPermission = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (hasPermission) {
            return true;
        }

        const status = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (status === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
        }

        if (status === PermissionsAndroid.RESULTS.DENIED) {
            ToastAndroid.show(
                'Location permission denied by user.',
                ToastAndroid.LONG,
            );
        } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            ToastAndroid.show(
                'Location permission revoked by user.',
                ToastAndroid.LONG,
            );
        }

        return false;
    };

    return (
        < View >
            <Text>WeatherHome</Text>
        </View >
    )
}

export default WeatherHome;
