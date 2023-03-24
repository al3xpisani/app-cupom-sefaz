import React, { useState, createContext } from "react";
import StackNavigator from "./components/navigation/StackNavigator";
import { zeqContext } from "./context/context";
import { Provider as PaperProvider } from "react-native-paper";
import { RootSiblingParent } from "react-native-root-siblings";

export default function App() {
  const [loggedUser, setLoggedUser] = useState("");
  return (
    <zeqContext.Provider value={{ loggedUser, setLoggedUser }}>
      <PaperProvider>
        <RootSiblingParent>
          <StackNavigator />
        </RootSiblingParent>
      </PaperProvider>
    </zeqContext.Provider>
  );
}
