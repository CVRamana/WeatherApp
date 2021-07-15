import React, { useEffect, useState } from 'react';
import { Text, View, Platform, PermissionsAndroid, ToastAndroid, StyleSheet, FlatList } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { create } from 'apisauce'
import { useSelector, useDispatch } from 'react-redux';
import { SAVE_WEATHER_DATA } from '../redux_modules/type';
import LottieLoader from "../components/LottieLoader";

function WeatherHome() {
    const [state, setState] = useState({
        locationData: {},
        isLocationLoading: false,
    })
    const weatherData = useSelector(state => state.data)
    const dispatch = useDispatch()

    const url = 'http://api.openweathermap.org/'
    useEffect(() => {
        getLocation()
        console.log('Store data', weatherData)
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
            .get('/data/2.5/weather?' +
                'lat=' + coords?.latitude +
                '&lon=' +
                coords?.longitude +
                '&cnt=' + 10 +
                // 'q='+'London,uk'+
                '&appid=d54fcf5fca82fa199c6765c4ea8145b3')
            .then(response => {
                console.log(response.data)
                dispatch({ type: SAVE_WEATHER_DATA, weatherData: response.data })
            })


    }
    return (
        < View style={styles.container} >
            <View style={styles.upperBox}>
                <Text style={styles.txt}>
                    {weatherData?.main?.temp}
                </Text>
                <Text style={[styles.txt, { fontSize: 40 }]}>
                    {weatherData?.name}
                </Text>
            </View>
            <View>
                <FlatList
                    data={weatherData?.name}
                    keyExtractor={(item)=>(item+index).toString()}
                    renderItem={() => {
                        return (
                            <View style={{ width: '100%', justifyContent: 'space-between' }}>
                                <Text style={styles.txt}>
                                    {weatherData?.main?.temp}
                                </Text>
                                <Text style={[styles.txt, { fontSize: 40 }]}>
                                    {weatherData?.name}
                                </Text>
                            </View>
                        )
                    }}
                />
            </View>
            {/* <LottieLoader/> */}
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    upperBox: {
        height: '40%',
        width: '100%',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    txt: {
        fontSize: 40
    }
})

export default WeatherHome;
