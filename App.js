import React from "react";
import { Provider } from 'react-redux'
import StackNavigator from "./components/ui-components/navigation/StackNavigator";
import { Provider as PaperProvider } from "react-native-paper";
import { RootSiblingParent } from "react-native-root-siblings";
import { store } from "./store";
import { AppRegistry } from "react-native";

export default function App() {

  return (
    <Provider store={store}>
      <PaperProvider>
        <RootSiblingParent>
          <StackNavigator />
        </RootSiblingParent>
      </PaperProvider>
    </Provider>
  );
}

AppRegistry.registerComponent("App",App)
