import React from "react";
import {
  Text,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../login/Login";
import Home from "../home/Home";

const Stack = createNativeStackNavigator();

function StackNavigator() {
    return (      
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Scan" component={ScanScreen} />
        </Stack.Navigator>
        </NavigationContainer>
    )
}

function ScanScreen() {
    const navigation = useNavigation();
  
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Scan QRCode</Text>
      </View>
    );
  }

export default StackNavigator