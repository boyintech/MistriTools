import React, {Component} from 'react';
import {View, Text, Dimensions,
        Image, TouchableOpacity, Linking,
        TouchableNativeFeedback, TouchableWithoutFeedback, ActivityIndicator,
          StyleSheet,} from 'react-native';
import {Header, Content, Button,
        Item, Label, Input,
        Icon, Textarea} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import * as fontStyle from '../../../common/stylesheet/fontStyle.js';
import { ScrollView } from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';


const {height, width} = Dimensions.get('window');

var Data = [];

class OrderHistory extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        email: 'mistritoolss@gmail.com',
        message: '',
        url: 'mailto:mistritoolss@gmail.com?subject=SendMail&body=Description',
        callurl: 'tel:+919305382806',
        isLoaded: false,
    }
    console.log(this.props);
    this.getOrderHistory();
  }

  getOrderHistory = () => {
    firestore().collection("orders").where("user_id", "==", auth().currentUser.uid).
      get().then(querySnapshot => {
          querySnapshot.forEach((item, i) => {
              // console.log("=====================================================");
              // console.log(item._data);
              // console.log("=====================================================");
              Data.push(item._data);
          });
            this.setState({isLoaded: true});
            console.log(Data);
          }).
            catch(err => console.log("Error", err))
  }


  render(){
    return(
      <View style={{flex: 1, backgroundColor: 'white'}}>
         <Header style={{backgroundColor: '#EB5757', justifyContent: 'space-between', paddingTop: 1.5*height/100,}}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{flexDirection: 'row'}}>
                <AntDesign name='arrowleft' size={30} style={{color: 'white',}} />
                <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, color: 'white', fontSize: 22, marginTop: .5*height/100, marginLeft: 3*width/100,}}>Order History</Text>
            </TouchableOpacity>
        </Header>
            <Content>
            {this.state.isLoaded ? <ScrollView style={styles.Main} showsVerticalScrollIndicator={false}>
                    {Data.map(item => (
                        <View style={{height: 5*height/100, width: 95*width/100, backgroundColor: 'white', elevation: 5, alignSelf: 'center', marginVertical: 1*height/100, flexDirection: 'row', justifyContent: 'space-between'}}>
                          <View style={{marginLeft: 2*width/100}}>
                              <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, alignSelf: 'center'}}>Ordered At : </Text>
                              <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR}}>{item.orderd_at.slice(0, 10)}</Text>
                          </View>
                          <View style={{marginRight: 2*width/100}}>
                              <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR,}}>Total Price : </Text>
                              <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR, alignSelf: 'center'}}>{item.totalPrice}</Text>
                          </View>
                        </View>
                    ))}
            </ScrollView> : <View style={{marginTop: height/2.5}}><ActivityIndicator size="large" color='#EB5757' /></View>}
            </Content>
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

export default (connect)()(OrderHistory);
