import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";
import DatePicker from "react-native-datepicker";
import { useSignedIn } from "../../hooks/useSignedIn";
import { SCREENS } from "..";
import { EditInput } from "../../components/forms/EditInputCountry/EditInput";
import { EditInputName } from "../../components/forms/EditInputName/EditInputName";
import { colors } from "../../config/colors";
import { Picker } from "@react-native-community/picker";
import { PrimaryButton } from "../../components/buttons/PrimaryButton/PrimaryButton";
import Header from "../../components/Header/Header";
import { styles } from "./styles";
import { checkEnoughUserInfo } from "../../Utils/user";
const EditProfileScreen = () => {
  const { user, updateUser } = useSignedIn();

  const [image, setImage] = useState(
    "https://salena.com.vn/upload/image/lavender.jpg"
  );
  const [selectedValue, setSelectedValue] = useState("Nữ");

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [tempUser, setTempUser] = useState();

  const navigation = useNavigation();

  useEffect(() => {
    // only load temp user the first time
    if (!tempUser) setTempUser(user);
  }, [user, setTempUser]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  //#region input fields
  const handleChangeTextName = (value) => {
    setTempUser((u) => ({ ...u, name: value }));
  };

  const handleChangeTextCountry = (value) => {
    setTempUser((u) => ({ ...u, country: value }));
  };

  /**
   * @param {string} dateStr
   * @param {Date} date
   */
  const handleChangeDateBirthday = (dateStr, date) => {
    setTempUser((u) => ({ ...u, birthday: dateStr }));
  };

  const handleChangeGenderPicker = (value) => {
    setTempUser((u) => ({ ...u, gender: value }));
  };
  //#endregion

  const handleSaveButtonPress = () => {
    const checkResult = checkEnoughUserInfo({ ...user, ...tempUser });
    if (checkResult.isValid) {
      updateUser(tempUser);
      navigation.navigate(SCREENS.mainApp.name);
    } else {
      console.log(checkResult.message);
    }
  };

  //   const takePhotoFromCamera = () => {
  //     ImagePicker.openCamera({
  //       compressImageMaxWidth: 300,
  //       compressImageMaxHeight: 300,
  //       cropping: true,
  //       compressImageQuality: 0.7,
  //     }).then((image) => {
  //       console.log(image);
  //       setImage(image.path);
  //       this.bs.current.snapTo(1);
  //     });
  //   };

  //   const choosePhotoFromLibrary = () => {
  //     ImagePicker.openPicker({
  //       width: 300,
  //       height: 300,
  //       cropping: true,
  //       compressImageQuality: 0.7,
  //     }).then((image) => {
  //       console.log(image);
  //       setImage(image.path);
  //       this.bs.current.snapTo(1);
  //     });
  //   };

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{ alignItems: "center" }}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity
        style={styles.panelButton}
      // onPress={takePhotoFromCamera}
      >
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
      // onPress={choosePhotoFromLibrary}
      >
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
      // onPress={() => this.bs.current.snapTo(1)}
      >
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );

  const bs = React.createRef();
  const fall = new Animated.Value(1);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <View style={{ marginTop: 30 }}>
        <Header title="ĐỔI THÔNG TIN CÁ NHÂN" />
      </View>
      <ScrollView style={styles.container}>
        <BottomSheet
          // ref={this.bs}
          snapPoints={[330, 0]}
          // renderContent={this.renderInner}
          // renderHeader={this.renderHeader}
          initialSnap={1}
          // callbackNode={this.fall}
          enabledGestureInteraction={true}
        />
        <Animated.View
          style={{
            margin: 20,
            //   opacity: Animated.add(0.1, Animated.multiply(this.fall, 1.0)),
          }}
        >
          <View style={{ alignItems: "center" }}>
            {/* <TouchableOpacity onPress={() => this.bs.current.snapTo(0)}> */}
            <TouchableOpacity>
              <View
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 15,
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <ImageBackground
                  source={{
                    uri: image,
                  }}
                  style={{ height: 100, width: 100 }}
                  imageStyle={{ borderRadius: 15 }}
                >
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Icon
                      name="camera"
                      size={35}
                      color="#fff"
                      style={{
                        opacity: 0.7,
                        alignItems: "center",
                        justifyContent: "center",
                        borderWidth: 1,
                        borderColor: "#fff",
                        borderRadius: 10,
                      }}
                    />
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
          </View>
          <Text
            style={[
              styles.text_footer,
              {
                marginTop: 15,
              },
            ]}
          >
            Họ và tên
          </Text>
          <View style={styles.inputItem}>
            <EditInputName
              placeHolder={"Họ và tên"}
              value={tempUser?.name}
              onChangeText={handleChangeTextName}
            />
          </View>
          <Text style={[styles.text_footer]}>Đất nước</Text>
          <View style={styles.inputItem}>
            {/* <FontAwesome name="globe" color={colors.text} size={20} /> */}
            <EditInput
              placeHolder={"Đất nước"}
              value={tempUser?.country}
              onChangeText={handleChangeTextCountry}
            />
          </View>
          <Text style={[styles.text_footer]}>Ngày sinh</Text>
          <View style={styles.inputItem}>
            <DatePicker
              style={styles.datepicker}
              date={tempUser?.birthday}
              mode="date"
              format="DD/MM/YYYY"
              cancelBtnText="Cancel"
              confirmBtnText="Confirm"
              minDate="01-01-1975"
              maxDate="01-01-2020"
              onDateChange={handleChangeDateBirthday}
              customStyles={{
                dateInput: styles.dateInput,
                dateIcon: styles.dateIcon,
              }}
            />
          </View>
          <Text style={[styles.text_footer]}>Giới tính</Text>
          <View style={styles.inputItem1}>
            {/* <Icon name="gender-male-female" color={colors.text} size={20} /> */}

            <Picker
              selectedValue={tempUser?.gender}
              style={[
                styles.textInput,
                {
                  color: colors.black,
                  borderColor: colors.primary,
                },
              ]}
              itemStyle={{ width: 100 }}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedValue(itemValue);
                handleChangeGenderPicker(itemValue);
              }}
            >
              <Picker.Item label="Nam" value="Male" />
              <Picker.Item label="Nữ" value="Female" />
            </Picker>
          </View>
          <View style={styles.getStartedbtnItemWrapper}>
            <PrimaryButton
              label={"LƯU THAY ĐỔI"}
              onPress={handleSaveButtonPress}
            />
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProfileScreen;
