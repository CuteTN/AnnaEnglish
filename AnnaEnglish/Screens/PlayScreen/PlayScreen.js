import React, { useEffect } from 'react'
import { Text, View } from "react-native";
import { useFiredux } from '../../hooks/useFiredux';
import * as styles from '../../shared/styles'

function PlayScreen() {
  const listTopics = Object.values(useFiredux("topic"));

  useEffect(() => {
    console.log(listTopics);
  }, [listTopics])

  return (
    <View style={styles.styleCenter}>
      <Text>Play</Text>
    </View>
  )
}

export default PlayScreen