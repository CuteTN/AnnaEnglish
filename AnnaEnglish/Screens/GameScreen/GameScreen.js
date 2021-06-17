import React, { useEffect } from 'react';
import { SafeAreaView, View, Text, Alert } from 'react-native';
import { styles } from './styles';
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from '..';

export default GameScreen = ({ route }) => {
  const { game } = route?.params ?? {};
  const navigation = useNavigation();

  useEffect(() => {
    if (!game) {
      navigation.goBack();
    }
  }, [])

  const handleQuitButtonPress = () => {
    navigation.goBack();
  }

  return (
    <SafeAreaView
      style={{
        ...styles.container,
        justifyContent: "flex-start",
      }}
    >
      <View
        style={[
          styles.header,
          { backgroundColor: "lightpink" },
        ]}
      >
        <Icon
          name="close" size={50} color="hotpink"
          style={styles.quitIcon}
          onPress={handleQuitButtonPress}
        />
        <Text style={[styles.gameNameText,]} >
          {game.name}
        </Text>
      </View>

      {/* game component goes from here */}
      <View
        style={[styles.container, { backgroundColor: "purple", margin: 5 }]}
      >

      </View>

      <View
        style={[
          styles.header,
          { backgroundColor: "violet" },
        ]}
      >
      </View>

    </SafeAreaView >
  )
}