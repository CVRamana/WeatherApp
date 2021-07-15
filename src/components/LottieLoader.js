import React from 'react';
import { StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import constants from '../constants';

const LottieLoader = (props) => (

   // props.isLoading
   true
     ? <LottieView
        source={constants.images.lottieLoader}
        autoPlay
        loop
        style={styles.loaderStyle}
    /> : null

);

const styles = StyleSheet.create({
    loaderStyle: {
        alignSelf: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.1)'
    }
})
export default LottieLoader;
