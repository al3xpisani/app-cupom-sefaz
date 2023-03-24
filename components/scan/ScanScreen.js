import React, { useState, useEffect, useContext } from "react";
import { Text, View, StyleSheet, Button, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";
import Toast from 'react-native-root-toast';
import NfeAPI from "../../services/NFeAPI";
import { zeqContext } from "../../context/context";
import { RootSiblingParent } from "react-native-root-siblings";
import fetchFirebaseDataMatch, { addFirebaseDocument } from "../../config/fetchFirebaseData";

const MAX_ATTEMPTS = 10;

export default function ScanScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();
  const { loggedUser } = useContext(zeqContext);

  const addNfe = async (nfe) => {
    try {
      addFirebaseDocument(nfe,"nota-fiscal").then(()=>{
        navigation.navigate("Home");
      })
    } catch (e) {
      console.error("Falha ao adicionar a NFE: (ScanScreen) ", e);
    }
  };

  const searchQRCode = async (qrCodeData) => {
    let attempts = 0;

    while (attempts < MAX_ATTEMPTS) {
      try {
        const response = await NfeAPI.post("consulta/qr-code/", {
          qrcode: qrCodeData,
          estado: "PE", //Modificar para tratar outros estados
          assincrono: true,
          url_notificacao: "https://cesar.org.br",
        });

        if (response.data.status === "concluido") {
          return response.data;
        } else {
          await new Promise((resolve) => setTimeout(resolve, 300));
        }
      } catch (error) {
        Toast.show('Erro ao acessar servidor. O App fará mais tentativas.', {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
          backgroundColor: "#540d6e",
          textColor: "#ffffff"
        })
        console.log(error);
        attempts++;
      }
    }

    throw new Error("Tentativas excedidas");
  };

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  //Verificar se o QRCode é válido (se contém SEFAZ), se não for, mostrar uma mensagem de erro.
  //Invocar um POST para a WebmaniaBR, informando a URL do QRCode
  // - Chamar o Get para a WebmaniaBR, informando o UUID
  // - Salvar os dados no Firebase
  // - Navego para a HomeScreen
  const handleBarCodeScanned = ({ type, data: qrCodeData }) => {
    setScanned(true);

    //Verificar se o QRCode é válido (se contém SEFAZ), se não for, mostrar uma mensagem de erro.
    if (qrCodeData.includes("sefaz") == false) {
      alert("Este não é um documento fiscal válido!");
      return;
    }

    searchQRCode(qrCodeData)
      .then((response) => {
        let nfe = {};
        nfe.chave = response.chave;
        nfe.consumidor = response.consumidor;
        nfe.email = loggedUser;
        nfe.data_emissao = response.data_emissao;
        nfe.protocolo = response.protocolo;
        nfe.numero = response.numero;
        nfe.serie = response.serie;
        nfe.total = response.total;
        nfe.emitente = response.emitente;
        nfe.produtos = response.produtos;
        nfe.status = response.status;
        nfe.razao_social = response.emitente.razao_social;
        fetchFirebaseDataMatch(
          "nota-fiscal",
          "chave",
          nfe.chave,
          "data_emissao",
          false
        ).then((item) => {
          if (item.length !== 0) {
            Alert.alert("Nota Fiscal já existente", "QrCode cancelado");
            setScanned(true);
            navigation.navigate("Home");
          } else {
            addNfe(nfe);
          }
        });
      })
      .catch((error) => {
        alert(error);
      });
  };

  if (hasPermission === null) {
    return <Text style={{display: "flex", alignItems: "center", height: "100%", justifyContent: "center"}} >Solicitando acesso à Camera</Text>;
  }

  if (hasPermission === false) {
    return <Text style={{display: "flex", alignItems: "center", height: "100%", justifyContent: "center"}} >Sem acesso à Camera</Text>;
  }

  return (
    <RootSiblingParent>
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        {scanned && (
          <Button title={"Ler QRCode"} onPress={() => setScanned(false)} />
        )}
      </View>
    </RootSiblingParent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
