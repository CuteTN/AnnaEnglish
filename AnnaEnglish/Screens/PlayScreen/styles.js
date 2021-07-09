import { StyleSheet } from "react-native";
import { colorAnswer, colors } from "../../config/colors";
export const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    padding: 15,
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
    marginBottom: 30,
  },
  bgImage: {
    position: "absolute",
    top: "15%",
  },
  scrollViewWrapper: {
    justifyContent: "space-between",
  },
  itemContainer: {},
  label: {
    fontSize: 22,
    marginBottom: 0,
    fontFamily: "Cucho",
  },
  topicImage: {
    height: 140,
    resizeMode: "center",
  },
  card: {
    padding: 7,
    flex: 1,
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "space-between",
    borderColor: colors.black,
  },
  questionImage: {
    alignSelf: "center",
    position: "absolute",
    zIndex: 2,
    tintColor: "#797c8a",
    marginTop: 45,
    height: 50,
    resizeMode: "contain",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
