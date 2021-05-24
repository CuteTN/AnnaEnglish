import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Fire from '../../firebase/Fire';

function StartUpScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = Fire.auth().onAuthStateChanged((user) => {
      if (user)
        navigation.navigate("MainApp");
      else
        navigation.navigate("SignIn");
    })

    return () => {
      unsubscribe();
    }
  }, []);

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Text>Loading...</Text>
    </View>
  )
}

export default StartUpScreen;