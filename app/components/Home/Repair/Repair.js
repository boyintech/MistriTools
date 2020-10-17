import React, {Component} from 'react';
import {View, Text, Dimensions,
        Image, StyleSheet, Linking,
        ActivityIndicator, BackHandler, Animated,
        Alert} from 'react-native';
import {Header, Icon, Button, Input, Item, Label} from 'native-base';
import { ScrollView, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import * as fontStyle from '../../../common/stylesheet/fontStyle.js';
import AntDesign from 'react-native-vector-icons/AntDesign';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {connect} from 'react-redux';
import { withNavigationFocus } from '@react-navigation/native';
import GetLocation from 'react-native-get-location'
import Geocoder from 'react-native-geocoding';
import axios from 'axios';

// AIzaSyAyDBcTW5YcA4gpsmt7EBdlwjwWaqJLbvk

const {height, width} = Dimensions.get('window');

var Data = [];
var DWidth = new Animated.Value(0);
var isVisible = new Animated.Value(0);

class Repair extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            dummyData : {

            },
            searchKey: {},
          isLoaded: false,
          location: '',
          boxOpened: false,
        }

        this.getLocation();
        this.saveData();

    }

  getLocation = () =>  {
    Geocoder.init('AIzaSyAyDBcTW5YcA4gpsmt7EBdlwjwWaqJLbvk');
    GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 15000,
})
.then(location => {
  console.log(location);
  this.props.storeUserLocation(location);
    axios.get('http://api.positionstack.com/v1/reverse?access_key=734cc3a9e22601026e92918de70a548d&query='+location.latitude+','+location.longitude).
      then(res => {
        this.setState({location: res.data.data[0].locality});
        this.searchByLocation();
      }).
      catch(err => console.log(err))
})
.catch(error => {
    const { code, message } = error;
    console.warn(code, message);
})}

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
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }

    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }

    getData = async() => {
      this.setState({isLoaded: false})
        const snapshot = await firestore().collection('vendors').orderBy( "shop_id", "desc").get();
        Data = [];
        snapshot.docs.map(doc => {
            this.setState({dummyData: doc.data()});
            Data.push(doc.data());
            this.setState({isLoaded: true});
        });
    }

    saveData = (res) => {
      var temp = auth().currentUser;
      firestore().collection('users').doc(temp.uid).get().
        then(data => {
          this.setState({currentUserData: data._data});
          this.props.login(data._data);
        }).
        catch(error => console.log(error));
    }

    searchByLocation = async(location) => {
      this.setState({isLoaded: false});
        if(this.state.location == ''){
          this.getData();
        } else {
          firestore().collection("vendors").where("address.city", "==", this.state.location).get().
            then(res => {
                 if(res._docs.length){
                   res._docs.map(item => Data.push(item._data))
                 } else {
                   Data = [];
                 }
                this.setState({isLoaded: true})
            }).
            catch(err => {
            })
    }}

  openSearchBox = () => {
    console.log("Opening")
    if(this.state.boxOpened){
      this.searchByLocation();
    } else {
    Animated.parallel([
        Animated.timing(isVisible, {
            toValue: 1,
            duration: 200
        }),
        Animated.timing(DWidth, {
            toValue: 50*width/100,
            duration: 300
        })
    ]).start(() => {
        // callback
    });
      this.setState({boxOpened: true})
   }
  }

  rad = (x) => {
 return x * Math.PI / 180;
};


