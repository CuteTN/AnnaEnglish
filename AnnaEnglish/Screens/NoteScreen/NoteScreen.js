import React, { useEffect, useState } from "react";
import { View, SafeAreaView, TextInput } from "react-native";
import Header from "../../components/Header/Header";
import { styles } from "./styles";
import { useSignedIn } from "../../hooks/useSignedIn";
import { PrimaryButton } from "../../components/buttons/PrimaryButton/PrimaryButton";
import { useButtonsModal } from "../../components/Modal/ButtonsModalProvider";

export default NoteScreen = ({ route }) => {
  const { user, updateUser } = useSignedIn();
  const [tempNote, setTempNote] = useState("");
  const { showOkModal } = useButtonsModal();

  useEffect(() => {
    if (user?.note) setTempNote(user.note);
  }, [user?.note]);

  const handleSaveButtonPress = () => {
    updateUser({ note: tempNote });
    showOkModal({
      label: "Cập nhật ghi chú",
      text: "Đã cập nhật ghi chú thành công!",
    })
  };

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
          <PrimaryButton
            label={"Lưu ghi chú"}
            onPress={handleSaveButtonPress}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
