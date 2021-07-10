import { StyleSheet } from "react-native";
import { colors } from "../../config/colors";
export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
  },
  loginBtnWrapper: {
    marginTop: 10,
  },
  inputItem: {
    marginBottom: 20,
  },
  bg: {
    position: "absolute",
  },
  contentContainer: {
    padding: 20,
    marginTop: 30,
    flex: 1,
  },
  logo: {
    alignSelf: "center",
  },
  notificationContent: {
    color: colors.gray,
    fontSize: 14,
    fontFamily: "Cucho",
  },
  loginLinkWrapper: {
    textAlign: "center",
    marginTop: 20,
  },
  welcomeImage: {
    marginTop: 20,
    marginBottom: 30,
    width: 280,
    alignSelf: "center",
    height: 280,
  },
  heading: {
    fontSize: 30,
    // fontWeight: "700",
    // lineHeight: 40,
    textAlign: "center",
    color: "#3366CC",
    fontFamily: "Pony",
  },
  top: {
    flex: 1,
    marginBottom: 10,
  },
});
