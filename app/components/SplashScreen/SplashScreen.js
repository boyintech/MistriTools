import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
   Pressable, BackHandler, Alert
} from 'react-native';

import {Button} from 'native-base';

import * as fontStyle from '../../common/stylesheet/fontStyle.js';
import { TouchableOpacity, TouchableNativeFeedback } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
const {height, width} = Dimensions.get('screen');


class SplashScreen extends React.Component {

  constructor(props){
    super(props);

  }
        onButtonPress = () => {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

        handleBackButton = () => {
          if(this.props.navigation.isFocused()){
         Alert.alert(
             'Exit App',
             'Exit the application?', [{
                 text: 'Cancel',
                 onPress: () => console.log('Cancel Pressed'),
                 style: 'cancel'
             }, {
                 text: 'OK',
                 onPress: () => BackHandler.exitApp()
             }, ], {
                 cancelable: false
             }
          )
          return true;
         // BackHandler.exitApp()
       }
      }


  componentDidMount() {
    auth().onAuthStateChanged(user => {
       if(user)
          this.props.navigation.navigate('Home');
    })
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

  }

  render(){
    return(
     <View style={styles.background}>
         <View style={styles.image}>
                <Image source={require('../../assets/images/SplashScreen.jpg')} style={{height: 30*height/100, width: width,}} />
         </View>

         <View style={styles.main}>
                <View style={styles.WelcomeText}>
                        <Text style={{alignSelf: 'center', fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 20, color: 'white'}}>Welcome to MistriTools</Text>
                        <Text style={{alignSelf: 'center', fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 18, color: 'white'}}>Find Your Nearby Mechanics Instantly</Text>
                </View>

                <View style={styles.Buttons}>

                  <Button androidRippleColor full rounded style={{height: 7*height/100, width: 90*width/100, alignSelf: 'center', marginBottom: 2*height/100, backgroundColor: 'white', justifyContent: 'center'}} onPress={() => this.props.navigation.navigate('Login')} >
                    <Text style={{ fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: 18, color: '#3B97D3'}}>Login</Text>
                  </Button>

                  <Button androidRippleColor full rounded style={{height: 7*height/100, width: 90*width/100, alignSelf: 'center', backgroundColor: '#3B97D3', justifyContent: 'center', marginBottom: 2*height/100}} onPress={() => this.props.navigation.navigate('Register')}>
                    <Text style={{ fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: 18, color: 'white',}}>Register</Text>
                  </Button>
                </View>

                <View style={styles.copyright}>
                <Text style={{alignSelf: 'center', fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 15, color: 'white'}}>MistriTools © 2020-21</Text>
                </View>
         </View>
     </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
      backgroundColor: '#FCFCFC',
      flex: 1,
  },
  image: {
    height: 60*height/100,
    justifyContent: 'center'
  },
  main: {
      height: 40*height/100,
      backgroundColor: '#EC6262',
      paddingTop: 3*height/100,
  },
  WelcomeText: {
    height: 5*height/100
  },
  Buttons: {
    height: 20*height/100,
    paddingVertical: 4*height/100,
  },
  copyright: {
    marginTop: 3*height/100
  },

});

export default SplashScreen;
