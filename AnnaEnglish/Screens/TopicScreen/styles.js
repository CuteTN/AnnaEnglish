import { StyleSheet } from "react-native";
import { colors } from "../../config/colors";
export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
  },
  headingWrapper: {
    marginTop: 35,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 28,
    color: colors.heading,
  },
  subHeading: {
    color: colors.heading,
    fontSize: 28,
    marginTop: 10,
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
    marginTop: 20,
  },
  label: {
    fontSize: 24,
    fontFamily: "Cucho",
    margin: 36,
  },
  topicImage: {
    alignSelf: "center",
  },
  card: {
    borderRadius: 10,
    height: 110,
    flexDirection: "row",
    borderWidth: 1,
    backgroundColor: "#C9F4F6",
    margin: 15,
  },
});
