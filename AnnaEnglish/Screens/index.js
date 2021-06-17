import TopicScreen from "./TopicScreen/TopicScreen";
import DictionaryScreen from "./DictionaryScreen/DictionaryScreen";
import EditProfileScreen from "./EditProfileScreen/EditProfileScreen";
import LeaderboardScreen from "./LeaderboardScreen/LeaderboardScreen";
import PlayScreen from "./PlayScreen/PlayScreen";
import ProfileScreen from "./ProfileScreen/ProfileScreen";
import SignInScreen from "./SignInScreen/SignInScreen";
import SignUpScreen from "./SignUpScreen/SignUpScreen";
import StartUpScreen from "./StartUpScreen/StartUpScreen";
import StatisticsScreen from "./StatisticsScreen/StatisticsScreen";
import Tabbar from "./TabNavigation/Tabbar";

export const TAB_SCREENS = {
  statistic: {
    name: "statistic",
    screen: StatisticsScreen,
    iconName: "game-controller",
    focusIconName: "game-controller-outline",
  },

  leaderboard: {
    name: "leaderboard",
    screen: LeaderboardScreen,
    iconName: "game-controller",
    focusIconName: "game-controller-outline",
  },

  play: {
    name: "play",
    screen: PlayScreen,
    iconName: "game-controller",
    focusIconName: "game-controller-outline",
  },

  dictionary: {
    name: "dictionary",
    screen: DictionaryScreen,
    iconName: "book",
    focusIconName: "book-outline",
  },

  profile: {
    name: "profile",
    screen: ProfileScreen,
    iconName: "person-circle",
    focusIconName: "person-circle-outline",
  },
};

export const SCREENS = {
  startUp: {
    name: "startUp",
    screen: StartUpScreen,
  },

  editProfile: {
    name: "editProfile",
    screen: EditProfileScreen,
  },

  signIn: {
    name: "signIn",
    screen: SignInScreen,
  },

  signUp: {
    name: "signUp",
    screen: SignUpScreen,
  },

  mainApp: {
    name: "mainApp",
    screen: Tabbar,
  },

  topic: {
    name: "topic",
    screen: TopicScreen,
  },

  ...TAB_SCREENS,
};
