import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import Fire from "../../firebase/Fire";
import { useSignedIn } from "../../hooks/useSignedIn";
import { View, SafeAreaView, Pressable } from "react-native";
import { Text } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "./styles";
import { SCREENS } from "..";
import AvatarCard from "../../components/card/AvatarCard/AvatarCard";
import { colors } from "../../config/colors";
import { useButtonsModal } from "../../components/Modal/ButtonsModalProvider";

function ProfileScreen() {
  const navigation = useNavigation();
  const { user, username } = useSignedIn();
  const [modalVisible, setModalVisible] = useState(false);

  const handleSignOutPress = () => {
    Fire.signOut().then((isSuccessful) => {
      if (isSuccessful) navigation.replace(SCREENS.signIn.name);
    });
  };

  const { showYesNoModal } = useButtonsModal();

  const showModal = () => {
    showYesNoModal({
      label: "Bạn có chắc muốn đăng xuất không?",
      onYes: () => {
        handleSignOutPress();
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
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
          onPress={showModal}
        >
          <Text style={styles.textStyle}>ĐĂNG XUẤT</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default ProfileScreen;
