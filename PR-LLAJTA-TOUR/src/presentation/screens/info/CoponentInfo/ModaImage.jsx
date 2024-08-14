import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Modal,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FontAwesome } from "@expo/vector-icons";
import ImageViewer from "react-native-image-zoom-viewer";
import ImgLong from '../assets/loading copy.gif'

const ModalImage = ({ img }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [indeImg, setImgIndex] = useState(0)
  const imageUrls = img.map((imageUrl) => ({ url: imageUrl }));

  const OpenIndex = (index) => {
    setImgIndex(index)
    setModalVisible(true)
  }
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.imgContainer}>
              <ImageViewer
                imageUrls={imageUrls}
                style={styles.imgModal}
                enableSwipeDown
                index={indeImg}
                onSwipeDown={() => setModalVisible(false)}
                renderHeader={() => (
                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={() => setModalVisible(false)}
                    >
                      <FontAwesome name="close" size={28} color="white" />
                    </TouchableOpacity>
                  )}
              />
            </View>
          </View>
        </View>
      </Modal>


      {img.map((item, index) => (
        <ImageBackground source={ImgLong} style={styles.imageItem} key={index}>
          <TouchableOpacity
            key={index}
            style={styles.styleContImage}
            onPress={() => OpenIndex(index)}>
            <Image
              source={{ uri: item }}
              style={styles.Styleimage}
              onError={(e) =>
                console.error(
                  `Error loading image at index ${index}:`,
                  e.nativeEvent.error
                )
              } // Añadir manejo de errores
            />
          </TouchableOpacity>
        </ImageBackground>
      ))}

    </>
  );
};

export default ModalImage;

const styles = StyleSheet.create({

  
  Styleimage: {
    flex: 1,
    width: 90,
    height: 80,
  },

  imgContainer: {
    borderRadius: 20,
    overflow: "hidden",
    width: wp("90%"),
    height: hp("70%"),
  },

  imgModal: {
    width: "100%",
    height: "100%",
  },

  styleContImage: {
    width: "100%",
    height: "100%",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
  },
  modalView: {
    backgroundColor: "#1A2130",
    borderRadius: 20,
    padding: 7,
  },

  imageItem: {
    marginHorizontal: wp("2%"),
    borderRadius: 10,
    overflow: "hidden",
    height: 80,
  },

  closeButton:{
    paddingHorizontal:wp("7%"),
    paddingTop:10,
},

});
