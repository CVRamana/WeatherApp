/**
 * React Native App
 * https://github.com/facebook/react-native
 *
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,

} from 'react-native';
import WeatherHome from './src/container/WeatherHome';

const App = () => {
  return (
    <SafeAreaView >
      <WeatherHome />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

});

export default App;
