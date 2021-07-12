import React from "react";
// import Modal from 'react-native-modal';
import { colors } from "../../config/colors";
import { View, StyleSheet, Modal, Pressable, Text } from "react-native";

export default function ButtonsModal({ visible, label, imageUrl, text, buttons }) {
  return (
    <Modal
      animationType="fade"
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
            <Text style={styles.modalLabel}>{label}</Text>
          </View>
          <View>
            <Text style={styles.modalText}>{text}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            {buttons?.map((button, index) => (
              <Pressable
                key={index}
                style={[styles.button, styles.buttonClose]}
                onPress={button?.onPress}
              >
                <Text style={styles.textStyle}>{button?.label}</Text>
              </Pressable>
            ))}
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
  modalLabel: {
    marginBottom: 15,
    fontWeight: "700",
    textAlign: "center",
    fontFamily: "Cucho",
    fontSize: 24,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontFamily: "Cucho",
    fontSize: 18,
    lineHeight: 30,
  },
});
