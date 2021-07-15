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
import { Provider } from 'react-redux';
import store from './src/redux_modules/Store';

const App = () => {
  return (
    <Provider store={store}>
      <WeatherHome />
     </Provider>
  );
};

const styles = StyleSheet.create({

});

export default App;
