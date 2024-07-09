import React, { useState } from "react";
import { StyleSheet, View, Modal, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ImageViewer from 'react-native-image-zoom-viewer';

const ModalImage = ({ img }) => {

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
        </View>
    )
}

export default ModalImage

const styles = StyleSheet.create({
    Styleimage: {
        flex: 1,
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
        backgroundColor: '#bad9f2',
        borderRadius: 20,
        padding: 7,
    },
});