getDistance = (p1, p2) => {
 var R = 6378137;
 var dLat = this.rad(p2.lat - p1.lat);
 var dLong = this.rad(p2.lng - p1.lng);
 var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
   Math.cos(this.rad(p1.lat)) * Math.cos(this.rad(p2.lat)) *
   Math.sin(dLong / 2) * Math.sin(dLong / 2);
 var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
 var d = R * c;
 return d; // returns the distance in meter
}

  calculateDelivery = (item) => {
    console.log(item);
    var userLocation = {
      lat: this.props.userLocation.latitude,
      lng: this.props.userLocation.longitude,
    };
    var shopLocation = {
      lat: item.location._latitude,
      lng: item.location._longitude,
    }
      return(Math.round(this.getDistance(shopLocation, userLocation)/1000));
  }

  render(){
    return(
      <View style={{backgroundColor: 'white', flex: 1}}>
          <Header style={{backgroundColor: '#EB5757', height: 7*height/100, justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row'}}>
                    <AntDesign name='home' style={{alignSelf: 'center', color: 'white', marginRight: 1*width/100}} size={25} />
                    <Text style={{fontFamily: fontStyle.FONT_FAMILY_MEDIUM, color: 'white', fontSize: 30, alignSelf: 'center'}}>Home</Text>

                </View>
                <Animated.View style={{width: DWidth, opacity: isVisible, marginVertical: 1*height/100,}} >
                <Input selectionColor='#EB5757' onChangeText={(loc) => this.setState({location: loc})} style={{backgroundColor: 'white', borderRadius: 10, fontFamily: fontStyle.FONT_FAMILY_REGULAR}} />
                </Animated.View>
                <TouchableOpacity onPress={() => this.openSearchBox()} style={{}}>
                <AntDesign name='search1' style={{alignSelf: 'center', color: 'white', marginRight: 1*width/100, marginTop: 2*height/100 }} size={25} />
                </TouchableOpacity>

          </Header>

          {this.state.isLoaded ?
                  Data.length ?
                   <ScrollView style={styles.Main} showsVerticalScrollIndicator={false}>
                          {Data.map(item => (
                              <TouchableOpacity activeOpacity={.9} onPress={() =>{
                                this.props.shopData(item);
                                this.props.saveDistance(this.calculateDelivery(item));
                                this.props.navigation.navigate('ShopPage', {shop_data: item, transition: 'vertical'})}}>
                              <View style={{height: 30*height/100, elevation: 5, marginBottom: 1*height/100, justifyContent: 'flex-end', borderRadius: 10}}>
                                  <Image source={require('../../../assets/images/demo.jpg')} style={{height: 30*height/100, borderRadius: 10,width: 96*width/100, position: 'absolute'}} />
                                  <View style={{height: 10*height/100, padding: 3*width/100, backgroundColor: 'white', borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
                                      <View style={{justifyContent: 'space-between', flexDirection: 'row', marginBottom: 1*height/100}}>
                                          <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 20}}>{item.shop_name}</Text>
                          <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, alignSelf: 'center', color: '#6D6868'}}>{item.address.house_no + " " + item.address.street + " " + item.address.city}</Text>
                                      </View>

                                      <View style={{justifyContent: 'space-between', flexDirection: 'row',}}>
                                          <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 15, color: '#6D6868', width: 50*width/100}}>{item.description}</Text>
                                          <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, color: '#FF3D00', alignSelf: 'center'}}>10:00AM - 08:00PM</Text>
                                      </View>

                                  </View>
                              </View>
                              </TouchableOpacity>
                          ))}

                  </ScrollView>  :
                  <View style={{marginTop: height/4}}>
                  <Image source={require('../../../assets/icons/car.png')} style={{height: 15*height/100, width: 15*height/100, alignSelf: 'center'}} />
                  <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 24, alignSelf: 'center', marginTop: 1*height/100, color: '#EB5757'}}>No Shops Found At Your Area</Text>
      <Button androidRippleColor full style={{height: 7*height/100, borderRadius: 10, width: 80*width/100, alignSelf: 'center', marginTop: 1*height/100, backgroundColor: '#EB5757', justifyContent: 'center'}} onPress={() => {this.setState({location: '', isLoaded: true}); this.getData()}} >
                    <Text style={{ fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: 18, color: 'white'}}>Show All Shops</Text>
                  </Button>
                  </View>
             :  <View style={{marginTop: height/2.5}}><ActivityIndicator size="large" color='#EB5757' /></View> }



      </View>
    );
  }
}

const styles = StyleSheet.create({
    Main: {
        marginTop: 1*height/100,
        paddingHorizontal: 2*width/100,
    }
})

const mapStateToProps = state => {
    console.log(state.currentUserData);
    return state;
  };


  const mapDispatchToProps = dispatch => {
    return {
      login: (loginData) => dispatch({type: 'LOGIN', data: loginData}),
      shopData: (shopData) => dispatch({type: 'SHOP_DATA', data: shopData}),
      storeUserLocation: (userLocation) => dispatch({type: 'SAVE_LOCATION', data: userLocation}),
      saveDistance: (totalDistance) => dispatch({type: 'SAVE_DISTANCE', data: totalDistance})
    }
  }

export default (connect)(mapStateToProps, mapDispatchToProps)(Repair);
