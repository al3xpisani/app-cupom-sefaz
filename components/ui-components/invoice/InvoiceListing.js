import React, { useEffect, useState } from "react";
import {
  Image,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  VirtualizedList,
} from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import LoadSpinning from "../../loadspinning/LoadSpinning";
import { TimeStampStringFormat } from "../../../utils/TimeStamp";
import { ElipsizeText } from "../../../utils/ElipsizeText";
import fetchFirebaseDataMatch, {
  fetchFirebaseLikeAt,
} from "../../../config/fetchFirebaseData";
import useViewAnimation from "../../hooks/useViewAnimation";
import { connect } from 'react-redux'

function ListInvoices(props) {
  const characterLimit = 3;
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [invoices, setInvoices] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [backSpaceChar, setBackSpaceChar] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { login: {loggedUser},searchText } = props

  useEffect(() => {
    if (isFocused) {
      refreshData();
    }
  }, [isFocused, searchText]);

  const refreshData = () => {
    if (searchText.length >= characterLimit) {
      if (ignoreIfBackspaceKey()) return;
      fireBaseSearchByTyping();
    } else if (searchText.length === 0) {
      firebaseLoadAtOnce();
    }
  };
  const ignoreIfBackspaceKey = () => {
    if (backSpaceChar >= searchText.length) {
      setBackSpaceChar(searchText.length);
      return true;
    }
  };
  const fireBaseSearchByTyping = () => {
    setIsLoading(true);
    fetchFirebaseLikeAt(
      "nota-fiscal",
      "email",
      loggedUser,
      "emitente.razao_social",
      String(searchText).toUpperCase()
    ).then((item) => {
      setIsLoading(false);
      setRefreshing(false);
      setInvoices(item);
      setBackSpaceChar(searchText.length);
    });
  };

  const firebaseLoadAtOnce = () => {
    setIsLoading(true);
    fetchFirebaseDataMatch(
      "nota-fiscal",
      "email",
      loggedUser,
      "data_emissao",
      false
    ).then((item) => {
      useViewAnimation().then(()=> {
        setIsLoading(false);
        setRefreshing(false);
        setInvoices(item);
        setBackSpaceChar(0);
      })
    });
  };

  const handleItemOnPress = (item) => {
    setInvoices(null)
    navigation.navigate("InvoiceDetail", {
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
    const ellipsisTitle = ElipsizeText(item?.title, 20);
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
      {!isLoading && invoices && invoices.length !== 0 &&  (
        <View>
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
        </View>
      )}
      {!isLoading && invoices && invoices.length === 0 && (
        <View
        style={{
          display: "flex",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
        >
          <Image
            source={require("../../../assets/images/noinvoice.png")}
            style={{ width: 60, height: 60 }}
            />
          <Text style={{ paddingTop: 20, color: "grey", fontSize: 16 }}>
            Nota fiscal não encontrada
          </Text>
        </View>
      )}
      {isLoading && <LoadSpinning />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  invoiceListItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: 50,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

const mapStateToProps = function(state) {
  return {
    login: state.logins,
  }
}

export default connect(mapStateToProps,null)(ListInvoices);
