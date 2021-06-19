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
  },
  panel: {
    padding: 20,
    backgroundColor: "#FFFFFF",
    paddingTop: 20,
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
  panelHeader: {
    alignItems: "center",
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#00000040",
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: "gray",
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: "#FF6347",
    alignItems: "center",
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    //CAF6F7 C9CBE0
    width: sizeFactor * 23,
    backgroundColor: "#CAF6F7",
  },
  inputItem: {
    marginBottom: 20,
  },
  datepicker: {
    //FFE2E6 CCDBE2
    width: sizeFactor * 23,
    justifyContent: "space-between",
    backgroundColor: "#FFE2E6",
    height: 50,
  },
  dateInput: {
    borderColor: "#FFE2E6",
    marginLeft: 15,
    marginTop: 5,
    alignItems: "flex-start",
  },
  dateIcon: {
    marginTop: 10,
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
