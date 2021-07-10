import { StyleSheet } from "react-native";
import { colors } from "../../config/colors";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  card: {
    margin: 20,
    marginBottom: 10,
    backgroundColor: colors.statiticcard,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: colors.cardborder,
    elevation: 5,
    position: "relative",
  },
  headingWrapper: {
    marginTop: 45,
    alignItems: "center",
  },
  heading: {
    fontSize: 28,
    color: colors.heading,
    fontFamily: "Pony",
  },
});
