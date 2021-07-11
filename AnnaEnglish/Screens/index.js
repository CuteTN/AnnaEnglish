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
import GameScreen from "./GameScreen/GameScreen";
import Tabbar from "./TabNavigation/Tabbar";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import NoteScreen from "./NoteScreen/NoteScreen";
import WordScreen from "./WordScreen/WordScreen";
import EditPasswordScreen from "./EditPasswordScreen/EditPasswordScreen";
import TopicGameScreen from "./TopicGameScreen/TopicGameScreen";
import TopicWordScreen from "./TopicWordScreen/TopicWordScreen";

export const TAB_SCREENS = {
  statistic: {
    name: "Statistic",
    screen: StatisticsScreen,
    iconName: "ios-pie-chart",
    focusIconName: "ios-pie-chart-outline",
  },

  leaderboard: {
    name: "Leaderboard",
    screen: LeaderboardScreen,
    iconName: "md-podium",
    focusIconName: "md-podium-outline",
  },

  play: {
    name: "Play",
    screen: PlayScreen,
    iconName: "game-controller",
    focusIconName: "game-controller-outline",
  },

  dictionary: {
    name: "Dictionary",
    screen: DictionaryScreen,
    iconName: "book",
    focusIconName: "book-outline",
  },

  profile: {
    name: "Profile",
    screen: ProfileScreen,
    iconName: "person",
    focusIconName: "person-outline",
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

  game: {
    name: "game",
    screen: GameScreen,
  },

  note: {
    name: "note",
    screen: NoteScreen,
  },

  word: {
    name: "word",
    screen: WordScreen,
  },
  editPass: {
    name: "editPass",
    screen: EditPasswordScreen,
  },

  topicGame: {
    name: "topicGame",
    screen: TopicGameScreen,
  },

  topicWord: {
    name: "topicWord",
    screen: TopicWordScreen,
  },

  ...TAB_SCREENS,
};
