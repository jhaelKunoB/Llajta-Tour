import { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
//import Slider from '@react-native-community/slider';


import ImagAud from '../assets/microfono.png';

const AudioInfo = ({ data }) => {
  const [placeData, setplaceData] = useState()
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);



  async function playSound() {
    if (sound) {
      console.log('Resuming Sound');
      await sound.playAsync();
      setIsPlaying(true);
    } else {
      console.log('Loading Sound');
      try {
        console.log(data)
        if (data) {
          const { sound } = await Audio.Sound.createAsync({ uri: placeData });
          setSound(sound);
          sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);

          await sound.playAsync();
          setIsPlaying(true);
        }
      } catch (error) {
        console.error('Error loading sound:', error);
      }
    }
  }



  async function onPlaybackStatusUpdate(status) {
    try {
      if (status.positionMillis == status.playableDurationMillis) {
        setIsPlaying(false);
        setSound(null);
      }
    } catch (e) {
      console.log(e)
    }
  }


  async function pauseSound() {
    if (sound) {
      await sound.pauseAsync();
      setIsPlaying(false);
    }
  }

  useEffect(() => {
    if (data) {
      setplaceData(data)
    }
  }, [data]);


  useEffect(() => {
    return sound
      ? () => {
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);

  return (

    <View style={styles.container}>

      {data ? (
        <View style={{width:'100%', flexDirection:'row'}}>
          <View style={{ flex: 0.6, borderRadius: 21 }}>
            <Image source={ImagAud} style={styles.ImgAudio} resizeMode="cover" />
          </View>

          <View style={styles.ContTextIcon}>
            <View style={styles.contTittle}>
              <Text style={styles.tituloAudio}>Cochabamba podcast</Text>
            </View>

            <View style={styles.ContIcontPlay}>
              <TouchableOpacity onPress={isPlaying ? pauseSound : playSound}>
                <Ionicons name={isPlaying ? "pause-circle-sharp" : "play-circle-sharp"} style={styles.IconPlay} color={'#009194'} size={wp('14%')} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <View>
          
        </View>
      )}
    </View>
  );
}

export default AudioInfo

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    flexDirection: 'row',
    marginHorizontal: wp('5%'),
    marginTop: wp('2%'),
    marginBottom: wp('8%'),
    borderRadius: 21
  },
  contTittle: {
    flex: 1,
    justifyContent: 'center'
  },
  ImgAudio: {
    width: wp('25%'),
    height: hp('10%'),
    borderRadius: 21
  },
  ContTextIcon: {
    flex: 1,
    flexDirection: 'row'
  },
  tituloAudio: {
    fontSize: 19,
    fontWeight: '300'
  },
  ContIcontPlay: {
    flex: 0.6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  IconPlay: {
    alignSelf: 'center'
  },

  //para slider
  progressContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  timeContainer: {
    width: wp('80%'),
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
