import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

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
        Geocoder.init(googleAPIKey, { language: "en" });
        //@ts-ignore
        Geocoder.from(
            lat, long)
            .then((res) => {

                if (res?.results.length === 0) {
                    let inCaseOfZeroResults = {}
                    inCaseOfZeroResults = {
                        formatted_address: res.plus_code?.compound_code,
                        geometry: {
                            location: {
                                lat: coords?.latitude,
                                lng: coords?.longitude
                            }
                        }
                    }
                    setState({ ...state, locationData: res.results[0], isLocationLoading: false })
                    setTimeout(() => {
                        if (fromCreatePost) {
                            navigation.navigate(constants.screens.CREATE_POST, { postsLocation: inCaseOfZeroResults })
                        } else {
                            navigation.navigate(constants.screens.EDIT_POST, { postsLocation: inCaseOfZeroResults })
                        }

                    }, 600);

                } else {
                    setState({ ...state, locationData: res.results[0], isLocationLoading: false })
                    setTimeout(() => {
                        if (fromCreatePost) {
                            navigation.navigate(constants.screens.CREATE_POST, { postsLocation: res.results[0] })
                        } else {
                            navigation.navigate(constants.screens.EDIT_POST, { postsLocation: res.results[0] })
                        }

                    }, 600);
                }
            })
            .catch((erro) => {
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
