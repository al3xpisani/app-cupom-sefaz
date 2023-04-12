import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Alert,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import fetchFirebaseDataMatch, {
  addFirebaseDocument,
} from "../../../config/fetchFirebaseData";
import LoadSpinning from "../../loadspinning/LoadSpinning";
import { QRCodeBorder } from "../../qrcodeborder/QRCodeBorder";
import { SyncAlert } from "../../syncalert/SyncAlert";
import { fetchSefazPE } from "./fetchSefazPE";
import { fetchSefazBA } from "./fetchSefazBA";
import { fetchSefazCE } from "./fetchSefazCE";

const UFS = [".pe.", ".ba.", ".ce."];
const CE = "23";

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

  const saveInvoice = (nfe) => {
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

  const readQRCode = async (qrCodeData, sefazUF) => {
    let result;
    if (sefazUF === UFS[0]) {
      result = await fetchSefazPE(qrCodeData, 10, loggedUser);
    } else if (sefazUF === UFS[1]) {
      result = await fetchSefazBA(qrCodeData, 10, loggedUser);
    } else if (sefazUF === UFS[2]) {
      result = await fetchSefazCE(qrCodeData, 10, loggedUser);
    }
    setScanned(false);
    return result;
  };

  const redirectSefazURL = (qrCodeData) => {
    return UFS.filter((item, index) => {
      if (qrCodeData.indexOf(item) !== -1) {
        return item;
      }
    });
  };

  const isSefazCeara = (qrCodeData) => {
    return String(qrCodeData).substring(0, 2) === CE;
  };

  const handleBarCodeScanned = async ({ type, data: qrCodeData }) => {
    let QrCodeHasOnlyNumbers = RegExp("^[0-9]*$");
    setScanned(true);
    console.log("qrcode .....: ", qrCodeData);

    if (qrCodeData.match(QrCodeHasOnlyNumbers)) {
      setScanned(false);
      console.log("QRCode Invalid. It contains only numbers ", qrCodeData);
      return;
    }
    if (qrCodeData.includes("sefaz") == false) {
      if (isSefazCeara(qrCodeData)) {
        qrCodeData = qrCodeData.substring(0, 44);
      } else {
        await SyncAlert(
          "Aviso",
          "Este não é um documento fiscal válido!",
          "OK"
        );
        setScanned(false);
        return;
      }
    }

    const sefazUF = redirectSefazURL(qrCodeData);
    if ((sefazUF.length === 0) & !isSefazCeara(qrCodeData)) {
      await SyncAlert("Aviso", "UF não encontrada no QRcode.", "OK");
      setScanned(false);
      return;
    }

    const QRCodeExtraction = await readQRCode(
      qrCodeData,
      isSefazCeara(qrCodeData) ? UFS[2] : sefazUF[0]
    );
    console.log("entrou .... ", QRCodeExtraction);
    if (QRCodeExtraction) {
      saveInvoice(QRCodeExtraction);
    }
  };

  if (hasPermission === null) {
    console.log('Solicitando novamente acesso a camera.................................')
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
        <TouchableOpacity
          title={"Ler QRCode"}
          onPress={() => setScanned(false)}
          style={{}}
        >
          <Text
            style={{ textAlign: "center", color: "#ffffff", paddingBottom: 10 }}
          >
            Ler QRCode
          </Text>
        </TouchableOpacity>
        <QRCodeBorder
          color="#04b44c"
          size={300}
          borderLength={"15%"}
          thickness={4}
          borderRadius={1}
        >
          {!scanned && (
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={[
                {
                  width: 300,
                  height: 300,
                },
              ]}
            />
          )}
          {scanned && (
            <View
              style={{
                width: 300,
                height: 300,
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
