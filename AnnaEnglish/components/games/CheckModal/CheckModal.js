import React, { useEffect } from "react";
// import Modal from 'react-native-modal';
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
} from "react-native";
import { useSignedIn } from "../../../hooks/useSignedIn";

export default function CheckModal({ getVisible, onVisibleChange, isCorrect }) {
  const [visible, setVisible] = React.useState();
  const { user } = useSignedIn();
  const backgroundColor = isCorrect ? "green" : "red";
  const label = isCorrect ? "CHÍNH XÁC" : "CHƯA ĐÚNG NHA";

  const imageCorrect_Male_Url = {
    uri: "https://imgur.com/LptBavo.png",
  };
  const imageCorrect_Female_Url = {
    uri: "https://imgur.com/Dtm2ZfO.png",
  };
  const imageWrong_Male_Url = {
    uri: "https://imgur.com/MmPDFGp.png",
  };
  const imageWrong_Female_Url = {
    uri: "https://imgur.com/3ii8hWv.png",
  };

  const imageUrl =
    user?.gender === "Male"
      ? isCorrect
        ? imageCorrect_Male_Url
        : imageWrong_Male_Url
      : isCorrect
      ? imageCorrect_Female_Url
      : imageWrong_Female_Url;

  React.useEffect(() => {
    getVisible?.(visible, setVisible);
  }, []);

  const handleButtonPress = () => {
    setVisible(false);
  };

  React.useEffect(() => {
    onVisibleChange?.(visible);
  }, [visible]);

  return (
    <Modal transparent visible={visible}>
      <View style={styles.modalBackGround}>
        <Animated.View style={[styles.modalContainer]}>
          <View style={{ alignItems: "center", marginBottom: 10 }}>
            <Image
              source={imageUrl}
              style={{ height: 150, width: 150, marginVertical: 10 }}
            />
          </View>
          <PrimaryButton
            label={label}
            onPress={handleButtonPress}
            background={backgroundColor}
          />
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
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
});
