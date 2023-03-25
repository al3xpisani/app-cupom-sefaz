import React, { useEffect } from "react";
import { Image, Text, View, VirtualizedList } from "react-native";

const InvoiceItemBodyDetail = ({invoiceItens}) => {

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
    return (
      <View>
        <View style={{ padding: 20 }}>
          <Text style={{ marginBottom: 10, fontSize: 16, fontWeight: 300 }}>
            EMISSOR
          </Text>

          <View style={{ diplay: "flex", flexDirection: "row", gap: 15 }}>
            <Image
              source={require("../../../assets/images/ic_loja.png")}
              style={{ width: 50, height: 50 }}
            />
            <View>
              <Text style={{ fontSize: 21, fontWeight: 700 }}>
                {invoiceItens.elipsizeTextMain}
              </Text>
              <Text>CNPJ {invoiceItens.details.emitente.cnpj}</Text>
              <Text>{invoiceItens.elipsizeTextsubTitle}</Text>
            </View>
          </View>

          <Text style={{ fontWeight: 300 }}>IE</Text>
          <Text>0000001111111</Text>

          <Text style={{ fontWeight: 300 }}>Endereço</Text>
          <Text>{invoiceItens.address}</Text>
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
          <Text>{invoiceItens.details.consumidor.nome || "-"}</Text>
          <Text>CPF</Text>
          <Text>{invoiceItens.details.consumidor.cpf || "-"}</Text>
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
            <Text style={{ fontWeight: 700 }}>{invoiceItens.details.data_emissao}</Text>
          </View>

          <VirtualizedList
            style={{ height: "40%" }}
            initialNumToRender={4}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            getItemCount={getItemCount}
            getItem={getItem}
            data={invoiceItens.products}
            ItemSeparatorComponent={ItemSeparator}
          />
        </View>
      </View>
    );
  };

  export default InvoiceItemBodyDetail