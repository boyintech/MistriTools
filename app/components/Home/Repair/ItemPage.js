import React, {Componenet} from 'react';
import {View, Text, Dimensions,
        Image, StyleSheet} from 'react-native';
import {Header, Icon, Content, Footer} from 'native-base';
import { ScrollView, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import * as fontStyle from '../../../common/stylesheet/fontStyle.js';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import {connect} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

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


const Products = [
    {
        product_name: 'Tyres',
        price: 2500,
        photo_url: require('../../../assets/icons/tyre.png'),
        url: '../../../assets/icons/tyre.png'
    },
    {
        product_name: 'Oiling',
        price: 2500,
        photo_url: require('../../../assets/icons/oil.png'),
        url: '../../../assets/icons/oil.png'
    },
    {
        product_name: 'Battery',
        price: 2500,
        photo_url: require('../../../assets/icons/battery.png'),
        url: '../../../assets/icons/battery.png'
    },
    {
        product_name: 'Servicing',
        price: 2500,
        photo_url: require('../../../assets/icons/tools.png'),
        url: '../../../assets/icons/tools.png',
    },
    {
        product_name: 'Other',
        price: 2500,
        photo_url: require('../../../assets/images/other.png'),
        url: '../../../assets/images/other.png',
    },
]

var Temp;

class ItemPage extends React.Component {

    constructor(props){
        super(props);
        console.log(this.props.route.params.shop_data);
        this.getProducts();
       }

    UNSAFE_componentWillReceiveProps(prev){
        console.log(prev);
    }

    getProducts = async() => {
      var x = this.props.route.params.shop_id+"_"+this.props.route.params.category;
      console.log("X = ", x)
      firestore().collection('vendors').doc(this.props.route.params.shop_id).get().
        then(res => {console.log(res)
              if(this.props.route.params.category == 'carData'){
                Temp = res._data.carData;
              } else if(this.props.route.params.category == 'bikeData'){
                Temp = res._data.bikeData;
              }
              console.log(Temp);
          }).
        catch(err => console.log(err))
    }

  render(){
    return(
      <View style={{backgroundColor: 'white', flex: 1}}>
        <Header style={{backgroundColor: '#EB5757', justifyContent: 'space-between', paddingTop: 1*height/100}}>
            <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                <AntDesign name='arrowleft' size={30} style={{color: 'white',}} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Cart')}>
                <Image source={require('../../../assets/icons/cart.png')} style={{height: 4*height/100, width: 4*height/100}} />
            </TouchableOpacity>
        </Header>
        <Content>
            <View style={{paddingHorizontal: 4*width/100}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 1*height/100, flexWrap: 'wrap',}}>
                    {Products.map(item => (
                                <TouchableWithoutFeedback style={{height: 42*width/100, width: 45*width/100, backgroundColor: 'white', elevation: 5, borderRadius: 15, marginTop: 2*height/100}}>
                                <View>
                                    <View style={{height: 15.5*height/100}}>
                                    <Image source={item.photo_url} style={{height: 30*width/100, width: 30*width/100, alignSelf: 'center'}} />
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 2*width/100, height: 2*height/100}}>
                                        <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR}}>{item.product_name}</Text>
                                        <Text style={{fontFamily: fontStyle.FONT_FAMILY_REGULAR}}>{item.price} Rs.</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => this.props.addToCart(item)} style={{justifyContent: 'flex-end'}}>
                                    <View style={{backgroundColor: '#6FCF97', height: 5*height/100, borderBottomLeftRadius: 15, borderBottomRightRadius: 15, justifyContent: 'center'}}>
                                        <Text style={{alignSelf: 'center', fontFamily: fontStyle.FONT_FAMILY_REGULAR, color: 'white', fontSize: 16}}>Add To Cart</Text>
                                    </View>
                                    </TouchableOpacity>
                                </View>
                                </TouchableWithoutFeedback>
                    ))}
                </View>
            </View>
            </Content>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('Cart',  {shop_data: this.props.route.params.shop_data, transition: 'vertical'})}>
            <Footer style={{backgroundColor: '#3B97D3', justifyContent: 'center'}}>
            <Text style={{color: 'white', fontSize: 20, fontFamily: fontStyle.FONT_FAMILY_REGULAR, alignSelf: 'center'}}>Proceed To Cart</Text>
            </Footer>
            </TouchableOpacity>
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

const mapDispatchToProps = dispatch => {
    return {
      addToCart: (productData) => dispatch({type: 'ADD_TO_CART', data: productData})
    }
  }

const mapStateToProps = state => {
    return state;
  };
  export default connect(mapStateToProps, mapDispatchToProps)(ItemPage);
