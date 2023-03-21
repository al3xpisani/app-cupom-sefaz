import React from "react";
import {
  Text,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from '@react-navigation/stack';
import Login from "../login/Login";
import Home from "../home/Home";
import ScanScreen from "../scan/ScanScreen";
import InvoiceItemDetail from '../invoice/InvoiceItemDetail'

const Stack = createNativeStackNavigator();

function StackNavigator() {
    return (      
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Scan" component={ScanScreen} />
            <Stack.Screen name="InvoiceItemDetail" component={InvoiceItemDetail} />
        </Stack.Navigator>
        </NavigationContainer>
    )
}

// const Stack = createStackNavigator();
// const InnerStack = createStackNavigator();

// const InnerNavigator = ({ route }) => (
//   <InnerStack.Navigator initialRouteName={route?.params?.initialRouteName}
//   >
//     <InnerStack.Screen name="Home" component={Home} />
//     <InnerStack.Screen name="Scan" component={ScanScreen} />
//     <InnerStack.Screen name="ListInvoices" component={ListInvoices} />
//     <InnerStack.Screen name="InvoiceItemDetail" component={InvoiceItemDetail} />
//   </InnerStack.Navigator>
// );

// function StackNavigator() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator >
//          <Stack.Screen name="Login" component={Login} />
//         <Stack.Screen
//           options={{ headerShown: false }}
//           name="InnerNavigator"
//           component={InnerNavigator}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

export default StackNavigator