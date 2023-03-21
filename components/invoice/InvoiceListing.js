import React, { useEffect, useState, useContext, createContext } from "react";
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
  SafeAreaView,
  VirtualizedList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TimeStamp } from "../../utils/TimeStamp";
import { zeqContext } from "../../context/context";
import { useFocusEffect } from "@react-navigation/native";
import fetchFirebaseDataMatch, {
    fetchFirebaseExistingInvoice,
} from "../../config/fetchFirebaseData";

const ListInvoices = () => {
  const navigation = useNavigation();
  const { loggedUser } = useContext(zeqContext);
  const [invoices, setInvoices] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    refreshData()
  }, []);

  useEffect(() => {
    refreshData();
    console.log(invoices);
    //ignorar essa chamada abaixo. em desenvolvimento.
    // fetchFirebaseDataLikeArrayField("nota-fiscal","emitente.razao_social","Gamin").then((item) => console.log(item))
    // fetchFirebaseExistingInvoice("nota-fiscal","chave","00000000","email","12312860406").then((item) => console.log('NF => ',item))
  },[]);

  const refreshData = () => {
    fetchFirebaseDataMatch(
      "nota-fiscal",
      "email",
      loggedUser,
      "data_emissao",
      false
    ).then((item) => {
      setRefreshing(false);
      return setInvoices(item);
    });
  };

  const handleItemOnPress = (item) => {
    navigation.navigate("InvoiceItemDetail", {
      details: item.details,
    });
  };

  const getItem = (_data, index) => {
    if (index in _data) {
      return {
        key: `${index}`,
        id: _data[index].id,
        title: _data[index].emitente.razao_social,
        creation_timestamp: _data[index].data_emissao,
        // creation_timestamp: String(
        //   TimeStamp(_data[index].data_emissao.seconds)
        // ),
        valor_nota: `R$ ${_data[index].total}`,
        details: _data[index],
      };
    }
  };
  const keyExtractor = (item, index) => {
    return `${index}`;
  };
  const getItemCount = (_data) => invoices?.length;

  const renderItem = ({ item, index }) => {
    const ellipsisTitle = item?.title.length > 20 ? `${item?.title.substring(0, 20)}...` : item?.title;
    return (
      <TouchableOpacity onPress={() => handleItemOnPress(item)}>
        <View style={styles.invoiceListItem}>
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {ellipsisTitle}
            </Text>
            <Text style={{ fontSize: 14 }}>{item?.creation_timestamp}</Text>
          </View>
          <View>
            <Text style={{ fontSize: 14, color: "grey" }}>
              {item?.valor_nota}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const ItemSeparator = () => {
    if (invoices) {
      return (
        <View
          style={{
            height: 2,
            width: "100%",
            backgroundColor: "lightgrey",
          }}
        />
      );
    }
  };

  return (
    <SafeAreaView>
      {invoices && (
        <VirtualizedList
          initialNumToRender={20}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          getItemCount={getItemCount}
          getItem={getItem}
          data={invoices}
          ItemSeparatorComponent={ItemSeparator}
          refreshing={refreshing}
          onRefresh={refreshData}
        />
      )}
    </SafeAreaView>
  );
};

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
  invoiceListItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

export default ListInvoices;
