import React, { useState, useRe } from "react";
import StackNavigator from "./components/ui-components/navigation/StackNavigator";
import { zeqContext } from "./context/context";
import { Provider as PaperProvider } from "react-native-paper";
import { RootSiblingParent } from "react-native-root-siblings";

export default function App() {
  // const [state, dispatch] = useReducer(loginReducer, initialState);
  // const { todos, isLoggedIn } = state;
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
