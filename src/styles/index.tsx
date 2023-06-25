import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    paddingTop: 12,
    paddingHorizontal: 24,
  },
  scroolContainer: {
    flexGrow: 1,
    flex: 1,
    backgroundColor: "white",
    paddingTop: 12,
    paddingHorizontal: 24,
  },
  scroolContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  appBar: { backgroundColor: "teal" },
  //others
  label: { fontSize: 18, paddingBottom: 12 },
  field: { fontSize: 18 },
});
