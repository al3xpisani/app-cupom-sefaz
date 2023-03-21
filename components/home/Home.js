import React, { useState } from "react";
import { Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import ListInvoices from "../invoice/InvoiceListing";
import { StyleSheet, View, Button, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

const AddInvoice = ({ onHandleScan }) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#04b44c",
        borderRadius: 10,
        boxShadow: "0 3px 6px rgba(0, 0, 0, .2",
      }}
    >
      <Image
        source={require("../../assets/images/labelinvoicebuttonsmall.png")}
        style={{ width: 22, height: 23 }}
      />
      <Button
        color={"#ffffff"}
        title="Adicionar Nota Fiscal"
        onPress={() => onHandleScan()}
      ></Button>
    </View>
  );
};

const SearchIcon = () => {
  const [input, setInput] = useState("");
  return (
    <View style={{ flex: 1, justifyContent: "center", paddingTop: 20 }}>
      <Input
        inputContainerStyle={{
          backgroundColor: "#efefef",
          borderRadius: 8,
          borderBottomWidth: 0,
          paddingLeft: 10
        }}
        placeholder="Buscar por nota fiscal"
        value={input}
        onChange={(value) => setInput(value)}
        rightIcon={
          <Icon
            style={{ paddingRight: 10 }}
            name="search"
            size={14}
            color="#04b44c"
          />
        }
      />
    </View>
  );
};

function Home() {
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

export default Home;

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
