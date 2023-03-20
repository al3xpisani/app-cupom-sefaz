import React, { useState, createContext } from "react";
import StackNavigator from "./components/navigation/StackNavigator";

export const zeqContext = createContext({loggedUser: '',setLoggedUser: () => {}});

export default function App() {
  const [loggedUser, setLoggedUser] = useState('');
  return (
    <zeqContext.Provider value={{loggedUser, setLoggedUser}}>
        <StackNavigator/>
    </zeqContext.Provider>
  );
}
