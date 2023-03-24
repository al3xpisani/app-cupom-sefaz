import React, { useState } from "react";
import ListInvoices from "../invoice/InvoiceListing";
import { StyleSheet, View } from "react-native";
import SearchInvoice from "../invoice/SearchInvoice";
import AddInvoice from "../invoice/AddInvoice";

function Home() {
  const [globalSearch, setGlobalSearch] = useState("");

  const handleSearchInvoice = (value) => {
    setGlobalSearch(value);
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
        <AddInvoice />
      </View>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  containerInvoiceListing: {
    padding: 10,
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  
});
