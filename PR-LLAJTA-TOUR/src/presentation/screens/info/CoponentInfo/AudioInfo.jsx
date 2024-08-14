import { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Audio } from 'expo-av';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const AudioGiif = require('../assets/Microphone.gif')
const ImgAudio1 = require('../assets/Microphone-0.jpg')


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
        <View style={styles.ContImgAudio}>
            <ImageBackground source={isPlaying ? AudioGiif : ImgAudio1} style={styles.ImgAudio} resizeMode="cover" />
            <View style={styles.ContIcontPlay}>
              <TouchableOpacity onPress={isPlaying ? pauseSound : playSound}>
                <Ionicons name={isPlaying ? "pause-circle-sharp" : "play-circle-sharp"} style={styles.IconPlay} color={'#009194'} size={wp('10%')} />
              </TouchableOpacity>
            </View>
        </View>
      ) : (
        <> 
         <View style={styles.ContImgAudio}>
            <ImageBackground source={isPlaying ? AudioGiif : ImgAudio1} style={styles.ImgAudio} resizeMode="cover" />
            <View style={styles.ContIcontPlay}>       
                <MaterialIcons name="play-disabled" style={styles.IconPlay} color={'#009194'} size={wp('11%')}/>
            </View>
        </View>
        </>
      )}
    </View>
  );
}

export default AudioInfo

const styles = StyleSheet.create({

  container: {
   
    backgroundColor: '#DCF2F160',
    flexDirection: 'row',
    borderRadius: 21,
    width:150,
    alignItems:'flex-end',
  },


  ContImgAudio:{
    width:'100%', 
    flexDirection:'row', 
    borderWidth:2, 
    borderRadius:15,
    overflow:'hidden',
    borderColor:'#DCF2F1',
  },
  contTittle: {
    flex: 1,
    justifyContent: 'center'
  },
  ImgAudio: {
    width: wp('17%'),
    height: hp('7%'),
    borderRadius: 21
  },
  ContTextIcon: {
    flex: 1,
    alignItems:'center'
  },

  tituloAudio: {
    fontSize: 19,
    fontWeight: '300'
  },
  ContIcontPlay: {
    flex:1,
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
