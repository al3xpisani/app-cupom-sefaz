import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from 'react-native-vector-icons'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../login/Login";
import Home from "../home/Home";
import ScanScreen from "../scan/ScanScreen";
import InvoiceItemDetail from "../invoice/InvoiceItemDetail";

const Stack = createNativeStackNavigator();

function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={navigationOptions(null,null,null, false)}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={navigationOptions("Minhas notas", "#ffffff", "#540d6e")}
          screenOptions={screenOptions}
        />
        <Stack.Screen
          name="Scan"
          component={ScanScreen}
          options={navigationOptions("Salvar nota", "#ffffff", "#540d6e")}
          screenOptions={screenOptions}
        />
        <Stack.Screen
          name="InvoiceDetail"
          component={InvoiceItemDetail}
          options={navigationOptions("Espelho nota", "#ffffff", "#540d6e")}
          screenOptions={screenOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const navigationOptions = (title, headerTintcolor, backColor, headerShown = true) => ({
  title: title,
  headerTitleAlign: 'center',
  headerBackTitleVisible: false,
  headerTintColor: headerTintcolor,
  headerStyle: {
    backgroundColor: backColor,
  },
  headerShown: headerShown
});

const screenOptions =() => ({
  headerBackTitle: 'Voltar',
    headerBackImage: ()=>(<MaterialCommunityIcons name='arrow-left' />),
})

export default StackNavigator;
