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
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../config/firebase-config";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import { TimeStamp } from "../../utils/TimeStamp";
import { zeqContext } from "../../App";

const getInvoices = async (loggedUser) => {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const firebaseQuery = query(collection(db, "nota-fiscal"), where("email", "==", loggedUser));

  let invoices = [];
  const querySnapshot = await getDocs(firebaseQuery);
  querySnapshot.forEach((doc) => {
    invoices.push(doc.data());
  });
  return invoices;
};

const ListInvoices = () => {
  const {loggedUser} = useContext(zeqContext);
  const [invoices, setInvoices] = useState(null);
  useEffect(() => {
    getInvoices(loggedUser).then((item) => setInvoices(item));
  }, []);

  const getItem = (_data, index) => {
    if (index in _data) {
      return {
        key: `${index}`,
        id: _data[index].id,
        title: _data[index].emitente[0].razao_social,
        creation_timestamp: String(
          TimeStamp(_data[index].data_emissao.seconds)
        ),
        valor_nota: `R$ ${_data[index].total}`,
      };
    }
  };
  const keyExtractor = (item, index) => {
    return `${index}`;
  };
  const getItemCount = (_data) => getItem?.length;

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.invoiceListItem}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>{item?.title}</Text>
        <Text style={{ fontSize: 14 }}>{item?.creation_timestamp}</Text>
        <Text style={{ fontSize: 14, color: "grey", paddingTop: 10 }}>
          {item?.valor_nota}
        </Text>
      </View>
    );
  };

  const ItemSeparator = () => {
    if (invoices && invoices.length !== 0 ) {
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
      {invoices && invoices.length !== 0 && (
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
    height: 60,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

export default ListInvoices;
