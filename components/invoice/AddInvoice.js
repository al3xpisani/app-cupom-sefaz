
import { View, Button, Image } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";

  const AddInvoice = () => {
    const navigation = useNavigation();

    const handleScan = () => {
      navigation.navigate("Scan");
    };

    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#04b44c",
          borderRadius: 10,
          boxShadow: "0 3px 6px rgba(0, 0, 0, .2",
        }}
      >
        <Image
          source={require("../../assets/images/labelinvoicebuttonsmall.png")}
          style={{ width: 22, height: 23 }}
        />
        <Button
          color={"#ffffff"}
          title="Adicionar Nota Fiscal"
          onPress={() => handleScan()}
        ></Button>
      </View>
    );
  };

  export default AddInvoice