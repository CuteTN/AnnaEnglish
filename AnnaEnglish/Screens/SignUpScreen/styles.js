import { StyleSheet } from "react-native";
import { colors } from "../../config/colors";
export const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.white,
  },
  vector1: {
    position: "absolute",
    left: -10,
    top: -5,
  },
  vector2: {
    position: "absolute",
    right: -6,
  },
  vector3: {
    position: "absolute",
    top: 90,
  },
  vector4: {
    position: "absolute",
    right: 0,
    top: 90,
  },
  contentContainer: {
    flex: 1,
  },
  logo: {
    flex: 1,
  },
  back: {
    marginTop: 50,
  },
  heading: {
    fontSize: 26,

    lineHeight: 40,
    textAlign: "center",
    color: colors.heading,
    marginTop: 40,
    marginBottom: 30,
    fontFamily: "Pony",
  },
  inputItem: {
    marginBottom: 10,
  },
  getStartedbtnItemWrapper: {
    marginTop: 30,
  },
  loginLinkWrapper: {
    textAlign: "center",
    marginTop: 20,
  },
  notificationContent: {
    color: colors.gray,
    fontSize: 14,
    fontFamily: "Cucho",
  },
  welcomeImage: {
    marginTop: 40,
    width: 280,
    alignSelf: "center",
    height: 280,
    margin: -20,
  },
});
