import { StyleSheet } from "react-native";
import { colors } from "../../config/colors";
export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    marginTop: 0,
    height: 90,
  },

  gameNameText: {
    alignSelf: "center",
    marginTop: 20,
    fontSize: 30,
  },

  quitIcon: {
    alignSelf: "center",
    marginTop: 20,
    marginHorizontal: 20,
  },

  footer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 0,
    height: 60,
  },
  headingWrapper: {
    marginTop: 35,
  },
  title: {
    fontSize: 20,
    fontWeight: "300",
    marginTop: 10,
    color: colors.gray,
  },
  bgImage: {
    position: "absolute",
    top: "15%",
  },
  scrollViewWrapper: {
    justifyContent: "space-between",
    marginTop: 40,
  },
  topicImage: {
    alignSelf: "center",
  },
  card: {
    padding: 10,
    flex: 1,
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
