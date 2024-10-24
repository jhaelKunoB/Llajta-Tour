import { useRef, useState, useEffect } from "react";
import { Modal, View, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome, Entypo, MaterialIcons } from "@expo/vector-icons";
import { Video, ResizeMode } from "expo-av";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const ModalVideo = ({ videoData, useVideoModal, setVideoModal }) => {
  const video = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlay, setPlay] = useState(false);


  useEffect(() => {
    if (video.current && useVideoModal) {
      video.current.playAsync();
      setPlay(true);
    }
  }, [useVideoModal]);


  const toggleMute = () => {
    if (video.current) {
      setIsMuted((prevIsMuted) => {
        video.current.setIsMutedAsync(!prevIsMuted);
        return !prevIsMuted;
      });
    }
  };


  const togglePPlay = () => {
    if (video.current) {
      video.current.getStatusAsync().then((status) => {
        if (status.isPlaying) {
          setPlay(false)
          video.current.pauseAsync();
        } else {
          video.current.playAsync();
          setPlay(true)
        }
      });
    }
  };

  const CloseModal = () =>{
    setVideoModal(false)
    setPlay(false)
  }

  


  return (
    <>
      <Modal
        transparent={true}
        animationType="fade"
        visible={useVideoModal}
        onRequestClose={() => setVideoModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.topBar}>
            <View style={styles.contContOptionVideo}>

            <TouchableOpacity
                onPress={() => togglePPlay()}
                style={styles.contIcons}
              >
                <Entypo
                  name={isPlay ? "controller-paus" : "controller-play"}
                  style={styles.iconPlay}
                  color={"white"}
                  size={wp("8%")}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => toggleMute()}
                style={styles.contIcons}
              >
                <MaterialIcons
                  name={isMuted ? "volume-off" : "volume-up"}
                  style={styles.iconSound}
                  color={"white"}
                  size={wp("8%")}
                />
              </TouchableOpacity>

             
            </View>

            <View style={styles.ConyCotClose}>
              <TouchableOpacity
                onPress={() => CloseModal()}
                style={styles.contIconsClose}
              >
                <FontAwesome
                  name="close"
                  style={styles.iconClose}
                  color={"white"}
                  size={wp("8%")}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.videoContainer}>
            <Video
              ref={video}
              source={{ uri: videoData }}
              resizeMode={ResizeMode.STRETCH}
              isLooping
              volume={0.9}
              //shouldPlay
              isMuted={isMuted}
              style={styles.video}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

export default ModalVideo;

const styles = StyleSheet.create({
  //para el video modal
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },

  topBar: {
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    width: "100%",
    top: 20,
    zIndex: 1,
    paddingVertical: hp("2%"),
  },

  contContOptionVideo: {
    flex: 4,
    flexDirection: "row",
    paddingHorizontal: wp("4%"),
  },
  contIcons: {
    width: "18%",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },

  ConyCotClose: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  contIconsClose: {
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
  },

  iconSound: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "#86B6F6",
    borderRadius: 10,
    padding: 5,
  },

  iconPlay:{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "#176B87",
    borderRadius: 10,
    padding: 5,
  },

  iconClose: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    padding: 5,
  },

  videoContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  video: {
    width: 370,
    height: "70%",
  },
});
