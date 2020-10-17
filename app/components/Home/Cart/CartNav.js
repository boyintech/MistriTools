import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {Root} from 'native-base';

import Cart from './Cart.js';
import OrderSuccess from './OrderSuccess.js';

class CartNav extends React.Component {

 render() {

        const Stack = createStackNavigator();

    return (
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Cart'>
          <Stack.Screen name='Cart' component={Cart} />
          <Stack.Screen name='OrderSuccess' component={OrderSuccess} />
        </Stack.Navigator>
    );

 }
}
export default CartNav;
