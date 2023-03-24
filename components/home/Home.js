import React, { useState, useEffect } from "react";
import ListInvoices from "../invoice/InvoiceListing";
import { StyleSheet, View, Button, Image, Text } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import SearchInvoice from "../invoice/SearchInvoice";

function Home() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [globalSearch, setGlobalSearch] = useState('')

  useEffect(() => {
    if (isFocused) {
    }
  }, [isFocused]);
  
  const handleSearchInvoice = (value) => {
    setGlobalSearch(value)
  }

  const handleScan = () => {
    navigation.navigate("Scan");
  };

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
        <SearchInvoice handleSearchInvoice={handleSearchInvoice} />
      </View>
      <View style={{ flex: 8, backgroundColor: "white" }}>
        <ListInvoices searchText={globalSearch} />
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
