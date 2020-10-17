import React, {Component} from 'react';
import {View, Text, Dimensions, Image, TouchableOpacity} from 'react-native';
import {Header, List, ListItem,
        Icon, Right, Left, Body,
        Switch, Button, Content, Footer} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';
import * as fontStyle from '../../../common/stylesheet/fontStyle.js';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import {connect} from 'react-redux'
import moment from 'moment';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const {height, width} = Dimensions.get('window');



// <View style={{ height: 20*height/100, justifyContent: 'space-around', paddingVertical: 2*width/100, }}>
//     <TouchableOpacity>
//     <Text style={{color: '#828282', fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 30}}>{this.state.totalItems}</Text>
//     </TouchableOpacity>
//     <TouchableOpacity>
//       <Text style={{color: '#828282', fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: 40}}>+</Text>
//     </TouchableOpacity>
//     <TouchableOpacity>
//     <Text style={{color: '#EB5757', fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: 40}}>-</Text>
//     </TouchableOpacity>
// </View>

class Cart extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      totalItems: this.props.totalItems,
      data: this.props.products,
      deliveryCharge: 0,
    }
    console.log(this.props);
    this.calculateDelivery();
  }

  UNSAFE_componentWillReceiveProps(prev){
        this.setState({totalItems: prev.totalItems, data: prev.products})

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

  calculateDelivery = () => {
    var userLocation = {
      lat: this.props.userLocation.latitude,
      lng: this.props.userLocation.longitude,
    };
    var shopLocation = {
      lat: this.props.shopData.location._latitude,
      lng: this.props.shopData.location._longitude,
    }
    this.setState({deliveryCharge: Math.round(this.getDistance(shopLocation, userLocation)/1000) * 21})
  }

  NoItems = () => {
      <Text>Hello</Text>
  }

  ShowItems = () => {

  }

  completeOrder = () => {
    firestore().collection('orders').doc().set({
      order_ID: 0,
      order: this.props.products,
      ordered_by: this.props.currentUserData,
      user_id: auth().currentUser.uid,
      orderd_at: moment().format(),
      totalPrice: this.props.totalPrice+21,
      shopData: this.props.shopData,
    }).then(res => console.log(res)).
       catch(err => console.log(err));
    var totalPrice = this.props.totalPrice;
    console.log(this.props.totalPrice, totalPrice);
    this.props.emptyCart();
    this.props.navigation.navigate('OrderSuccess', {params: 5000});
  }

  render(){
    if(this.props.totalItems){
      return(
        <View style={{flex: 1, backgroundColor: 'white'}}>
           <Header style={{backgroundColor: '#EB5757', justifyContent: 'space-between', paddingTop: 1.5*height/100,}}>
              <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{flexDirection: 'row'}}>
                  <AntDesign name='arrowleft' size={30} style={{color: 'white',}} />
                  <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, color: 'white', fontSize: 22, marginTop: .5*height/100, marginLeft: 3*width/100,}}>Cart</Text>
              </TouchableOpacity>
          </Header>
          <Content>
            <View>
              {this.state.data.map(item => (
              <View style={{height: 20*height/100, width: 95*width/100, backgroundColor: 'white', elevation: 2, margin: 2*width/100, alignSelf: 'center', flexDirection: 'row'}}>
                    <Image source={require('../../../assets/icons/tyre.png')} style={{height: 20*height/100, width: 20*height/100, alignSelf: 'center'}} />
                     <View style={{justifyContent: 'space-around', width: 50*width/100}}>
                       <View>
                      <Text style={{fontSize: 24, fontFamily: fontStyle.FONT_FAMILY_REGULAR, color: '#595959'}}>{item.product_name}</Text>
                      <Text style={{fontSize: 14, fontFamily: fontStyle.FONT_FAMILY_REGULAR, color: '#828282'}}>{item.product_name}</Text>
                      </View>
                      <Text style={{fontSize: 20, fontFamily: fontStyle.FONT_FAMILY_REGULAR, color: '#EB5757'}}>{item.price} ₹</Text>
                    </View>
              </View>
              ))}
              </View>

              <View>

                  <Text style={{alignSelf: 'center', fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: 20, textDecorationLine: 'underline', marginTop: 2*height/100}}>Payment Details</Text>
                  <View style={{paddingHorizontal: 5*width/100, marginTop: 2*height/100}}>
                    <View style={{justifyContent: 'space-between', flexDirection: 'row', }}>
                    <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 18}}>Sub Total</Text>
                    <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 18}}>₹ {this.props.totalPrice}.00</Text>
                    </View>
                    <View style={{justifyContent: 'space-between', flexDirection: 'row', marginTop: 1*height/100}}>
                      <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 18}}>Delivery Charges</Text>
                      <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 18}}>₹ {this.props.TotalDistance}</Text>
                    </View>
                    <View style={{justifyContent: 'space-between', flexDirection: 'row', marginTop: 2*height/100, borderColor: '#EB5757', borderTopWidth: 1, borderBottomWidth: 1, paddingVertical: 2*height/100}}>
                      <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 18}}>Grand Total</Text>
                      <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 18}}>₹ {this.props.totalPrice+(this.props.TotalDistance*21)}.00</Text>
                    </View>
                  </View>
              </View>
          </Content>
          <TouchableOpacity onPress={() => this.completeOrder()}>
          <Footer style={{backgroundColor: '#6FCF97', justifyContent: 'center'}}>
                  <Text style={{color: 'white', fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 24, alignSelf: 'center'}}>Confirm Order</Text>
          </Footer>
          </TouchableOpacity>
        </View>
      );
  } else {
      return(
          <View style={{flex: 1, backgroundColor: 'white'}}>
             <Header style={{backgroundColor: '#EB5757', justifyContent: 'space-between', paddingTop: 1.5*height/100,}}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{flexDirection: 'row'}}>
                    <AntDesign name='arrowleft' size={30} style={{color: 'white',}} />
                    <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, color: 'white', fontSize: 22, marginTop: .5*height/100, marginLeft: 3*width/100,}}>Cart</Text>
                </TouchableOpacity>
            </Header>
            <Content>
              <View style={{justifyContent: 'center', marginTop: 25*height/100}}>
                <FontAwesome name='shopping-bag' style={{alignSelf: 'center', color: '#EB5757'}} size={100}/>
                <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 24, alignSelf: 'center', marginTop: 1*height/100}}>Cart Is Empty</Text>
                <Button androidRippleColor full style={{height: 7*height/100, borderRadius: 10, width: 80*width/100, alignSelf: 'center', marginTop: 2*height/100, backgroundColor: '#EB5757', justifyContent: 'center'}} onPress={() => this.props.navigation.navigate('Repair')} >
                  <Text style={{ fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: 18, color: 'white'}}>Start Shopping</Text>
                </Button>
              </View>
            </Content>
          </View>
        );
  }
  }
}

const mapStateToProps = state => {
  return state;
};

const mapDispatchToProps = dispatch => {
  return {
    emptyCart: () => dispatch({type: 'REMOVE_FROM_CART'})
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
