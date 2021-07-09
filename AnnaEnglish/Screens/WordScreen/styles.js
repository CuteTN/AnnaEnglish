import { StyleSheet, Dimensions } from "react-native";
import { colors } from "../../config/colors";
export const windowWidth = Dimensions.get("window").width;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  header: {
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: colors.primary,
  },
  headerText: {
    marginLeft: 50,
    fontFamily: "Pony",
    fontSize: 20,
    color: "#333",
    letterSpacing: 1,
  },
  icon: {
    position: "absolute",
    left: 16,
  },
  card: {
    padding: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 18,
    fontFamily: "Cucho",
    maxWidth: windowWidth - 80,
    lineHeight: 30,
  },
  row: {
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 10,
  },
});
