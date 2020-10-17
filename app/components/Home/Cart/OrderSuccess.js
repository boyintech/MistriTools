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


const {height, width} = Dimensions.get('window');


class OrderSuccess extends React.Component {

  constructor(props){
    super(props);
    console.log(this.props.params);
    this.state = {
      totalItems: this.props.totalItems,
      data: this.props.products,
    }
  }

  UNSAFE_componentWillReceiveProps(prev){
        this.setState({totalItems: prev.totalItems, data: prev.products})

  }

  NoItems = () => {
      <Text>Hello</Text>
  }

  ShowItems = () => {

  }


  render(){
    return(
      <View style={{flex: 1, backgroundColor: 'white'}}>
         <Header style={{backgroundColor: '#EB5757', justifyContent: 'space-between', paddingTop: 1.5*height/100,}}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{flexDirection: 'row'}}>
                <AntDesign name='arrowleft' size={30} style={{color: 'white',}} />
            </TouchableOpacity>
        </Header>
        <Content>

        <View style={{height: 30*height/100, marginTop: 3*height/100}}>
            <Image source={require('../../../assets/images/success.png')} style={{height: 20*height/100, width: 20*height/100, alignSelf: 'center'}} />
            <Text style={{fontFamily: fontStyle.FONT_FAMILY_BOLD, color: '#4CCD1F', fontSize: 24, alignSelf: 'center', textDecorationLine: 'underline'}}>Success</Text>
        </View>

        <Text style={{alignSelf: 'center', fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: 24, textDecorationLine: 'underline', marginTop: 1*height/100, marginBottom: 3*height/100}}>Order Summary</Text>
          <View style={{borderColor: '#EB5757', borderTopWidth: 1, borderBottomWidth: 1, paddingVertical: 5*height/100, borderStyle: 'dashed', borderRadius: 1}}>
            <View style={{paddingHorizontal: 5*width/100, }}>
            <View style={{justifyContent: 'space-between', flexDirection: 'row', }}>
            <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 18}}>Sub Total</Text>
            <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 18}}>₹ {this.props.temp_tp}.00</Text>
            </View>
            <View style={{justifyContent: 'space-between', flexDirection: 'row', marginTop: 1*height/100}}>
                <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 18}}>Delivery Charges</Text>
                <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 18}}>₹ 21.00</Text>
            </View>
            <View style={{justifyContent: 'space-between', flexDirection: 'row', marginTop: 2*height/100, borderColor: '#EB5757', borderTopWidth: 1, borderBottomWidth: 1, paddingVertical: 2*height/100}}>
                <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 18}}>Grand Total</Text>
                <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, fontSize: 18}}>₹ {this.props.temp_tp+21}.00</Text>
            </View>
            </View>
            </View>
            <Text style={{alignSelf: 'center', fontFamily: fontStyle.FONT_FAMILY_MEDIUM, fontSize: 12, marginHorizontal: 2*width/100, marginTop: 2*height/100}}>*Thankyou for choosing MistriTools ‘ services.  If you have any query about our services, you can contact us from the contact us screen.</Text>
        </Content>
        </View>
    );
  }
}

const mapStateToProps = state => {
  return state;
};
export default connect(mapStateToProps)(OrderSuccess);
