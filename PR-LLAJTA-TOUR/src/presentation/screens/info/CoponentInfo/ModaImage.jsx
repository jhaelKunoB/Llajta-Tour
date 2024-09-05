import React, { useState } from "react";
<<<<<<< HEAD
import { StyleSheet, View, Modal, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ImageViewer from 'react-native-image-zoom-viewer';
=======
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
>>>>>>> main

const ModalImage = ({ img }) => {

<<<<<<< HEAD
    const [modalVisible, setModalVisible] = useState(false);

    const images = [{ url: img }];
    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>

                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.imgContainer}>
                            <ImageViewer
                                imageUrls={images}
                                style={styles.imgModal}
                                enableSwipeDown
                                onSwipeDown={() => setModalVisible(false)}
                                renderIndicator={() => null}      
                            />
                        </View>
                    </View>
                </View>
            </Modal>


            <TouchableOpacity
                style={styles.styleContImage}
                onPress={() => setModalVisible(true)}>
                <Image source={{ uri: img }} style={styles.Styleimage} key={img} />
            </TouchableOpacity>

=======
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
>>>>>>> main
        </View>
    )
}

export default ModalImage

const styles = StyleSheet.create({
    Styleimage: {
        flex: 1,
        width:90,
        height:80
    },

    imgContainer: {
        borderRadius: 20,
        overflow: 'hidden',
        width: wp('90%'),
        height: hp('70%'),
    },

    imgModal: {
        width: '100%',
        height: '100%',
    },

    styleContImage: {
        width: '100%',
        height: '100%',
    },

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
    },
    modalView: {
        backgroundColor: '#1A2130',
        borderRadius: 20,
        padding: 7,
    },
});
