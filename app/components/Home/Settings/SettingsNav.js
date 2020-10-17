import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import {Root} from 'native-base';

import Settings from './Settings.js';
import ProfileSettings from './ProfileSettings.js';
import Policy from './Policy.js';
import Contact from './Contact.js';
import About from './About.js';
import OrderHistory from './OrderHistory.js';
import UpdateBilling from './UpdateBilling.js';

class SettingsNav extends React.Component {

 render() {

        const Stack = createStackNavigator();

    return (
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='Settings'>
          <Stack.Screen name='Settings' component={Settings} />
          <Stack.Screen name='ProfileSettings' component={ProfileSettings} />
          <Stack.Screen name='Policy' component={Policy} />
          <Stack.Screen name='Contact' component={Contact} />
          <Stack.Screen name='About' component={About} />
          <Stack.Screen name='OrderHistory' component={OrderHistory} />
          <Stack.Screen name='UpdateBilling' component={UpdateBilling} />
        </Stack.Navigator>
    );

 }
}
export default SettingsNav;
