import { NavigationActions, StackActions } from 'react-navigation'
// import { useNavigation } from '@react-navigation/native'

export const navigateAndReset = (navigation, routeName) => {
  const resetAction = StackActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName }),
    ],
    key: null
  });

  // const navigation = useNavigation();
  // navigation.navigate(routeName)
  navigation.dispatch(resetAction);
}