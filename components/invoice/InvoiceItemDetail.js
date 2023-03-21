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

const InvoiceItemDetail = ({ route }) => {
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
              {details.emitente.razao_social}
            </Text>
            <Text>CNPJ {details.emitente.cnpj}</Text>
            <Text>{details.emitente.razao_social}</Text>
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
          initialNumToRender={4}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          getItemCount={getItemCount}
          getItem={getItem}
          data={products}
          ItemSeparatorComponent={ItemSeparator}
        />

        <Text style={{ fontSize: 18 }}>VALOR TOTAL</Text>
        <Text style={{ fontSize: 21, fontWeight: 700 }}>
          R$ {details.total}
        </Text>
      </View>
    </View>
  );
};

export default InvoiceItemDetail;
