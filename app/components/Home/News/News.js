import React, {Component} from 'react';
import {View, Text, Dimensions, Image} from 'react-native';

const height = Dimensions.get('window').height;


class News extends React.Component {
  render(){
    return(
      <View style={{marginTop: height/2, alignItems: 'center'}}>
        <Text>This Will Be Our Newsa Page</Text>
      </View>
    );
  }
}

export default News;
