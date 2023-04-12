import React, { useEffect, useState } from "react";
import { Text, View, SafeAreaView, useAnimatedValue } from "react-native";
import { ElipsizeText } from "../../../utils/ElipsizeText";
import { useIsFocused } from "@react-navigation/native";
import InvoiceItemBodyDetail from "./InvoiceItemBodyDetail";
import useViewAnimation from "../../hooks/useViewAnimation";

const InvoiceItemDetail = ({ route }) => {
  const isFocused = useIsFocused();
  const [updateAnimation, setUpdateAnimation] = useState(false);

  useEffect(() => {
    if (isFocused) {
      useViewAnimation().then(() => setUpdateAnimation(true));
    }
  }, [isFocused]);

  const { details } = route.params;

  const products = details.produtos || [];
  const {
    xLgr: endereco,
    nro: numero,
    xBairro: bairro,
    xMun: cidade,
    UF: uf,
  } = details.emitente.enderEmit;
  const address = `${endereco}, ${numero}, ${bairro} - ${cidade} ${uf || ""}`;
  const elipsizeTextMain = ElipsizeText(details.emitente.xNome, 22);
  const elipsizeTextsubTitle = ElipsizeText(details.emitente.xNome, 25);
  const invoiceItens = {
    address,
    products,
    elipsizeTextMain,
    elipsizeTextsubTitle,
    details,
  };

  return (
    <View>
      {updateAnimation && (
        <View style={{ height: "100%" }}>
          <View style={{ flex: 10 }}>
            <InvoiceItemBodyDetail invoiceItens={invoiceItens} />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              flex: 1,
              padding: 20,
              borderWidth: 1,
              backgroundColor: "#540d6e",
            }}
          >
            <View alignItems="center">
              <Text style={{ fontSize: 18, color: "#ffffff" }}>
                DESCONTO
              </Text>
              <Text style={{ fontSize: 21, fontWeight: 700, color: "#ffffff" }}>
                R${" "}
                {Number(
                  Number(details.totalSemDesconto) - Number(details.total)
                ).toFixed(2)}
              </Text>
            </View>
            <View alignItems="center">
              <Text style={{ fontSize: 18, color: "#ffffff" }}>
                VALOR TOTAL
              </Text>
              <Text style={{ fontSize: 21, fontWeight: 700, color: "#ffffff" }}>
                R$ {Number(Number(details.total)).toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default InvoiceItemDetail;
