import { StyleSheet } from "react-native";
import { colors, randomColor } from "../../../config/colors";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.white,
  },
  game: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
  },

  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 25,
    color: colors.black,
    textAlign: "center",
  },

  card: {
    margin: 5,
    height: 80,
    width: 160,
    borderRadius: 10,
    borderWidth: 2,
  },

  getStartedbtnItemWrapper: {
    margin: 20,
  },
});
