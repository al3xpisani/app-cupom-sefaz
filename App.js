import React, { useState, createContext } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from "react-native-elements";
import {
  Alert,
  Image,
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Button,
  VirtualizedList,
} from "react-native";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { BlurView } from "expo-blur";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./config/firebase-config";
import { getFirestore, collection, getDocs } from "firebase/firestore";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListInvoices from "./components/invoice/InvoiceListing";
import Login from "./components/login/Login";

const Stack = createNativeStackNavigator();

export const zeqContext = createContext({loggedUser: '',setLoggedUser: () => {}});

export default function App() {
  const [loggedUser, setLoggedUser] = useState('');
  return (
    <zeqContext.Provider value={{loggedUser, setLoggedUser}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Scan" component={ScanScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </zeqContext.Provider>
  );
}

const SearchIcon = () => {
  const [input, setInput] = useState("");
  return (
    <View style={{ flex: 1, justifyContent: "center", paddingTop: 20 }}>
      <Input
        inputContainerStyle={{
          backgroundColor: "#efefef",
          borderRadius: 8,
          borderBottomWidth: 0,
        }}
        placeholder="Buscar por nota fiscal"
        value={input}
        onChange={(value) => setInput(value)}
        leftIcon={
          <Icon
            style={{ paddingLeft: 10 }}
            name="search"
            size={14}
            color="black"
          />
        }
      />
    </View>
  );
};

const AddInvoice = ({ onHandleScan }) => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        title="Adicionar Nota Fiscal"
        onPress={() => onHandleScan()}
      ></Button>
    </View>
  );
};

function HomeScreen() {
  const navigation = useNavigation();

  const handleScan = () => {
    navigation.navigate("Scan");
  };

  return (
    <View
      style={[
        styles.containerInvoiceListing,
        {
          flexDirection: "column",
        },
      ]}
    >
      <View
        style={{ flex: 1, justifyContent: "center", backgroundColor: "white" }}
      >
        <SearchIcon />
      </View>
      <View style={{ flex: 8, backgroundColor: "white" }}>
        <ListInvoices />
      </View>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <AddInvoice onHandleScan={handleScan} />
      </View>
    </View>
  );
}

function ScanScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Scan QRCode</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#52D2B1",
    alignItems: "center",
    justifyContent: "center",
  },
  containerInvoiceListing: {
    padding: 10,
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  button: {
    width: 250,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    padding: 10,
  },
  login: {
    width: 350,
    height: 300,
    borderColor: "#6792F098",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  input: {
    width: 250,
    height: 40,
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#ffffff90",
    marginBottom: 20,
  },
  imageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: "stretch",
    alignItems: "center",
  },
});
