import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {Root} from 'native-base';
import {Provider} from 'react-redux';

import SplashScreen from './components/SplashScreen/SplashScreen.js';
import Login from './components/Login/Login.js';
import Register from './components/Register/Register.js';
import Home from './components/Home/Home.js';
import Policy from './components/Register/Policy.js';
import store from './store/';
import PhoneAuth from './components/Login/PhoneAuth.js';

class App extends React.Component {

 render() {

        const Stack = createStackNavigator();

    return (
      <Provider store={store}>
      <Root>
      <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='SplashScreen'>
          <Stack.Screen name='SplashScreen' component={SplashScreen} />
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='Policy' component={Policy} />
          <Stack.Screen name='PhoneAuth' component={PhoneAuth} />
          <Stack.Screen name='Register' component={Register} />
        </Stack.Navigator>
      </NavigationContainer>
      </Root>
      </Provider>
    );

 }
}
export default App;
