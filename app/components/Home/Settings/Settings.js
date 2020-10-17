import React, {Component} from 'react';
import {View, Text, Dimensions, Image, TouchableOpacity} from 'react-native';
import {Header, List, ListItem,
        Icon, Right, Left, Body,
        Switch, Button} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';
import * as fontStyle from '../../../common/stylesheet/fontStyle.js';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import {connect} from 'react-redux';


const {height,width} = Dimensions.get('window');
const options = {
  title: 'Select Avatar',
  quality: 0.25,
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
      imageName: '',
      uploadUri: '',
    };
    this.getUserData();
  }
  getUserData = () => {
    var temp = auth().currentUser;
    firestore().collection('users').doc(temp.uid).get().
      then(data => {
        this.setState({currentUserData: data._data});
      }).
      catch(error => console.log(error));
      const refernce = storage().ref('/profile_' + temp.uid + '.png');
      refernce.getDownloadURL().
            then(res => {
              console.log(res);
              this.setState({profile_url: res})}).
            catch(error => {
              console.log(error);
              const ref = storage().ref('man.png');
              ref.getDownloadURL().
                then(res => this.setState({profile_url: res})).
                catch(err => console.log("Errpr 1", err))
            });
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
        let imageName = 'profile_' + this.state.currentUserData.uid+'.png';
        let uploadUri = response.path;
        console.log(imageName);
        storage().ref(imageName).putFile(response.path).
        then(res => {
          console.log(res);
          this.props.navigation.navigate('Settings');
        }).
        catch(err => console.log(err));
      }
    });
  }

  logout = () => {
    console.log("In Here")
    auth()
    .signOut()
    .then(() => {
      console.log("LoggingOut")
      this.props.navigation.navigate('SplashScreen')})
    .catch(error => console.log(error))
  }

  render(){
    return(
      <View style={{flex: 1, backgroundColor: 'white'}}>
               <Header style={{backgroundColor: '#EB5757', justifyContent: 'space-between', paddingTop: 1.5*height/100,}}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{flexDirection: 'row'}}>
                <AntDesign name='arrowleft' size={30} style={{color: 'white',}} />
                <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, color: 'white', fontSize: 22, marginTop: .5*height/100, marginLeft: 3*width/100,}}>Settings</Text>
            </TouchableOpacity>
        </Header>

        <View style={{paddingLeft: 3*width/100, flexDirection: 'row', marginTop: 3*height/100}}>
        <Image source={{uri: this.state.profile_url}} style={{height: 12*height/100, width: 12*height/100, borderRadius: 50, marginRight: 3*width/100}} />
        <View style={{alignSelf: 'center'}}>
          <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 20, }}>{this.state.currentUserData.name}</Text>
          <TouchableOpacity onPress={() => this.uploadProfile()}>
            <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, color: '#EB5757', marginTop: 2 }}>Chenge Profile Picture</Text>
          </TouchableOpacity>
        </View>
        </View>

        <View>

        <ListItem icon style={{marginTop: 2*height/100}} onPress={() => this.props.navigation.navigate('OrderHistory')}>
            <Left>
                <Image source={require('../../../assets/icons/history.png')} style={{height: 30, width: 30}}/>
            </Left>
            <Body>
              <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 20, color: '#333333'}}>Order History</Text>
            </Body>
            <Right>
            <AntDesign name='right' />
            </Right>
          </ListItem>
          <ListItem icon style={{marginTop: 2*height/100}} onPress={() => this.props.navigation.navigate('ProfileSettings')} >
            <Left>
            <Image source={require('../../../assets/icons/profile.png')} style={{height: 30, width: 30}}/>
            </Left>
            <Body>
              <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 20, color: '#333333'}}>Profile Settings</Text>
            </Body>
            <Right>
              <AntDesign name='right' />
            </Right>
          </ListItem>
          <ListItem icon style={{marginTop: 2*height/100}} onPress={() => this.props.navigation.navigate('About')}>
            <Left>
            <Image source={require('../../../assets/icons/info.png')} style={{height: 30, width: 30}}/>
            </Left>
            <Body>
              <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 20, color: '#333333'}}>About Us</Text>
            </Body>
            <Right>
              <AntDesign name='right' />
            </Right>
          </ListItem>
          <ListItem icon style={{marginTop: 2*height/100}} onPress={() => this.props.navigation.navigate('Policy')}>
            <Left>
            <Image source={require('../../../assets/icons/privacy.png')} style={{height: 30, width: 30}}/>
            </Left>
            <Body>
              <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 20, color: '#333333'}}>Privacy Policy</Text>
            </Body>
            <Right>

              <AntDesign name='right' />
            </Right>
          </ListItem>
          <ListItem icon style={{marginTop: 2*height/100}} onPress={() => this.props.navigation.navigate('Contact')}>
            <Left>
            <Image source={require('../../../assets/icons/contact.png')} style={{height: 30, width: 30}}/>
            </Left>
            <Body>
              <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 20, color: '#333333'}}>Contact Us</Text>
            </Body>
            <Right>

              <AntDesign name='right' />
            </Right>
          </ListItem>
          <TouchableOpacity>
          <ListItem icon style={{marginTop: 2*height/100}} onPress={() => this.logout()}>
            <Left>
            <Image source={require('../../../assets/icons/logout.png')} style={{height: 30, width: 30}}/>
            </Left>
            <Body>
              <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 20, color: '#333333'}}>Sign Out</Text>
            </Body>
            <Right>
              <AntDesign name='right' />
            </Right>
          </ListItem>
          </TouchableOpacity>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 150}}>
          <Text style={{ fontFamily: fontStyle.FONT_FAMILY_REGULAR, color: '#828282',}}>Tell Your Friends About Us   •  </Text>
          <TouchableOpacity style={{flexDirection: 'row'}}>
           <Text style={{color: '#EB5757', fontFamily: fontStyle.FONT_FAMILY_REGULAR,}}>Share Now </Text>
           <AntDesign name='sharealt' style={{alignSelf: 'center', color: '#EB5757', marginTop: 2}} />
          </TouchableOpacity>
        </View>

      </View>
    );
  }
}


const mapStateToProps = state => {
  console.log(state);
  return state;
};
export default connect(mapStateToProps)(Settings);
