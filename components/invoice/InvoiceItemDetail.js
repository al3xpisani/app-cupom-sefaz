import React, { useEffect } from "react";
import {  Text, View, SafeAreaView } from "react-native";
import { ElipsizeText } from "../../utils/ElipsizeText";
import { useIsFocused } from "@react-navigation/native";
import InvoiceItemBodyDetail from "./InvoiceItemBodyDetail";

const InvoiceItemDetail = ({ route }) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
    }
  }, [isFocused]);

  const { details } = route.params;

  const products = details.produtos || [];

  const { endereco, numero, bairro, cidade, uf } = details.emitente;
  const address = `${endereco}, ${numero}, ${bairro} - ${cidade} ${uf || ""}`;
  const elipsizeTextMain = ElipsizeText(details.emitente.razao_social, 37);
  const elipsizeTextsubTitle = ElipsizeText(details.emitente.razao_social, 25);
  const invoiceItens = {address, products, elipsizeTextMain,elipsizeTextsubTitle, details}

  return (
    <SafeAreaView>
      <View style={{ height: "100%" }}>
        <View style={{ flex: 10, position: "relative" }}>
          <InvoiceItemBodyDetail invoiceItens={invoiceItens} />
        </View>
        <View
          style={{
            position: "sticky",
            alignItems: "flex-end",
            flex: 1,
            padding: 20,
            borderWidth: 1,
            backgroundColor: "#540d6e",
          }}
        >
          <Text style={{ fontSize: 18, color: "#ffffff" }}>VALOR TOTAL</Text>
          <Text style={{ fontSize: 21, fontWeight: 700, color: "#ffffff" }}>
            R$ {details.total}
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default InvoiceItemDetail;
