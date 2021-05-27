// import React from "react";
// import { Text, View } from "react-native";
// import styles from "./styles";
// function EditProfileScreen() {
//   return (
//     <View style={styles.tabbar}>
//       <Text>Leaderboard</Text>
//     </View>
//   );
// }

// export default EditProfileScreen;
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  StyleSheet,
  Picker,
  Button,
  Platform,
} from "react-native";

import { useTheme } from "react-native-paper";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import BottomSheet from "reanimated-bottom-sheet";
import Animated from "react-native-reanimated";
import ImagePicker from "react-native-image-crop-picker";
import DatePicker from "react-native-datepicker";
import { useSignedIn } from "../../hooks/useSignedIn";

const EditProfileScreen = () => {
  const { user, updateUser } = useSignedIn();

  const [image, setImage] = useState(
    "https://scontent-hkg4-2.xx.fbcdn.net/v/t1.6435-1/p240x240/179048033_1139396113169332_2102843025754757575_n.jpg?_nc_cat=110&ccb=1-3&_nc_sid=7206a8&_nc_ohc=Mv9EpCXnTbMAX9FBuWV&_nc_ht=scontent-hkg4-2.xx&tp=6&oh=87ca291070c01550c51670d376e2d191&oe=60D44AB9"
  );
  const [selectedValue, setSelectedValue] = useState("Nữ");

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [tempUser, setTempUser] = useState();

  const { colors } = useTheme();

  useEffect(() => {
    // only load temp user the first time
    if (!tempUser)
      setTempUser(user);
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
    setTempUser(u => ({ ...u, name: value }));
  }

  const handleChangeTextCountry = (value) => {
    setTempUser(u => ({ ...u, country: value }));
  }

  /**
   * @param {string} dateStr 
   * @param {Date} date 
   */
  const handleChangeDateBirthday = (dateStr, date) => {
    setTempUser(u => ({ ...u, birthday: dateStr }));
  }

  const handleChangeGenderPicker = (value) => {
    setTempUser(u => ({ ...u, gender: value }));
  }
  //#endregion

  const handleSaveButtonPress = () => {
    updateUser(tempUser);
  }

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
    <View style={styles.container}>
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
                marginTop: 50,
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
          <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
            Thy cute đáng iu
          </Text>
        </View>
        <Text
          style={[
            styles.text_footer,
            {
              marginTop: 15,
            },
          ]}
        >
          Tên
        </Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color={colors.text} size={20} />
          <TextInput
            placeholder="Tên"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            value={tempUser?.name}
            onChangeText={handleChangeTextName}
          />
        </View>
        <Text
          style={[
            styles.text_footer,
            {
              marginTop: 15,
            },
          ]}
        >
          Quốc gia
        </Text>
        <View style={styles.action}>
          <FontAwesome name="globe" color={colors.text} size={20} />
          <TextInput
            placeholder="Quốc Gia"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            value={tempUser?.country}
            onChangeText={handleChangeTextCountry}
          />
        </View>
        <Text
          style={[
            styles.text_footer,
            {
              marginTop: 15,
            },
          ]}
        >
          Ngày sinh
        </Text>
        <View style={styles.action}>
          <FontAwesome name="birthday-cake" color={colors.text} size={20} />
          {/* <TextInput
            placeholder="Ngày sinh"
            placeholderTextColor="#666666"
            keyboardType="email-address"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          /> */}
          <DatePicker
            date={tempUser?.birthday}
            mode="date"
            format="DD/MM/YYYY"
            cancelBtnText="Cancel"
            confirmBtnText="Confirm"
            minDate="01-01-1975"
            maxDate="01-01-2020"
            onDateChange={handleChangeDateBirthday}
          // style={styles.input}
          // customStyles={{
          //   dateIcon: {
          //     left: 0,
          //     top: 4,
          //     marginLeft: 0,
          //   },
          //   //   dateInput: [styles.input, { marginLeft: 0 }],
          // }}
          //   onDateChange={(date) => {

          //   }}
          />
        </View>
        <Text
          style={[
            styles.text_footer,
            {
              marginTop: 15,
            },
          ]}
        >
          Giới tính
        </Text>
        <View style={styles.action}>
          <Icon name="gender-male-female" color={colors.text} size={20} />
          {/* <TextInput
            placeholder="Giới tính"
            placeholderTextColor="#666666"
            autoCorrect={false}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
          /> */}
          <Picker
            selectedValue={tempUser?.gender}
            style={[
              styles.textInput,
              {
                color: colors.text,
              },
            ]}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedValue(itemValue)
              handleChangeGenderPicker(itemValue);
            }}
          >
            <Picker.Item label="Nam" value="Male" />
            <Picker.Item label="Nữ" value="Female" />
          </Picker>
        </View>
        <TouchableOpacity style={styles.commandButton} onPress={handleSaveButtonPress}>
          <Text style={styles.panelButtonTitle}>Lưu thay đổi</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginTop: 10,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 14,
  },
  panel: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
  },
});
