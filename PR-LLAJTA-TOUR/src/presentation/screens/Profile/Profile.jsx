import React from 'react';
import {
  Text,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import BottomRabVavigator from '../Profile/BottomRabVavigator';
const Cocha = require('./assets/Ciudad_de_Cochabamba.png');
const Avatar = require('./assets/fondo.jpg');

const Profile = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.ContImgCocha} source={Cocha}>
        <View style={styles.ContHeader}>
          <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="chevron-back-circle-sharp"
                size={wp('11%')}
                color="#DCF2F1"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.headerCenter}></View>
          <View style={styles.headerRight}></View>
        </View>

        <View style={styles.ContImag}>
          <Image source={Avatar} style={styles.imgProfile}></Image>
          <View style={styles.ContInfo}>
            <Text style={styles.StytextName}>Jhael Kuno Bustos</Text>
            <Text style={styles.StytxetEmail}>
              kbj5001497@est.univalle.edu
            </Text>
          </View>
        </View>
      </ImageBackground>

      {/* Adjusted TabView */}
      <View style={styles.contOptions}>
        <BottomRabVavigator />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'white'
  },
  contOptions: {
    marginTop:hp("14%"),
    flex: 1,
    backgroundColor: 'white',
  },
  StytextName: {
    fontSize: 19,
    color: '#365486',
    fontWeight: '600',
  },
  StytxetEmail: {
    fontSize: 10,
    fontWeight: '300',
  },
  ContInfo: {
    marginVertical: 3,
    alignItems: 'center',
  },
  ContImgCocha: {
    height: hp('20%'),
    position: 'relative',
  },
  ContImag: {
    alignItems: 'center',
    position: 'absolute',
    width: wp('100%'),
    top: hp('13%'),
  },
  imgProfile: {
    width: 110,
    height: 110,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: '#DCF2F1',
    backgroundColor: '#f0f0f0',
  },
  ContHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('1%'),
  },
  headerLeft: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRight: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  headerCenter: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
});