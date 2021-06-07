import React, { useEffect } from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Fire from '../../firebase/Fire';
import { styleCenter, styleFullContainer } from '../../shared/styles.js'
import { SCREENS } from '..';

function StartUpScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = Fire.auth().onAuthStateChanged((user) => {
      if (user)
        navigation.navigate(SCREENS.mainApp.name);
      else
        navigation.navigate(SCREENS.signIn.name);
    })

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <SafeAreaView
      style={{
        ...styleFullContainer,
        ...styleCenter,
      }}
    >
      <Text>Loading...</Text>
    </SafeAreaView>
  );
}

export default StartUpScreen;
