import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image, Alert, BackHandler, ActivityIndicator
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
const vector4 = '<svg viewBox="0 0 360 267" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.31859 266.999C52.3328 75.1111 294.468 249.083 358.921 44.1234L359.318 266.584L1.31859 266.999Z" fill="#EB5757" fill-opacity="0.66"/><path d="M2.08044 266.792C53.437 36.7365 295.262 245.713 360.08 0L360.08 266.792L2.08044 266.792Z" fill="#EB5757" fill-opacity="0.8"/><path d="M0.318595 267C51.5439 112.991 294.293 252.554 359 88.0513L359.318 266.584L0.318595 267Z" fill="#EB5757" fill-opacity="0.9"/></svg>';
//request.time < timestamp.date(2020, 20, 12);

class Login extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      secureText: true,
      icon: 'eye-off',
      email: '',
      password: '',
      loginPressed: false,
      buttonOpacity: 1,
    }
  }


  saveData = (res) => {
    firestore().collection('users').doc(res.user.uid).get().
      then(data => {
        this.setState({currentUserData: data._data});
        this.setState({loginPressed: false, buttonOpacity: 1});
        this.props.login(data._data);
      }).
      catch(error => console.log(error));
  }

  loginUser = () => {
    this.setState({loginPressed: true, buttonOpacity: 0.5});
    if(this.state.email == '' || this.state.password == ''){
          if(this.state.email == '') Toast.show({
               text: "Please Input Email",
               buttonText: "Okay",
               duration: 3000,
               type: "warning",
             })
            else       Toast.show({
                           text: "Please Input Passowrd",
                           buttonText: "Okay",
                           duration: 3000,
                           type: "warning",
                         })
                         this.setState({loginPressed: false, buttonOpacity: 1});

    } else {
      auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        console.log(res);
        this.saveData(res)
      })
      .catch(error => {
        console.log(error);
        Toast.show({
                 text: "Wrong Password",
                 buttonText: "Okay",
                 duration: 3000,
                 type: "error",
               })
               this.setState({loginPressed: false, buttonOpacity: 1});

      })

    }
  }

  toggle = () => {
    if(this.state.secureText){
      this.setState({icon: 'eye', secureText: false})
    } else {
      this.setState({icon: 'eye-off', secureText: true})
    }
}

  render(){
    return(<View style={{backgroundColor: 'white', flex: 1}}>
      <Image source={require('../../assets/images/background.png')} style={{height: height, width: width, position: 'absolute'}} />
      <View style={styles.LoginForm}>
      <View style={styles.PageText}>
            <Text style={{fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: 40, color: '#505050', alignSelf: 'center'}}>Welcome</Text>
      </View>

          <Item rounded style={{borderRadius: 10, marginBottom: 3*height/100}}>
            <Input placeholder='Email' style={{ fontFamily: fontStyle.FONT_FAMILY_REGULAR}} selectionColor='#EB5757' onChangeText={(email) => this.setState({email: email})} />
          </Item>

          <Item rounded style={{borderRadius: 10, marginBottom: 3*height/100}}>
            <Input placeholder='Passowrd' style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR}} selectionColor='#EB5757' secureTextEntry={this.state.secureText} onChangeText={(password) => this.setState({password: password})} />
            <Icon name={this.state.icon} style={{ color: '#828282'}} onPress={this.toggle.bind(this)}/>
          </Item>

          <View style={styles.SignupSubText}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
            <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 16, color: '#828282', }}>Forgot Your Password?</Text>
            </TouchableOpacity>
         </View>

          <View>

              <Button androidRippleColor full style={{height: 7*height/100, borderRadius: 10, width: 80*width/100, alignSelf: 'center', opacity: this.state.buttonOpacity, marginBottom: 2*height/100, backgroundColor: '#EB5757', justifyContent: 'center'}} onPress={() => this.loginUser()} >
                {this.state.loginPressed ? <View><ActivityIndicator size="small" color='white' /></View> :  <View></View> }
                <Text style={{ fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: 18, color: 'white'}}>Login</Text>
              </Button>

          </View>

          <View style={styles.copyright}>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')} style={{alignSelf: 'center', flexDirection: 'row'}} >
          <Text style={{ fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 16, color: '#4C4C4C',}}>Dont Have An Account? </Text>
            <Text style={{ fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 16, color: '#EB5757', }}>Signup</Text>
          </TouchableOpacity>

          <View style={{flexDirection: 'row', justifyContent: 'center', marginVertical: 1*height/100,}}>
          <Svg  width="130" height="1" viewBox="0 0 130 1" fill="none" style={{marginTop: 10}}>
              <Line x1="0.994995" y1="0.5" x2="130" y2="0.5" stroke="#828282" opacity="0.5"/>
            </Svg>
            <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 18, color: '#828282', alignSelf: 'center'}}> OR </Text>

            <Svg width="130" height="1" viewBox="0 0 130 1" fill="none" style={{marginTop: 10}}>
              <Line x1="0.994995" y1="0.5" x2="130" y2="0.5" stroke="#828282" opacity="0.5"/>
            </Svg>
          </View>

          <TouchableOpacity onPress={() => this.props.navigation.navigate('PhoneAuth')} style={{alignSelf: 'center'}} >
          <Text style={{ fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 16, color: '#4C4C4C',}}>Signin With The Phone No</Text>
          </TouchableOpacity>
          </View>

      </View>

</View>
    );
  }
}

const styles = StyleSheet.create({
  PageText: {
    height: 13*height/100,
    paddingTop: 5*height/100,
  },
  LoginForm: {
    height: 75*height/100,
    paddingHorizontal: 8*width/100,
    paddingTop: 20*height/100,
  },

  InputBox: {
      borderWidth: 3,
      borderRadius: 10,
  },

  copyright: {
    marginTop: 1*height/100,
    height: 7*height/100,
    alignSelf: 'center',
    justifyContent: 'center',
  },

  SignupText: {},
  SignupSubText: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 2*height/100,
  },
});


const mapDispatchToProps = dispatch => {
  return {
    login: (loginData) => dispatch({type: 'LOGIN', data: loginData})
  }
}
export default connect(null, mapDispatchToProps)(Login);
