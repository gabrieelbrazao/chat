import React from "react";
import Routes from "./routes";
import globalTheme from "./global/style.js";
import { Provider as PaperProvider } from "react-native-paper";
import { StatusBar, YellowBox } from "react-native";
import { Provider } from "react-redux";
import store from "./store";

YellowBox.ignoreWarnings(["Unrecognized WebSocket"]);

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={globalTheme}>
        <StatusBar barStyle="light-content" backgroundColor="#57479E" />
        <Routes />
      </PaperProvider>
    </Provider>
  );
}
