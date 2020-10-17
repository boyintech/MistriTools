import React, {Component} from 'react';
import {View, Text, Dimensions, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {Header, List, ListItem,
        Icon, Right, Left, Body,
        Switch, Button, Input, Item,
        Label} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';
import * as fontStyle from '../../../common/stylesheet/fontStyle.js';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import { ScrollView } from 'react-native-gesture-handler';


const {height,width} = Dimensions.get('window');
const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

class Settings extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      uid: '',
      currentUserData: {},
      billing_details: {},
      imageName: '',
      uploadUri: '',
      name: '',
      telephone: '',
      city: '',
      street: '',
      state: '',
      pincode: '',
      country: '',

    };
  }

  componentDidMount(){
  }

  UpdateBilling = async() => {
    if(this.state.name == '' || this.state.telephone == '' || this.state.city == '' || this.state.street == '' || this.state.state == '' || this.state.pincode == '' || this.state.country == ''){
          console.log("Please Input");
    } else {
      var temp = auth().currentUser;
      firestore().collection('users').doc(temp.uid).update({
        billing_details: {
          billing_city: this.state.city,
          billing_name: this.state.name,
          billing_state: this.state.state,
          billing_street: this.state.street,
          billing_country: this.state.country,
          billing_telephone: this.state.telephone,
          billing_pincode: this.state.pincode
        }
      }).
        then(res => {
          console.log("Result ", res)
        }).
        catch(err => console.log("Error ", err))
    }
  }

  getUserData = async() => {
    var temp = auth().currentUser;
    firestore().collection('users').doc(temp.uid).get().
      then(data => {
        this.setState({currentUserData: data._data, billing_details: data._data.billing_details});
      }).
      catch(error => console.log(error));
      const refernce = storage().ref('/profile_' + temp.uid + '.png');
      refernce.getDownloadURL().
            then(res => {
              console.log(res);
              this.setState({profile_url: res})}).
            catch(error => console.log(error));
  }


  render(){
    return(
      <View style={{flex: 1, backgroundColor: 'white'}}>
         <Header style={{backgroundColor: '#EB5757', justifyContent: 'space-between', paddingTop: 1.5*height/100,}}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{flexDirection: 'row'}}>
                <AntDesign name='arrowleft' size={30} style={{color: 'white',}} />
                <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, color: 'white', fontSize: 22, marginTop: .5*height/100, marginLeft: 3*width/100,}}>Update Billing Details</Text>
            </TouchableOpacity>
        </Header>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{paddingHorizontal: 10*width/100, marginTop: 2*height/100}}>

        <Item rounded style={{borderRadius: 10, marginBottom: 3*height/100}}>
              <Label style={{color: '#828282', marginLeft: 3*width/100, fontFamily: fontStyle.FONT_FAMILY_REGULAR}}>Name</Label>
              <Input onChangeText={(name) => this.setState({name: name})} />
            </Item>

            <Item rounded style={{borderRadius: 10, marginBottom: 3*height/100}}>
              <Label style={{color: '#828282', marginLeft: 3*width/100, fontFamily: fontStyle.FONT_FAMILY_REGULAR}}>Telephone</Label>
              <Input onChangeText={(telephone) => this.setState({telephone: telephone})} />
            </Item>

            <Item rounded style={{borderRadius: 10, marginBottom: 3*height/100}}>
              <Label style={{color: '#828282', marginLeft: 3*width/100, fontFamily: fontStyle.FONT_FAMILY_REGULAR}}>Street</Label>
              <Input onChangeText={(street) => this.setState({street: street})} />
            </Item>

            <Item rounded style={{borderRadius: 10, marginBottom: 3*height/100}}>
              <Label style={{color: '#828282', marginLeft: 3*width/100, fontFamily: fontStyle.FONT_FAMILY_REGULAR}}>City</Label>
              <Input onChangeText={(city) => this.setState({city: city})} />
            </Item>

            <Item rounded style={{borderRadius: 10, marginBottom: 3*height/100}}>
              <Label style={{color: '#828282', marginLeft: 3*width/100, fontFamily: fontStyle.FONT_FAMILY_REGULAR}}>State</Label>
              <Input onChangeText={(state) => this.setState({state: state})} />
            </Item>

            <Item rounded style={{borderRadius: 10, marginBottom: 3*height/100}}>
              <Label style={{color: '#828282', marginLeft: 3*width/100, fontFamily: fontStyle.FONT_FAMILY_REGULAR}}>Pin Code</Label>
              <Input onChangeText={(pincode) => this.setState({pincode: pincode})} />
            </Item>

            <Item rounded style={{borderRadius: 10, marginBottom: 3*height/100}}>
              <Label style={{color: '#828282', marginLeft: 3*width/100, fontFamily: fontStyle.FONT_FAMILY_REGULAR}}>Country</Label>
              <Input onChangeText={(country) => this.setState({country: country})} />
            </Item>

            <View>

                <Button androidRippleColor full style={{height: 7*height/100, borderRadius: 10, width: 80*width/100, alignSelf: 'center', marginBottom: 2*height/100, backgroundColor: '#EB5757', justifyContent: 'center'}} onPress={() => this.UpdateBilling()}>
                  <Text style={{ fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: 18, color: 'white'}}>Update</Text>
                </Button>

            </View>
        </View>
        </ScrollView>

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
    paddingTop: 5*height/100,
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

export default Settings;
