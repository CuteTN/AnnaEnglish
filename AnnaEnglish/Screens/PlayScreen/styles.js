import { StyleSheet } from "react-native";
import { colors } from "../../config/colors";
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
  },
  bgImage: {
    position: "absolute",
    top: "15%",
  },
  scrollViewWrapper: {
    justifyContent: "space-between",
    marginTop: 40,
  },
  itemContainer: {},
  label: {
    fontSize: 18,
    fontWeight: "bold",
    alignItems: "flex-end",
    marginTop: 10,
    marginBottom: 10,
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
