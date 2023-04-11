import { View, Button, Image, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const AddInvoice = () => {
  const navigation = useNavigation();

  const handleScan = () => {
    navigation.navigate("Scan");
  };

  return (
    <TouchableOpacity
      onPress={() => handleScan()}
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#04b44c",
        borderRadius: 10,
        boxShadow: "0 3px 6px rgba(0, 0, 0, .2",
        margin: 10,
      }}
    >
      <Image
        source={require("../../../assets/images/labelinvoicebuttonsmall.png")}
        style={{ width: 22, height: 23 }}
      />

      <Text style={{ color: "#ffffff", fontSize: 18, paddingLeft: 10 }}>
        Adicionar Nota Fiscal
      </Text>
    </TouchableOpacity>
  );
};

export default AddInvoice;
