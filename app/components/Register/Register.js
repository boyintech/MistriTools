import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image, ActivityIndicator
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

const {height, width} = Dimensions.get('screen');
const vector4 = '<svg viewBox="0 0 360 267" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.31859 266.999C52.3328 75.1111 294.468 249.083 358.921 44.1234L359.318 266.584L1.31859 266.999Z" fill="#EB5757" fill-opacity="0.66"/><path d="M2.08044 266.792C53.437 36.7365 295.262 245.713 360.08 0L360.08 266.792L2.08044 266.792Z" fill="#EB5757" fill-opacity="0.8"/><path d="M0.318595 267C51.5439 112.991 294.293 252.554 359 88.0513L359.318 266.584L0.318595 267Z" fill="#EB5757" fill-opacity="0.9"/></svg>';

class Register extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      secureText: true,
      icon: 'eye-off',
      name: '',
      email: '',
      password: '',
      cpass: '',
      phone_no: '',
      loginPressed: false,
      buttonOpacity: 1
    }
  }


  registerUser = async() => {
    this.setState({loginPressed: true, buttonOpacity: 0.5});
    if(this.state.name == '' || this.state.email == '' || this.state.password == '' || this.state.cpass == '' || this.state.phone_no == ''){
      Toast.show({
               text: "Please Input All Fields First",
               buttonText: "Okay",
               duration: 3000,
               type: "warning",
             })
             this.setState({loginPressed: false, buttonOpacity: 1})
    } else if(this.state.password !== this.state.cpass){
      Toast.show({
               text: "Passwords Are Not Same",
               buttonText: "Okay",
               duration: 3000,
               type: "warning",
             })
             this.setState({loginPressed: false, buttonOpacity: 1});

    } else if(this.state.phone_no.length < 10){
      Toast.show({
               text: "Invalid Phone Number",
               buttonText: "Okay",
               duration: 3000,
               type: "warning",
             })
             this.setState({loginPressed: false, buttonOpacity: 1});

    }
    else {
      await auth().createUserWithEmailAndPassword(this.state.email, this.state.password).
            then((res) => {
              console.log(res.user.uid);
              firestore().collection('users').doc(res.user.uid).set({
                name: this.state.name,
                phone_no: '+91'+this.state.phone_no,
                email: this.state.email,
                password: this.state.password,
                uid: res.user.uid,
                billing_details: {
                  billing_city: 'Set City',
                  billing_name: this.state.name,
                  billing_state: 'Set State',
                  billing_street: 'Set Street',
                  billing_country: 'India',
                  billing_pincode: 'Set Picode',
                  billing_telephone: this.state.phone_no,
                }
              }).then(() => {
                console.log("User Created");
                this.setState({loginPressed: false, buttonOpacity: 1});
              })
                .catch(error => {
                  Toast.show({
                           text: "Wrong Email",
                           buttonText: "Okay",
                           duration: 3000,
                           type: "error",
                         })}
                )
                this.setState({loginPressed: false, buttonOpacity: 1});

            }).
            catch(error => {
              this.setState({loginPressed: false, buttonOpacity: 1});
              console.log(error)});
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
    return(<View style={{backgroundColor: 'white',}}>
      <Image source={require('../../assets/images/bgreg.png')} style={{height: height, width: width, position: 'absolute', marginTop: -2*height/100}} />
      <View style={styles.PageText}>
            <Text style={{fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: 50, color: 'white'}}>Register</Text>
      </View>

      <View style={styles.LoginForm}>

      <Item floatingLabel style={{borderRadius: 10, marginBottom: 3*height/100}}>
            <Label style={{color: '#828282', marginLeft: 3*width/100, fontFamily: fontStyle.FONT_FAMILY_REGULAR}}>Full Name</Label>
            <Input selectionColor='#EB5757' onChangeText={(name) => this.setState({name: name})} />
          </Item>

          <Item floatingLabel style={{borderRadius: 10, marginBottom: 3*height/100}}>
            <Label style={{color: '#828282', marginLeft: 3*width/100, fontFamily: fontStyle.FONT_FAMILY_REGULAR}}>Email Address</Label>
            <Input selectionColor='#EB5757' onChangeText={(email) => this.setState({email: email})} />
          </Item>

          <Item floatingLabel style={{borderRadius: 10, marginBottom: 3*height/100}}>
            <Label style={{color: '#828282', marginLeft: 3*width/100, fontFamily: fontStyle.FONT_FAMILY_REGULAR}}>Password</Label>
            <Input selectionColor='#EB5757' onChangeText={(password) => this.setState({password: password})} />
          </Item>

          <Item floatingLabel style={{borderRadius: 10, marginBottom: 3*height/100}}>
            <Label style={{color: '#828282', marginLeft: 3*width/100, fontFamily: fontStyle.FONT_FAMILY_REGULAR}}>Confirm Password</Label>
            <Input selectionColor='#EB5757' onChangeText={(cpass) => this.setState({cpass: cpass})} />
          </Item>

          <Item inlineLabel style={{borderRadius: 10, marginBottom: 3*height/100}}>
            <Label style={{color: '#828282', marginLeft: 3*width/100, fontFamily: fontStyle.FONT_FAMILY_REGULAR}}>+91</Label>

            <Input selectionColor='#EB5757' onChangeText={(phone_no) => this.setState({phone_no: phone_no})} placeholder="Phone Number" style={{color: '#cbcbcb', fontFamily: fontStyle.FONT_FAMILY_REGULAR}} />
          </Item>

          <View style={styles.SignupSubText}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Policy')}>
            <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 14, color: '#828282', marginBottom: 1*height/100}}>* Please Read Our <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 14, color: '#EB5757', marginBottom: 1*height/100}}>Terms & Conditions.</Text></Text>
            <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 14, color: '#828282', }}>* By Clicking SIgnup You Agree To Our Terms & Conditions.</Text>
            </TouchableOpacity>
         </View>

          <View>

              <Button androidRippleColor full style={{height: 7*height/100, opacity: this.state.buttonOpacity, borderRadius: 10, width: 80*width/100, alignSelf: 'center', marginBottom: 2*height/100, backgroundColor: '#EB5757', justifyContent: 'center'}} onPress={() => this.registerUser()}>
              {this.state.loginPressed ? <View><ActivityIndicator size="small" color='white' /></View> :  <View></View> }
                <Text style={{ fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: 18, color: 'white'}}>Register</Text>
              </Button>

          </View>
      </View>



      <View style={styles.copyright}>
      <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={{flexDirection: 'row'}}>
      <Text style={{ fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 16, color: '#4C4C4C', }}>Already A Member? </Text>
      <Text style={{ fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 16, color: '#EB5757', }}>Signin</Text>
      </TouchableOpacity>
      </View>

</View>
    );
  }
}

const styles = StyleSheet.create({
  PageText: {
    height: 15*height/100,
    paddingTop: 5*height/100,
    paddingLeft: 5*height/100,
  },
  LoginForm: {
    height: 75*height/100,
    paddingTop: 7*height/100,
    paddingHorizontal: 8*width/100,
  },

  InputBox: {
      borderWidth: 3,
      borderRadius: 10,
  },

  copyright: {
    height: 7*height/100,
    flexDirection: 'row',
    justifyContent: 'center'
  },

  SignupText: {},
  SignupSubText: {
    flexDirection: 'row',
    marginBottom: 2*height/100,
  },
});

export default Register;
