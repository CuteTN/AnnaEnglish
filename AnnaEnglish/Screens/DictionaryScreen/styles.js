import { StyleSheet } from "react-native";
import { colors } from "../../config/colors";
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 20,
    padding: 15,
  },
  headerText: {
    fontSize: 32,
    fontFamily: "Pony",
    color: colors.heading,
  },

  headerBody: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  wrapperInput: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  inputText: {
    padding: 10,
    flex: 1,
  },
  scrollViewWrapper: {
    justifyContent: "space-between",
    marginTop: 10,
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
  },
});
