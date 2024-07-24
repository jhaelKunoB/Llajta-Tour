import React, { Component } from 'react'
import {View , Image, StyleSheet, Text} from 'react-native'
//import PlaceStyle from './styles/PlaceStyle'
import Developer from './assets/Developer activity-bro.png'
import styles from '../findplaces/styles/CartStyle'

const Place = () => { 
    return (
      <View style={PlaceStyle.Background}>
        <Image source={Developer} style={PlaceStyle.ImgDesarro}/>
        <Text style={PlaceStyle.TEXT}>
          DESAROLLANDO
        </Text>
      </View>
    )
}
export default Place


const PlaceStyle = StyleSheet.create({

  Background: {
      backgroundColor: 'white',
      flex: 1,
      justifyContent:'center',
      alignItems:'center'
  },
  ImgDesarro:{
    height:300,
    width:'90%'
  },

  TEXT:{
    fontSize:20,

    fontWeight:'bold'
  }

});