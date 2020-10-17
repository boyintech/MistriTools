import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image
} from 'react-native';

import axios from 'axios';
import {List, Item, Input, Button, Label, Icon, Toast} from 'native-base';
import Awesome from 'react-native-vector-icons/FontAwesome';
import Svg, {SvgXml, Path, Line} from 'react-native-svg';
import IconAnt from 'react-native-vector-icons/AntDesign';
import * as fontStyle from '../../common/stylesheet/fontStyle.js';
import { TouchableOpacity } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {connect} from 'react-redux';

const {height, width} = Dimensions.get('screen');

class PhoneAuth extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      phone: '',
      confirmResult: null,
      verificationCode: '',
      userId: ''
    }
  }

  handleSendCode = () => {
  // Request to send OTP
  if (!this.validatePhoneNumber()) {
      auth()
      .signInWithPhoneNumber('+918795346669')
      .then(confirmResult => {
      //   console.log(confirmResult)
        this.setState({ confirmResult });
        confirmResult.confirm('123456').then(res=> console.log(res)).catch(err => console.log(err))
      })
      .catch(error => {
        alert(error.message)

        console.log(error)
      })
  } else {
    alert('Invalid Phone Number')
  }
}

  validatePhoneNumber = () => {
  var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/
  return regexp.test(this.state.phone)
}

  render(){
    return(
      <View style={{flex: 1, backgroundColor: 'white'}}>
      <Image source={require('../../assets/images/down.png')} style={{height: height, width: width, position: 'absolute'}} />
      <Item rounded style={{borderRadius: 10, marginBottom: 3*height/100, marginTop: 10*height/100, marginHorizontal: 10*width/100}}>
        <Input placeholder='Phone No.' style={{ fontFamily: fontStyle.FONT_FAMILY_REGULAR}} selectionColor='#EB5757' onChangeText={(phone) => this.setState({phone: phone})} />
      </Item>

      <Button androidRippleColor full style={{height: 7*height/100, borderRadius: 10, width: 80*width/100, alignSelf: 'center', marginBottom: 2*height/100, backgroundColor: '#EB5757', justifyContent: 'center'}} onPress={() => this.handleSendCode()} >
        <Text style={{ fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: 18, color: 'white'}}>Login</Text>
      </Button>
      </View>
    )
  }

}

export default PhoneAuth;
