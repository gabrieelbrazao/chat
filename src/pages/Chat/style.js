import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  body: {
    flexDirection: "column",
    flex: 1
  },

  chat: {
    flex: 1,
    overflow: "scroll"
  },

  messageOut: {
    backgroundColor: "rgba(87, 71, 158, .2)",
    width: "60%",
    paddingVertical: 20,
    paddingHorizontal: 10,
    margin: 20,
    marginBottom: 10
  },

  nameOut: {
    color: "#57479E",
    marginLeft: 40,
    marginTop: 10,
    position: "absolute",
    zIndex: 2,
    fontWeight: "bold"
  },

  hourOut: {
    position: "absolute",
    marginLeft: "57%",
    bottom: 12,
    color: "#555",
    fontSize: 12
  },

  messageIn: {
    backgroundColor: "#d8d8d8",
    width: "60%",
    paddingVertical: 20,
    paddingHorizontal: 10,
    margin: 20,
    marginBottom: 10
  },

  messageInView: {
    width: "100%",
    alignItems: "flex-end"
  },

  nameIn: {
    color: "#57479E",
    width: "60%",
    marginTop: 10,
    position: "absolute",
    zIndex: 2,
    fontWeight: "bold"
  },

  hourIn: {
    position: "absolute",
    width: 50,
    bottom: 12,
    color: "#555",
    fontSize: 12
  },

  container: {
    flexDirection: "row",
    height: 60
  },

  input: {
    width: "75%",
    height: 60,
    borderColor: "#57479E",
    borderWidth: 2,
    padding: 20
  },

  button: {
    height: 60,
    width: "25%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#57479E"
  },

  textButton: {
    color: "white",
    fontSize: 16
  }
});

export default style;
