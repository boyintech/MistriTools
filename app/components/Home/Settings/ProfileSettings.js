import React, {Component} from 'react';
import {View, Text, Dimensions, Image, TouchableOpacity} from 'react-native';
import {Header, List, ListItem,
        Icon, Right, Left, Body,
        Switch, Button, Input} from 'native-base';
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
      name: '',
      email: '',
      profile_url: '',
      uid: '',
      currentUserData: {},
      billing_details: {},
      imageName: '',
      uploadUri: '',
    };
  }

  componentDidMount(){
    this.getUserData();
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
            catch(error => {console.log(error);
            const ref = storage().ref('man.png');
            ref.getDownloadURL().
              then(res => this.setState({profile_url: res})).
              catch(err => console.log("Errpr 1", err))});
  }

  uploadProfile = async() => {
    ImagePicker.showImagePicker(options, (response) => {
          console.log(response.path);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        let imageName = 'profile.' + this.state.currentUserData.uid;
        let uploadUri = response.uri;
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          avatarSource: source,
          uploadUri: source,
          imageName: imageName
        });

      }
    });
  }

  logout = () => {
    console.log("In Here")
    auth()
    .signOut()
    .then(() => {
      console.log("LoggingOut")
      this.props.navigation.navigate('Login')})
    .catch(error => console.log(error))
  }

  render(){
    return(
      <View style={{flex: 1, backgroundColor: 'white'}}>
         <Header style={{backgroundColor: '#EB5757', justifyContent: 'space-between', paddingTop: 1.5*height/100,}}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{flexDirection: 'row'}}>
                <AntDesign name='arrowleft' size={30} style={{color: 'white',}} />
                <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, color: 'white', fontSize: 22, marginTop: .5*height/100, marginLeft: 3*width/100,}}>Profile Settings</Text>
            </TouchableOpacity>
        </Header>
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{justifyContent: 'center', borderColor: '#EB5757', borderBottomWidth: 1.5, height: 30*height/100}}>
        <Image source={{uri: this.state.profile_url}} style={{height: 15*height/100, width: 15*height/100, alignSelf: 'center', borderRadius: 50}} />
        <View style={{alignSelf: 'center'}}>
          <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 20, alignSelf: 'center', marginTop: 1*height/100}}>{this.state.currentUserData.name}</Text>
          <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 18, marginTop: 1*height/100, alignSelf: 'center' }}>{this.state.currentUserData.email}</Text>
        </View>
        </View>

        <View style={{marginTop: 2*height/100}}>
            <Text style={{fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: 20, alignSelf: 'center', marginBottom: 1*height/100}}>Contact Information</Text>
            <View>
              <View style={{flexDirection: 'row', borderBottomColor: '#EB5757', borderBottomWidth: 1, width: 90*width/100, alignSelf: 'center', height: 4*height/100, marginBottom: 1*height/100 }}>
                <Text style={{width: 30*width/100, fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 18,}}>Name</Text>
                <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 18,}}>{this.state.currentUserData.name}</Text>
              </View>
              <View style={{flexDirection: 'row', borderBottomColor: '#EB5757', borderBottomWidth: 1, width: 90*width/100, alignSelf: 'center', height: 4*height/100, marginBottom: 1*height/100}}>
                <Text style={{width: 30*width/100, fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 18,}}>Email</Text>
                <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 18,}}>{this.state.currentUserData.email}</Text>
              </View>
              <View style={{flexDirection: 'row', width: 90*width/100, alignSelf: 'center', height: 4*height/100, marginBottom: 1*height/100}}>
                <Text style={{width: 30*width/100, fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 18,}}>Phone No</Text>
                <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 18}}>{this.state.currentUserData.phone_no}</Text>
              </View>
            </View>
        </View>

        <View style={{marginTop: 2*height/100}}>
            <Text style={{fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: 20, alignSelf: 'center', marginBottom: 1*height/100}}>Billing Details</Text>
            <View>
            <View style={{flexDirection: 'row', borderBottomColor: '#EB5757', borderBottomWidth: 1, width: 90*width/100, alignSelf: 'center', height: 4*height/100, marginBottom: 1*height/100 }}>
                <Text style={{width: 30*width/100, fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 18,}}>Name</Text>
                <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 18,}}>{this.state.billing_details.billing_name}</Text>
              </View>
              <View style={{flexDirection: 'row', borderBottomColor: '#EB5757', borderBottomWidth: 1, width: 90*width/100, alignSelf: 'center', height: 4*height/100, marginBottom: 1*height/100 }}>
                <Text style={{width: 30*width/100, fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 18}}>Telephone</Text>
                <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 18,}}>{this.state.billing_details.billing_telephone}</Text>
              </View>
              <View style={{flexDirection: 'row', borderBottomColor: '#EB5757', borderBottomWidth: 1, width: 90*width/100, alignSelf: 'center', height: 4*height/100, marginBottom: 1*height/100 }}>
                <Text style={{width: 30*width/100, fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 18,}}>Street</Text>
                <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 18, }}>{this.state.billing_details.billing_street}</Text>
              </View>
              <View style={{flexDirection: 'row', borderBottomColor: '#EB5757', borderBottomWidth: 1, width: 90*width/100, alignSelf: 'center', height: 4*height/100, marginBottom: 1*height/100 }}>
                <Text style={{width: 30*width/100, fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 18,}}>City</Text>
                <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 18,}}>{this.state.billing_details.billing_city}</Text>
              </View>
              <View style={{flexDirection: 'row', borderBottomColor: '#EB5757', borderBottomWidth: 1, width: 90*width/100, alignSelf: 'center', height: 4*height/100, marginBottom: 1*height/100 }}>
                <Text style={{width: 30*width/100, fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 18}}>State</Text>
                <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 18,}}>{this.state.billing_details.billing_state}</Text>
              </View>
              <View style={{flexDirection: 'row', borderBottomColor: '#EB5757', borderBottomWidth: 1, width: 90*width/100, alignSelf: 'center', height: 4*height/100, marginBottom: 1*height/100 }}>
                <Text style={{width: 30*width/100, fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 18}}>PinCode</Text>
                <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 18}}>{this.state.billing_details.billing_pincode}</Text>
              </View>
              <View style={{flexDirection: 'row', width: 90*width/100, alignSelf: 'center', height: 4*height/100, marginBottom: 1*height/100}}>
                <Text style={{width: 30*width/100, fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 18, }}>Country</Text>
                <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 18}}>{this.state.billing_details.billing_country}</Text>
              </View>
              <Button androidRippleColor full style={{height: 5*height/100, borderRadius: 10, width: 90*width/100, alignSelf: 'center', marginBottom: 2*height/100, backgroundColor: '#EB5757', justifyContent: 'center'}} onPress={() => this.props.navigation.navigate('UpdateBilling')}>
              <Text style={{ fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: 18, color: 'white'}}>Update Billing Details</Text>
             </Button>
            </View>
        </View>
        </ScrollView>

      </View>
    );
  }
}

export default Settings;
