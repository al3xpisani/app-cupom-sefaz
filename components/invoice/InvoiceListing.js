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
import { TimeStamp } from "../../utils/TimeStamp";
import { zeqContext } from "../../App";
import fetchFirebaseDataMatch, { fetchFirebaseDataLikeArrayField } from "../../config/fetchFirebaseData";

const ListInvoices = () => {
  const { loggedUser } = useContext(zeqContext);
  const [invoices, setInvoices] = useState(null);
  useEffect(() => {
    fetchFirebaseDataMatch("nota-fiscal", "email", loggedUser,"data_emissao",false).then((item) =>
      setInvoices(item)
    );
    // fetchFirebaseDataLikeArrayField("nota-fiscal","emitente.razao_social",{emitente: {razao_social: 'Cas'}}).then((item) => console.log(item))
  }, []);

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
      };
    }
  };
  const keyExtractor = (item, index) => {
    return `${index}`;
  };
  const getItemCount = (_data) => invoices?.length;

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.invoiceListItem}>
        <View style={{flexDirection:"column"}}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            {item?.title}
          </Text>
          <Text style={{ fontSize: 14 }}>{item?.creation_timestamp}</Text>
        </View>
        <View>
          <Text style={{ fontSize: 14, color: "grey" }}>
            {item?.valor_nota}
          </Text>
        </View>
      </View>
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
          initialNumToRender={4}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          getItemCount={getItemCount}
          getItem={getItem}
          data={invoices}
          ItemSeparatorComponent={ItemSeparator}
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
    marginHorizontal: 16
  },
});

export default ListInvoices;
