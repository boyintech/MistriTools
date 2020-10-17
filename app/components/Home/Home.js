import React, {Component} from 'react';
import {View, Text, Image, Dimensions} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IconFoundation from 'react-native-vector-icons/Foundation'
import IconEntypo from 'react-native-vector-icons/Entypo';

import * as fontStyle from '../../common/stylesheet/fontStyle.js';

import RepairNav from './Repair/RepairNav.js';
import News from './News/News.js';
import CartNav from './Cart/CartNav.js';
import SettingsNav from './Settings/SettingsNav.js';

const {height, width} = Dimensions.get('screen');

const Tab = createBottomTabNavigator();

class App extends React.Component {

  getTabBarVisibility = (route) => {
    const routeName = route.state
      ? route.state.routes[route.state.index].name
      : '';

    if (routeName === 'ShopPage' || routeName === 'ItemPage') {
      return false;
    }

    return true;
  }

  render(){

    return(
            <Tab.Navigator
            tabBarOptions={{
            activeTintColor: '#EB5757',
            inactiveTintColor: '#6D6868',
            allowFontScaling: true,
            tabStyle: {
                height: 9*height/100,
            },
            labelStyle: {
              fontFamily: fontStyle.FONT_FAMILY_REGULAR,
              fontSize: 14,
              marginBottom: 1*height/100,
            },
            style: {
                height: 9*height/100,
                borderRadius: 10,
                elevation: 5,
            }
            }}

            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'Repair') {
                  if(focused) return(<View><Image source={require('../../assets/icons/car.png')} style={{height: 4*height/100, width: 4*height/100, tintColor: '#EB5757'}} /></View>)
                  else return(<View><Image source={require('../../assets/icons/car.png')} style={{height: 4*height/100, width: 4*height/100,}} /></View>)

                } else if (route.name === 'News') {

                  if(focused) return(<View><Image source={require('../../assets/icons/news.png')} style={{height: 4*height/100, width: 4*height/100, tintColor: '#EB5757'}} /></View>)
                  else return(<View><Image source={require('../../assets/icons/news.png')} style={{height: 4*height/100, width: 4*height/100,}} /></View>)

                } else if( route.name == 'Cart'){
                    if(focused) return(<View><Image source={require('../../assets/icons/cart.png')} style={{height: 4*height/100, width: 4*height/100, tintColor: '#EB5757'}} /></View>)
                    else return(<View><Image source={require('../../assets/icons/cart.png')} style={{height: 4*height/100, width: 4*height/100, tintColor: '#6D6868' }} /></View>)

                } else if( route.name == 'Settings'){
                    if(focused) return(<View><Image source={require('../../assets/icons/settings.png')} style={{height: 4*height/100, width: 4*height/100, tintColor: '#EB5757'}} /></View>)
                    else return(<View><Image source={require('../../assets/icons/settings.png')} style={{height: 4*height/100, width: 4*height/100,}} /></View>)
                 }
                     },
                  })}

           >
              <Tab.Screen name="Repair" component={RepairNav} options={({ route }) => ({tabBarVisible: this.getTabBarVisibility(route)})} keyboardHidesTabBar={true} />
              <Tab.Screen name="Cart" component={CartNav} />
              <Tab.Screen name="Settings" component={SettingsNav} />
            </Tab.Navigator>
    );
  }
}

export default App;
