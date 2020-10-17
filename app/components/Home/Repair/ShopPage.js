import React, {Component} from 'react';
import {View, Text, Dimensions,
        Image, StyleSheet} from 'react-native';
import {Header, Icon} from 'native-base';
import { ScrollView, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import * as fontStyle from '../../../common/stylesheet/fontStyle.js';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import {connect} from 'react-redux';

const {height, width} = Dimensions.get('window');

const shopData = [
    {
        OwnerName: 'Proprietor’s Name',
        Address: '123',
        City: 'Faizabad',
        State: 'Uttar Pradesh',
        Description: 'Contact Me For Instant Services'
    }
];


class ShopPage extends React.Component {

    constructor(props){
        super(props);
        this.sheetRef = React.createRef();
        this.sheetRef2 = React.createRef();
    }


     renderBikes = () => (
        <View
          style={{
            backgroundColor: 'white',
            padding: 16,
            height: 85*height/100,
          }}
        >
            <View style={{flexDirection: 'row', }}>
                <TouchableOpacity onPress={() => this.sheetRef.current.snapTo(1)}>
                <AntDesign name='down' style={{color: '#6D6868', fontSize: 18}}/>
                </TouchableOpacity>
                <Text style={{marginLeft: 25*width/100, fontFamily: fontStyle.FONT_FAMILY_MEDIUM, color: '#6D6868', fontSize: 20}}>Choose Company</Text>
            </View>
            <View style={{}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 3*height/100}}>
                    <TouchableWithoutFeedback style={{height: 45*width/100, width: 45*width/100, backgroundColor: 'white', justifyContent: 'center', elevation: 5, borderRadius: 15, }} onPress={() => this.props.navigation.navigate('ItemPage', {shop_data: this.props.route.params.shop_data, category: 'bikeData'})}>
                    <View style={{justifyContent: 'center'}}>
                        <Image source={require('../../../assets/images/Hero.png')} style={{height: 30*width/100, width: 40*width/100, alignSelf: 'center'}} />
                    </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback style={{height: 45*width/100, width: 45*width/100, backgroundColor: 'white', elevation: 5, borderRadius: 15, justifyContent: 'center'}} onPress={() => this.props.navigation.navigate('ItemPage', {shop_data: this.props.route.params.shop_data, category: 'bikeData'})}>
                    <View>
                        <Image source={require('../../../assets/images/bajaj.png')} style={{height: 10*width/100, width: 40*width/100,  alignSelf: 'center'}} />
                    </View>
                    </TouchableWithoutFeedback>
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 3*height/100}}>
                    <TouchableWithoutFeedback style={{height: 45*width/100, width: 45*width/100, backgroundColor: 'white', elevation: 5, borderRadius: 15, justifyContent: 'center' }} onPress={() =>this.props.navigation.navigate('ItemPage', {shop_data: this.props.route.params.shop_data, category: 'bikeData'})}>
                    <View>
                        <Image source={require('../../../assets/images/tvs.png')} style={{height: 40*width/100, width: 40*width/100, alignSelf: 'center'}} />
                    </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback style={{height: 45*width/100, width: 45*width/100, backgroundColor: 'white', elevation: 5, borderRadius: 15, justifyContent: 'center'}} onPress={() => this.props.navigation.navigate('ItemPage', {shop_data: this.props.route.params.shop_data, category: 'bikeData'})}>
                    <View>
                        <Image source={require('../../../assets/images/yamaha.png')} style={{height: 40*width/100, width: 40*width/100, alignSelf: 'center'}} />
                    </View>
                    </TouchableWithoutFeedback>
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 3*height/100}}>
                    <TouchableWithoutFeedback style={{height: 45*width/100, width: 45*width/100, backgroundColor: 'white', justifyContent: 'center', elevation: 5, borderRadius: 15, }} onPress={() => this.props.navigation.navigate('ItemPage', {shop_data: this.props.route.params.shop_data, category: 'bikeData'})}>
                    <View>
                        <Image source={require('../../../assets/images/honda.png')} style={{height: 35*width/100, width: 35*width/100, alignSelf: 'center'}} />
                    </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback style={{height: 45*width/100, width: 45*width/100, backgroundColor: 'white', elevation: 5, borderRadius: 15, justifyContent: 'center'}} onPress={() => this.props.navigation.navigate('ItemPage', {shop_data: this.props.route.params.shop_data, category: 'bikeData'})}>
                    <View>
                        <Image source={require('../../../assets/images/other.png')} style={{height: 12*width/100, width: 40*width/100, alignSelf: 'center'}} />
                    </View>
                    </TouchableWithoutFeedback>
                </View>

            </View>
        </View>
      );

      renderCars = () => (
        <View
          style={{
            backgroundColor: 'white',
            padding: 16,
            height: 85*height/100,
          }}
        >
            <View style={{flexDirection: 'row', }}>
                <TouchableOpacity onPress={() => this.sheetRef.current.snapTo(1)}>
                <AntDesign name='down' style={{color: '#6D6868', fontSize: 18}}/>
                </TouchableOpacity>
                <Text style={{marginLeft: 25*width/100, fontFamily: fontStyle.FONT_FAMILY_MEDIUM, color: '#6D6868', fontSize: 20}}>Choose Company</Text>
            </View>
            <View style={{}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 3*height/100}}>
                    <TouchableWithoutFeedback style={{height: 45*width/100, width: 45*width/100, backgroundColor: 'white', justifyContent: 'center', elevation: 5, borderRadius: 15, }} onPress={() => this.props.navigation.navigate('ItemPage', {shop_data: this.props.route.params.shop_data, category: 'carData'})}>
                    <View style={{justifyContent: 'center'}}>
                        <Image source={require('../../../assets/icons/Hero-car.png')} style={{height: 40*width/100, width: 40*width/100, alignSelf: 'center'}} />
                    </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback style={{height: 45*width/100, width: 45*width/100, backgroundColor: 'white', elevation: 5, borderRadius: 15, justifyContent: 'center'}} onPress={() => this.props.navigation.navigate('ItemPage', {shop_data: this.props.route.params.shop_data, category: 'carData'})}>
                    <View>
                        <Image source={require('../../../assets/icons/hyundai-car.png')} style={{height: 40*width/100, width: 40*width/100,  alignSelf: 'center'}} />
                    </View>
                    </TouchableWithoutFeedback>
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 3*height/100}}>
                    <TouchableWithoutFeedback style={{height: 45*width/100, width: 45*width/100, backgroundColor: 'white', elevation: 5, borderRadius: 15, justifyContent: 'center' }} onPress={() =>this.props.navigation.navigate('ItemPage', {shop_data: this.props.route.params.shop_data, category: 'carData'})}>
                    <View>
                        <Image source={require('../../../assets/icons/toyota-car.png')} style={{height: 40*width/100, width: 40*width/100, alignSelf: 'center'}} />
                    </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback style={{height: 45*width/100, width: 45*width/100, backgroundColor: 'white', elevation: 5, borderRadius: 15, justifyContent: 'center'}} onPress={() => this.props.navigation.navigate('ItemPage', {shop_data: this.props.route.params.shop_data, category: 'carData'})}>
                    <View>
                        <Image source={require('../../../assets/icons/renault-car.png')} style={{height: 40*width/100, width: 40*width/100, alignSelf: 'center'}} />
                    </View>
                    </TouchableWithoutFeedback>
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 3*height/100}}>
                    <TouchableWithoutFeedback style={{height: 45*width/100, width: 45*width/100, backgroundColor: 'white', justifyContent: 'center', elevation: 5, borderRadius: 15, }} onPress={() => this.props.navigation.navigate('ItemPage', {shop_data: this.props.route.params.shop_data, category: 'carData'})}>
                    <View>
                        <Image source={require('../../../assets/icons/nissan-car.png')} style={{height: 35*width/100, width: 35*width/100, alignSelf: 'center'}} />
                    </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback style={{height: 45*width/100, width: 45*width/100, backgroundColor: 'white', elevation: 5, borderRadius: 15, justifyContent: 'center'}} onPress={() => this.props.navigation.navigate('ItemPage', {shop_data: this.props.route.params.shop_data, category: 'carData'})}>
                    <View>
                        <Image source={require('../../../assets/images/other.png')} style={{height: 12*width/100, width: 40*width/100, alignSelf: 'center'}} />
                    </View>
                    </TouchableWithoutFeedback>
                </View>

            </View>
        </View>
      );

  render(){
    return(
      <View style={{backgroundColor: 'white', flex: 1}}>
          <View style={{height: 30*height/100, flexDirection: 'row', justifyContent: 'space-between', paddingTop: 2*height/100, paddingHorizontal: 1 *height/100}}>
                    <Image source={require('../../../assets/images/shop.png')} style={{height: 30*height/100, width: width, position: 'absolute'}} />
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <AntDesign name='arrowleft' size={30} style={{color: 'white'}} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Cart')}>
                        <Image source={require('../../../assets/icons/cart.png')} style={{height: 4*height/100, width: 4*height/100}} />
                    </TouchableOpacity>
          </View>

        <View>
            <View style={{paddingTop: 2*height/100, paddingLeft: 1*height/100, borderBottomWidth: 1, borderBottomColor: '#E5E5E5', }}>
                <Text style={{fontSize: 20, fontFamily: fontStyle.FONT_FAMILY_REGULAR, marginBottom: .5*height/100}}>{shopData[0].OwnerName}</Text>
                <Text style={{fontSize: 18, fontFamily: fontStyle.FONT_FAMILY_REGULAR, color: '#6D6868', marginBottom: 1*height/100}}>{shopData[0].Address}, {shopData[0].City}, {shopData[0].State}</Text>
            </View>
            <View style={{paddingTop: 2*height/100, paddingLeft: 1*height/100, borderBottomWidth: 1, borderBottomColor: '#E5E5E5', }}>
                <Text style={{fontSize: 18, fontFamily: fontStyle.FONT_FAMILY_REGULAR, marginBottom: .5*height/100, color: '#6D6868'}}>{shopData[0].Description}</Text>
                <Text style={{fontSize: 18, fontFamily: fontStyle.FONT_FAMILY_REGULAR, color: '#6D6868', marginBottom: 1*height/100}}>Auto Apllies During Checkout</Text>
            </View>
        </View>

        <BottomSheet ref={this.sheetRef} snapPoints={[0, 0, 85*height/100]} borderRadius={10} renderContent={this.renderBikes} />
        <BottomSheet ref={this.sheetRef2} snapPoints={[0, 0, 85*height/100]} borderRadius={10} renderContent={this.renderCars} />
        <View style={{paddingVertical: 3*height/100, marginTop: 1*height/100}}>
            <Text style={{alignSelf: 'center', fontSize: 20, fontFamily: fontStyle.FONT_FAMILY_MEDIUM, color: '#6D6868'}}>Choose Your Vehicle</Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 5*height/100}}>
                    <TouchableWithoutFeedback style={{height: 45*width/100, width: 45*width/100, backgroundColor: 'white', elevation: 5, borderRadius: 15}} onPress={() => this.sheetRef.current.snapTo(450)}>
                    <View >
                    <Image source={require('../../../assets/images/bike.png')} style={{height: 45*width/100, width: 45*width/100}} />

                    </View>
                    </TouchableWithoutFeedback>

                    <TouchableWithoutFeedback style={{height: 45*width/100, width: 45*width/100, backgroundColor: 'white', elevation: 5, borderRadius: 15}} onPress={() => this.sheetRef2.current.snapTo(450)}>
                    <View>
                        <Image source={require('../../../assets/images/car.png')} style={{height: 45*width/100, width: 45*width/100}} />
                    </View>
                    </TouchableWithoutFeedback>
            </View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
    Main: {
        marginTop: 1*height/100,
        paddingHorizontal: 2*width/100,
        marginBottom: 7*height/100
    }
})

export default ShopPage;
