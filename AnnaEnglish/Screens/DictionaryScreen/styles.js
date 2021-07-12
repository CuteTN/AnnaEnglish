import { StyleSheet } from "react-native";
import { colors } from "../../config/colors";
export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
  },
  header: {
    padding: 15,
  },
  headerText: {
    alignSelf: "center",
    fontSize: 32,
    fontFamily: "Pony",
    color: colors.heading,
  },

  headerBody: {
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
  },

  wrapperInput: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  inputText: {
    padding: 10,
    flex: 1,
  },
  scrollViewWrapper: {
    justifyContent: "space-between",
    padding: 15,
    paddingTop: 5,
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
