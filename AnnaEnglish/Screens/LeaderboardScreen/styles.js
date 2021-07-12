import { StyleSheet } from "react-native";
import { colors } from "../../config/colors";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
  },
  listContainer: {
    flexDirection: "row",
    marginTop: 0,
    justifyContent: "space-between",
  },
  text: { fontSize: 16, color: "grey", fontWeight: "bold" },
  textSelected: {
    color: colors.primary,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: colors.primary,
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
  card: {
    padding: 20,
    flex: 1,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#4C6663",
  },
  label: {
    fontSize: 18,
    fontFamily: "Cucho",
  },
});
