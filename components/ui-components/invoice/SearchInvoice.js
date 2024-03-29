import React from "react";
import { Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { View } from "react-native";

  const SearchInvoice = ({handleSearchInvoice}) => {
    return (
      <View style={{ flex: 1, justifyContent: "center", paddingTop: 20 }}>
        <Input
          inputContainerStyle={{
            backgroundColor: "#efefef",
            borderRadius: 8,
            borderBottomWidth: 0,
            paddingLeft: 10
          }}
          placeholder="Buscar por nome da loja"
          onChangeText={(value) => {handleSearchInvoice(value)} }
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

  export default SearchInvoice

