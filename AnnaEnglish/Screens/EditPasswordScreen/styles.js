import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../config/colors";

export const windowWidth = Dimensions.get("window").width;
export const windowHeight = Dimensions.get("window").height;
export const sizeFactor = windowWidth / 25.7;

export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginTop: 10,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 14,
    fontFamily: "Cucho",
  },

  header: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#333333",
    shadowOffset: { width: -1, height: -3 },
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  textInput: {
    //CAF6F7 C9CBE0
    width: sizeFactor * 23,
    backgroundColor: "#CAF6F7",
  },
  inputItem: {
    marginBottom: 20,
  },

  getStartedbtnItemWrapper: {
    marginTop: 30,
  },
  inputItem1: {
    marginBottom: 20,
    borderRadius: 15,
  },

  input: {
    marginTop: sizeFactor * 0.75,
    backgroundColor: colors.bg,
    width: sizeFactor * 22,
    borderRadius: 70 / 3,

    fontWeight: "bold",
    textAlign: "center",
    marginBottom: sizeFactor * 0.5,
  },
});

export default styles;
