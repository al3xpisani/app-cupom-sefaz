import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Alert,
  Image,
  useWindowDimensions,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";
import NfeAPI from "../../../services/NFeAPI";
import { connect } from "react-redux";
import fetchFirebaseDataMatch, {
  addFirebaseDocument,
} from "../../../config/fetchFirebaseData";
import ShowToast from "../../helpers/ShowToast";
import LoadSpinning from "../../loadspinning/LoadSpinning";
import { QRCodeBorder } from "../../qrcodeborder/QRCodeBorder";
import { SyncAlert } from "../../syncalert/SyncAlert";

const MAX_ATTEMPTS = 10;

function ScanScreen(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const { loggedUser } = props.login;

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getBarCodeScannerPermissions();
  }, []);

  const addNfe = async (nfe) => {
        try {
      addFirebaseDocument(nfe, "nota-fiscal").then(() => {
        navigation.navigate("Home");
        Alert.alert("Nota Fiscal adicionada com sucesso");
      });
    } catch (e) {
      console.error("Falha ao adicionar a NFE: (ScanScreen) ", e);
    }
  };

  const saveInvoice = (QRCodeExtraction) => {
    const invoiceValue = QRCodeExtraction;

    let nfe = {};
    nfe.chave = invoiceValue.chave;
    nfe.consumidor = invoiceValue.consumidor;
    nfe.email = loggedUser;
    nfe.data_emissao = invoiceValue.data_emissao;
    nfe.protocolo = invoiceValue.protocolo;
    nfe.numero = invoiceValue.numero;
    nfe.serie = invoiceValue.serie;
    nfe.total = invoiceValue.total;
    nfe.emitente = invoiceValue.emitente;
    nfe.produtos = invoiceValue.produtos;
    nfe.status = invoiceValue.status;
    nfe.razao_social = invoiceValue.emitente.razao_social;
    fetchFirebaseDataMatch(
      "nota-fiscal",
      "chave",
      nfe.chave,
      "data_emissao",
      false
    ).then((item) => {
      if (item.length !== 0) {
        Alert.alert("Nota Fiscal inválida", "QrCode já importado");
        navigation.navigate("Home");
      } else {
        addNfe(nfe);
      }
    });
  };

  const readQRCode = async (qrCodeData) => {
    let attempts = 0;

    while (attempts < MAX_ATTEMPTS) {
      try {
        const response = await NfeAPI.post("consulta/qr-code/", {
          qrcode: qrCodeData,
          estado: "PE", //Modificar para tratar outros estados
          assincrono: true,
          url_notificacao: "https://cesar.org.br",
        });

        if (response?.data.status !== "concluido") {
          await new Promise((resolve) => setTimeout(resolve, 300));
        } else {
          return response?.data;
        }
      } catch (error) {
        ShowToast("Erro ao acessar servidor. O App fará mais tentativas.");
      } finally {
        attempts++;
        console.log('Attempts. Tentativas site webmania/sefaz : ', attempts);
      }
    }
    await SyncAlert("Alerta","Secretária da Fazenda não responde. Tente novamente.","OK")
    setScanned(false);
    return null;
  };

  const handleBarCodeScanned = async ({ type, data: qrCodeData }) => {
    setScanned(true);
    if (qrCodeData.includes("sefaz") == false && qrCodeData.indexOf('nfce.sefaz.pe.gov.br/nfce-web') === -1) {
      await SyncAlert("Aviso","Este não é um documento fiscal válido!","OK")
      setScanned(false)
      return;
    }
    
    const QRCodeExtraction = await readQRCode(qrCodeData);
    if (QRCodeExtraction) {
      saveInvoice(QRCodeExtraction);
    }
  };
  
  if (hasPermission === null) {
    return (
      <View
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <Text>Solicitando acesso à Camera</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          justifyContent: "center",
        }}
      >
        <Text>Sem acesso à Camera</Text>
        <Text>Habilite o acesso nas preferências do seu celular</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View>
        <QRCodeBorder
          color="#04b44c"
          size={width * 0.7}
          borderLength={"20%"}
          thickness={8}
          borderRadius={0}
        >
          {!scanned && (
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={{
                width: width * 0.7,
                height: width * 0.7,
              }}
            >
              <Button
                color={"black"}
                title={"Ler QRCode"}
                onPress={() => setScanned(false)}
              />
            </BarCodeScanner>
          )}
          {scanned && (
            <View
              style={{
                width: width * 0.7,
                height: width * 0.7,
              }}
            >
              <LoadSpinning />
            </View>
          )}
        </QRCodeBorder>
      </View>
      <View>
        <Text
          style={{
            fontSize: 18,
            color: "white",
            marginTop: "10%",
            paddingLeft: 10,
            paddingRight: 10,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Posicione o QR Code no espaço indicado e aguarde a leitura.
        </Text>
        <Text
          onPress={() => navigation.pop()}
          style={{
            textAlign: "center",
            fontSize: width * 0.05,
            color: "white",
            paddingTop: "10%",
          }}
        >
          Cancelar
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    opacity: 0.8,
  },
});

const mapStateToProps = function (state) {
  return {
    login: state.logins,
  };
};

export default connect(mapStateToProps, null)(ScanScreen);
