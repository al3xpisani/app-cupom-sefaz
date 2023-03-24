import React, { useEffect, useState, useContext } from "react";
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
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { TimeStampStringFormat } from "../../utils/TimeStamp";
import { ElipsizeText } from "../../utils/ElipsizeText";
import { zeqContext } from "../../context/context";
import fetchFirebaseDataMatch, {
  fetchFirebaseLikeAt,
} from "../../config/fetchFirebaseData";

function ListInvoices({ searchText }) {
  const characterLimit = 3
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const { loggedUser } = useContext(zeqContext);
  const [invoices, setInvoices] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [backSpaceChar, setBackSpaceChar] = useState(0)

  useEffect(() => {
    if (isFocused) {
      refreshData();
    }
  }, [isFocused, searchText]);

  const refreshData = () => {
    if (searchText.length >= characterLimit) {
      if(ignoreIfBackspaceKey()) return
      fireBaseSearchByTyping()
    } else if (searchText.length === 0) {
      firebaseLoadAtOnce()
    }
  };

  const ignoreIfBackspaceKey = () => {
    if(backSpaceChar >= searchText.length) {
      setBackSpaceChar(searchText.length)
      return true
    }
  }
  const fireBaseSearchByTyping = () => {
    console.log('backspace and data typing ', backSpaceChar, searchText, searchText.length)
    fetchFirebaseLikeAt(
      "nota-fiscal",
      "email",
      loggedUser,
      "emitente.razao_social",
      String(searchText).toUpperCase()
      ).then((item) => {
        setRefreshing(false);
        setInvoices(item);
        setBackSpaceChar(searchText.length)
    });
  }

  const firebaseLoadAtOnce = () => {
    console.log("refreshed data atOnce");
    fetchFirebaseDataMatch(
      "nota-fiscal",
      "email",
      loggedUser,
      "data_emissao",
      false
      ).then((item) => {
        setRefreshing(false);
        setInvoices(item);
        setBackSpaceChar(0)
    });
  }

  const handleItemOnPress = (item) => {
    navigation.navigate("Espelho da nota", {
      details: item.details,
    });
  };

  const getItem = (_data, index) => {
    if (index in _data) {
      return {
        key: `${index}`,
        id: _data[index].id,
        title: _data[index].emitente.razao_social,
        creation_timestamp: String(
          TimeStampStringFormat(_data[index].data_emissao)
        ),
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
        const ellipsisTitle = ElipsizeText(item?.title, 20)
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
      {invoices && invoices.length !== 0 && (
        <VirtualizedList
          style={{ height: "100%" }}
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
      {invoices && invoices.length === 0 && (
          <View
            style={{
              display: "flex",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={require("../../assets/images/noinvoice.png")}
              style={{ width: 60, height: 60 }}
            />
            <Text style={{ paddingTop: 20, color: "grey", fontSize: 16 }}>
              Nota fiscal não encontrada
            </Text>
          </View>
      )}
    </SafeAreaView>
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
