import React, { useEffect } from "react";
import { colors } from "../../../config/colors";
import { PrimaryButton } from "../../buttons/PrimaryButton/PrimaryButton";
import {
  View,
  StyleSheet,
  Button,
  Modal,
  Image,
  Text,
  TouchableOpacity,
  Animated,
  BackHandler,
  ImageBackground,
} from "react-native";
export default function CompleteModal({ visible, onButtonPress }) {
  const imageUrl = {
    uri: "https://imgur.com/PKhGUBQ.png",
  };

  const handleButtonPress = () => {
    onButtonPress?.();
  };

  return (
    <Modal transparent visible={visible}>
      <View style={styles.modalBackGround}>
        <Animated.View style={[styles.modalContainer]}>
          <View style={{ alignItems: "center" }}>
            <ImageBackground
              source={imageUrl}
              style={{ width: 400, height: 400 }}
            >
              <View
                style={{
                  marginTop: 130,
                  justifyContent: "center",
                  padding: 120,
                }}
              >
                <PrimaryButton
                  label={"TIẾP TỤC"}
                  onPress={handleButtonPress}
                  background={"#99F7AB"}
                  color={"black"}
                ></PrimaryButton>
              </View>
            </ImageBackground>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    justifyContent: "center",
  },
  modalBackGround: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  modalContainer: {
    width: "80%",
    height: 350,
    backgroundColor: "transparent",
    borderRadius: 20,
  },
});
