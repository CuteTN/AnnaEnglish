import React, { useEffect } from "react";
// import Modal from 'react-native-modal';
import { colors } from "../../../config/colors";
import { View, StyleSheet, Modal, Pressable, Text } from "react-native";
import { useSignedIn } from "../../../hooks/useSignedIn";

export default function Modal({ visible, onButtonPress, label, image, price }) {
  const { user } = useSignedIn();

  const imageCoin = image;

  const handleButtonPress = () => {
    onButtonPress?.();
  };

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View>
            <Text style={styles.modalText}>{label}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {}}
            >
              <Text style={styles.textStyle}>Không</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {}}
            >
              <Text style={styles.textStyle}>Có</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 15,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    width: 100,
    marginLeft: 5,
    marginRight: 5,
  },
  buttonOpen: {
    backgroundColor: colors.primary,
  },
  buttonClose: {
    backgroundColor: colors.primary,
  },
  textStyle: {
    color: "white",
    fontFamily: "Cucho",
    fontSize: 18,
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "Cucho",
    fontSize: 18,
  },
});
