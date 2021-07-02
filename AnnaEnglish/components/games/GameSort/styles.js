import { StyleSheet } from "react-native";
import { colors, randomColor } from "../../../config/colors";
export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    padding: 15,
    backgroundColor: colors.white,
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    alignItems: "flex-end",
    marginTop: 10,
    marginBottom: 10,
    color: colors.black, 
    textAlign:"center" 
  },

  card: {
    padding: 2,
    backgroundColor: randomColor(),
    marginBottom: 10,
    margin: 5,
    borderRadius: 0,
  },

  getStartedbtnItemWrapper: {
    marginBottom: 20,
  },

  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
});
