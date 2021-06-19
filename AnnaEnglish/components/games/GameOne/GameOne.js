import React from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-svg';
import { styles } from '../../../shared/styles'

const GameOne = ({ data }) => {
  console.log(data);

  return (
    <View style={[styles.container, { backgroundColor: "hotpink" }]}>
      <Text style={styles.center}>
        Game one yooo
      </Text>
    </View>
  );
}

export default GameOne;