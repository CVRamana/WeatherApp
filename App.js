/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import LottieLoader from './src/components/LottieLoader';

const App = () => {
  return (
    <SafeAreaView >
      <LottieLoader />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

});

export default App;
