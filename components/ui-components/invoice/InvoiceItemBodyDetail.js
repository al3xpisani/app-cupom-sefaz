import React, { useEffect } from "react";
import { Image, Text, View, VirtualizedList } from "react-native";
import { TimeStampISOStringFormat } from '../../../utils/TimeStamp'
import { ElipsizeText } from "../../../utils/ElipsizeText";

const InvoiceItemBodyDetail = ({invoiceItens}) => {

    const getItem = (_data, index) => {
      if (index in _data) {
        const {prod: {cProd: codProdNF}} = _data[index];
        const {prod: {xProd: descProdNF}} = _data[index];
        const {prod: {qTrib: qtdeItemNF}} = _data[index];
        const {prod: {vUnTrib: subTotal}} = _data[index];
        const {prod: {vProd: vlTotalProduto}} = _data[index];
        const {prod: {uTrib: undItemNF}} = _data[index];
        return {
          key: `${index}`,
          item: codProdNF,
          nome: descProdNF,
          quantidade: qtdeItemNF,
          subtotal: subTotal,
          total: vlTotalProduto,
          unidade: undItemNF,
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
        <View style={{ padding: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
          <View style={{ flexDirection: "column" }}>
            <Text style={{ fontSize: 14 }}>{ElipsizeText(item.nome,25)}</Text>
            <Text style={{ fontSize: 14 }}>
              {item.quantidade} {item.unidade} X {item.subtotal}
            </Text>
          </View>
            <Text>
              R$ {Number(item.total).toFixed(2)}
            </Text>
        </View>
      );
    };
    return (
      <View>
        <View style={{ padding: 20 }}>
          <Text style={{ marginBottom: 10, fontSize: 16, fontWeight: 600, color: "#540d6e" }} >
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
          <Text style={{ fontSize: 16, fontWeight: 600, marginBottom: 10, color: "#540d6e" }}>
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
            <Text style={{ fontSize: 16, fontWeight: 600, color: "#540d6e" }}>COMPRA</Text>
            <Text style={{ fontWeight: 700 }}>{TimeStampISOStringFormat(invoiceItens.details.data_emissao)}</Text>
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