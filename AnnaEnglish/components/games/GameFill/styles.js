import { StyleSheet } from "react-native";
import { colors } from "../../../config/colors";
export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    padding: 15,
    backgroundColor: colors.white,
  },

  label: {
    fontSize: 18,
    fontWeight: "bold",
    alignItems: "flex-end",
    marginTop: 10,
    marginBottom: 10,
  },

  card: {
    padding: 10,
    flex: 1,
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "space-between",
  },

  getStartedbtnItemWrapper: {
    marginBottom: 20,
  },
});
