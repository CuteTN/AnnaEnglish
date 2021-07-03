import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import { colors } from "../../config/colors";
import { useRealtimeFire } from "../../hooks/useRealtimeFire";
import Header from "../../components/Header/Header";
import { styles } from "./styles";
import Fire from "../../firebase/Fire";
import { useNavigation } from "@react-navigation/native";
import { SCREENS } from "..";
import { useSignedIn } from "../../hooks/useSignedIn";
import { PrimaryButton } from "../../components/buttons/PrimaryButton/PrimaryButton";

export default NoteScreen = ({ route }) => {
  const { user, updateUser } = useSignedIn();
  const [tempNote, setTempNote] = useState("");

  useEffect(() => {
    if (user?.note)
      setTempNote(user.note);
  }, [user?.note])

  const handleSaveButtonPress = () => {
    updateUser({ note: tempNote });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 30 }}>
        <Header title={"Ghi chú"} />
      </View>

      <View
        contentContainerStyle={styles.scrollViewWrapper}
        style={[styles.container]}
      >
        <TextInput
          style={[styles.container, styles.textInput]}
          textAlignVertical="top"
          autoFocus
          multiline={true}
          numberOfLines={4}
          onChangeText={setTempNote}
          value={tempNote}
          keyboardType="default"
        />
        <View style={styles.getStartedbtnItemWrapper}>
          <PrimaryButton label={"Lưu ghi chú"} onPress={handleSaveButtonPress} />
        </View>
      </View>
    </SafeAreaView>
  );
};
