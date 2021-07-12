import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import Fire from "../../firebase/Fire";
import { useSignedIn } from "../../hooks/useSignedIn";
import {
  View,
  SafeAreaView,
  Alert,
  Modal,
  Pressable,
  Image,
} from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "./styles";
import { SCREENS } from "..";
import AvatarCard from "../../components/card/AvatarCard/AvatarCard";
import { colors } from "../../config/colors";
import { PrimaryButton } from "../../components/buttons/PrimaryButton/PrimaryButton";

function ProfileScreen() {
  const navigation = useNavigation();
  const { user, username } = useSignedIn();
  const [modalVisible, setModalVisible] = useState(false);

  const handleSignOutPress = () => {
    Fire.signOut().then((isSuccessful) => {
      if (isSuccessful) navigation.replace(SCREENS.signIn.name);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Bạn có chắc muốn đăng xuất không?
            </Text>
            <View
              style={{
                flexDirection: "row",
              }}
            >
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Không</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={handleSignOutPress}
              >
                <Text style={styles.textStyle}>Có</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.card}>
        <AvatarCard user={user} username={username}></AvatarCard>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color={colors.icon} size={28} />
          <Text style={styles.textItem}>{user?.country}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="gender-male-female" color={colors.icon} size={28} />
          <Text style={styles.textItem}>
            {user?.gender === "Male" ? "Nam" : "Nữ"}
          </Text>
        </View>
        <View style={styles.row}>
          <Icon name="calendar-today" color={colors.icon} size={28} />
          <Text style={styles.textItem}>{user?.birthday}</Text>
        </View>
      </View>

      <View style={styles.menuWrapper}>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => {
            navigation.navigate(SCREENS.note.name);
          }}
        >
          <Text style={styles.textStyle}>GHI CHÚ</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => {
            navigation.navigate(SCREENS.editProfile.name);
          }}
        >
          <Text style={styles.textStyle}>ĐỔI THÔNG TIN CÁ NHÂN</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => {
            navigation.navigate(SCREENS.editPass.name);
          }}
        >
          <Text style={styles.textStyle}>ĐỔI MẬT KHẨU</Text>
        </Pressable>
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.textStyle}>ĐĂNG XUẤT</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default ProfileScreen;
