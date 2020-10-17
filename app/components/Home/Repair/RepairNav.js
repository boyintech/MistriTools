import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {Root} from 'native-base';

import Repair from './Repair.js';
import ShopPage from './ShopPage.js';
import ItemPage from './ItemPage.js';
import { TransitionSpecs, HeaderStyleInterpolators } from '@react-navigation/stack';

const MyTransition = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  cardStyleInterpolator: ({ current, next, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
          {
            scale: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.9],
                })
              : 1,
          },
        ],
      },
      overlayStyle: {
        opacity: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.5],
        }),
      },
    };
  },
}

class RepairNav extends React.Component {

 render() {

        const Stack = createStackNavigator();

    return (
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Repair'>
          <Stack.Screen name='Repair' component={Repair} options={{
    title: 'Custom animation',
    ...MyTransition,
  }} />
          <Stack.Screen name='ShopPage' component={ShopPage} options={{
    title: 'Custom animation',
    ...MyTransition,
  }} />
          <Stack.Screen name='ItemPage' component={ItemPage} options={{
    title: 'Custom animation',
    ...MyTransition,
  }} />
        </Stack.Navigator>
    );

 }
}
export default RepairNav;
