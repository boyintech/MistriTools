import React, {Component} from 'react';
import {View, Text, Dimensions, Image, TouchableOpacity, Linking} from 'react-native';
import {Header, Content, Button,
        Item, Label, Input,
        Icon, Textarea} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import * as fontStyle from '../../../common/stylesheet/fontStyle.js';
import { ScrollView } from 'react-native-gesture-handler';



const {height, width} = Dimensions.get('window');


class About extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        email: 'mistritoolss@gmail.com',
        message: '',
        url: 'mailto:mistritoolss@gmail.com?subject=SendMail&body=Description',
        callurl: 'tel:+919305382806',
    }
    console.log(this.props)
  }

  sendMessage = () => {
    var url = 'mailto:'+this.state.email+'?subject=Support Mistri&body='+this.state.message;
    this.setState({url: url});
    console.log(url);
    Linking.openURL(this.state.url);
  }

  pressCall = () => {
    Linking.openURL(this.state.callurl)
  }


  render(){
    return(
      <View style={{flex: 1, backgroundColor: 'white'}}>
         <Header style={{backgroundColor: '#EB5757', justifyContent: 'space-between', paddingTop: 1.5*height/100,}}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{flexDirection: 'row'}}>
                <AntDesign name='arrowleft' size={30} style={{color: 'white',}} />
                <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, color: 'white', fontSize: 22, marginTop: .5*height/100, marginLeft: 3*width/100,}}>About Us</Text>
            </TouchableOpacity>
        </Header>
        <View style={{marginTop: 5*height/100, borderBottomWidth: 1, paddingBottom: 3*height/100, borderBottomColor: '#ECECEC'}}>
            <View style={{marginHorizontal: 3*width/100,}}>
                <Image source={require('../../../assets/icons/logo.png')} style={{height: 15*height/100, width: 15*height/100, alignSelf: 'center'}} />
                <Text style={{alignSelf: 'center', fontFamily: fontStyle.FONT_FAMILY_BOLD, fontSize: 35, color: '#EB5757', marginBottom: 2*height/100}}>MistriTools©</Text>
                <Text style={{alignSelf: 'center', fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 18}}>
                    MistriTools is a modern way to easily find and book your Nearby Mechanics. MistriTools helps Auto Mechanic Businesses to grow and make their availabilty online.
                </Text>
                <Text style={{alignSelf: 'center', fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 18}}>
                    This Tool is manages and Create By Mr. Aman & Mr. Ashish Singh & Team with ♥. This tool is developed in India.
                </Text>
                <Text style={{alignSelf: 'center', fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 18}}>
                    To know more about as, Contac Us the below given Screen
                </Text>
                </View>
          </View>
          <View style={{marginTop: 3*height/100, borderBottomWidth: 1, paddingBottom: 1*height/100, borderBottomColor: '#ECECEC'}}>
            <View style={{marginHorizontal: 3*width/100, flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: 18, marginBottom: 2*height/100}}>Version</Text>
                <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 18}}>
                0.0.1
                </Text>
                </View>
          </View>

          <TouchableOpacity style={{marginTop: 3*height/100, borderBottomWidth: 1, paddingBottom: 1*height/100, borderBottomColor: '#ECECEC'}} onPress={() => this.props.navigation.navigate('Policy')}>
            <View style={{marginHorizontal: 3*width/100, flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: 18, marginBottom: 2*height/100}}>Terms & Conditions</Text>
                </View>
          </TouchableOpacity>

          <TouchableOpacity style={{marginTop: 3*height/100, borderBottomWidth: 1, paddingBottom: 1*height/100, borderBottomColor: '#ECECEC'}} onPress={() => this.props.navigation.navigate('Contact')}>
            <View style={{marginHorizontal: 3*width/100, flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: 18, marginBottom: 2*height/100}}>Contact Us</Text>
                </View>
          </TouchableOpacity>



      </View>
    );
  }
}

export default (connect)()(About);
