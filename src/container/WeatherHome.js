import React, { useEffect, useState } from 'react';
import { Text, View, Platform, PermissionsAndroid, ToastAndroid } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { create } from 'apisauce'
function WeatherHome() {
    const [state, setState] = useState({
        location: '',
        locationData: {},
        isLocationLoading: false,
    })
    const url = 'http://api.openweathermap.org/'
    useEffect(() => {
        getLocation()
    }, [])

    const getLocation = async () => {
        const hasLocationPermission1 = await hasLocationPermission();
        if (hasLocationPermission1) {
            setState({ ...state, isLocationLoading: true })
            Geolocation.getCurrentPosition(
                (info) => {
                    state.locationData = info.coords
                    setState({ ...state })
                    console.log('get the location::', info);
                    getWeatherData(info.coords)
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

    const getWeatherData = (coords) => {
        const api = create({
            baseURL: url,
            headers: {
                Accept: 'application/vnd.github.v3+json',
            },
        })
        api
            .get('/data/2.5/forecast/daily?' +
                'lat=' + coords?.latitude +
                '&lon=' +
                coords?.longitude +
                '&cnt=' + 10 +
                '&appid=a06f88b08950ff9766cd6b4ce437c0e5')
            .then(response => console.log(response))
            .then(console.log)

    }
    return (
        < View >
            <Text>WeatherHome</Text>
        </View >
    )
}

export default WeatherHome;
