import React, { useEffect } from "react";
import {
  Image,
  Text,
  View,
  VirtualizedList,
} from "react-native";
import { ElipsizeText } from "../../utils/ElipsizeText";
import { useIsFocused } from "@react-navigation/native";
import useViewAnimation from "../hooks/useViewAnimation";

const InvoiceItemDetail = ({ route }) => {
  const isFocused = useIsFocused();
  
  useEffect(() => {
    if (isFocused) {
        useViewAnimation()
    }
  }, [isFocused]);
  
  const { details } = route.params;

  const getItem = (_data, index) => {
    if (index in _data) {
      const product = _data[index];
      return {
        key: `${index}`,
        item: product.item,
        nome: product.nome,
        quantidade: product.quantidade,
        subtotal: product.subtotal,
        total: product.total,
        unidade: product.unidade,
      };
    }
  };
  const keyExtractor = (_, index) => {
    return `${index}`;
  };
  const getItemCount = (_data) => _data.length;

  const ItemSeparator = () => {
    return (
      <View
        style={{
          height: 2,
          width: "100%",
          backgroundColor: "lightgrey",
        }}
      />
    );
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={{ padding: 10 }}>
        <View style={{ flexDirection: "column" }}>
          <Text style={{ fontSize: 14 }}>Descrição</Text>
          <Text style={{ fontSize: 14 }}>
            {item.quantidade} {item.nome}
          </Text>
        </View>
      </View>
    );
  };

  const products = details.produtos || [];

  const { endereco, numero, bairro, cidade, uf } = details.emitente;
  const address = `${endereco}, ${numero}, ${bairro} - ${cidade} ${uf || ""}`;
  const elipsizeTextMain = ElipsizeText(details.emitente.razao_social, 37)
  const elipsizeTextsubTitle = ElipsizeText(details.emitente.razao_social, 25)

  const RenderInvoiceBody = () => {
    return (
      <View>
        <View style={{ padding: 20 }}>
          <Text style={{ marginBottom: 10, fontSize: 16, fontWeight: 300 }}>
            EMISSOR
          </Text>

          <View style={{ diplay: "flex", flexDirection: "row", gap: 15 }}>
            <Image
              source={require("../../assets/images/ic_loja.png")}
              style={{ width: 50, height: 50 }}
            />
            <View>
              <Text style={{ fontSize: 21, fontWeight: 700 }}>
                {elipsizeTextMain}
              </Text>
              <Text>CNPJ {details.emitente.cnpj}</Text>
              <Text>{elipsizeTextsubTitle}</Text>
            </View>
          </View>

          <Text style={{ fontWeight: 300 }}>IE</Text>
          <Text>0000001111111</Text>

          <Text style={{ fontWeight: 300 }}>Endereço</Text>
          <Text>{address}</Text>
        </View>

        <View
          style={{
            height: 2,
            width: "100%",
            backgroundColor: "lightgrey",
          }}
        />

        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 16, fontWeight: 300, marginBottom: 10 }}>
            CONSUMIDOR
          </Text>
          <Text>Nome</Text>
          <Text>{details.consumidor.nome || "-"}</Text>
          <Text>CPF</Text>
          <Text>{details.consumidor.cpf || "-"}</Text>
        </View>

        <View
          style={{
            height: 2,
            width: "100%",
            backgroundColor: "lightgrey",
          }}
        />

        <View style={{ padding: 20 }}>
          <View
            style={{
              diplay: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: 300 }}>COMPRA</Text>
            <Text style={{ fontWeight: 700 }}>{details.data_emissao}</Text>
          </View>

          <VirtualizedList
            style={{ height: "40%" }}
            initialNumToRender={4}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            getItemCount={getItemCount}
            getItem={getItem}
            data={products}
            ItemSeparatorComponent={ItemSeparator}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={{ height: "100%" }}>
      <View style={{ flex: 10, position: "relative" }}>
        <RenderInvoiceBody />
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
  );
};

export default InvoiceItemDetail;
