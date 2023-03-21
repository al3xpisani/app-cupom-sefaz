import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';
import NfeAPI from '../../services/NFeAPI';
import { zeqContext } from "../../App";
import {app, db, getFirestore, collection, addDoc} from "../../config/firebase-config2";


async function searchQRCode(qrCodeData) {
    const response = await NfeAPI.post('consulta/qr-code/', {
        qrcode: qrCodeData,
        estado: 'PE', //Modificar para tratar outros estados
        assincrono: true,
        url_notificacao: "https://cesar.org.br"
    });
    return response;
}

export default function ScanScreen() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [nfeData, setNfeData] = useState(null);
    const navigation = useNavigation();
    const {loggedUser} = useContext(zeqContext);

    const addNfe = async(nfe) => {
        try {
            // alert("Salvando no Firebase "+ JSON.stringify(nfe));
            const docRef = await addDoc(collection(db, "nota-fiscal"), nfe);
            console.log("Document written with ID: ", docRef.id);
            navigation.navigate("Home");
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    
    // const db = getFirestore(app);
    // const notaFiscalEntity = collection(db, "nota-fiscal");
    // const notaFiscalEntity = db.firestore().collection('nota-fiscal')
   

    useEffect(() => {
      const getBarCodeScannerPermissions = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
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
        if(qrCodeData.includes('sefaz') == false){
            alert('Este não é um documento fiscal válido!');
            return;
        }
        
        searchQRCode(qrCodeData).then((response) => {
            
            let nfeResponse = response.data;
            
            if(nfeResponse.status == 'concluido') {

                let nfe = {};
                // alert("Logged User: "+loggedUser);
                 
                nfe.chave = nfeResponse.chave;
                nfe.consumidor = nfeResponse.consumidor;
                nfe.email = loggedUser;
                nfe.data_emissao = nfeResponse.data_emissao;
                nfe.protocolo = nfeResponse.protocolo;
                nfe.numero = nfeResponse.numero;
                nfe.serie = nfeResponse.serie;
                nfe.total = nfeResponse.total;
                nfe.emitente = nfeResponse.emitente;
                nfe.produtos = nfeResponse.produtos;
                nfe.status = nfeResponse.status;

                addNfe(nfe);
                // alert(JSON.stringify(nfe));
                // alert('App: '+JSON.stringify(app));
            } else if(nfeResponse.status == 'processando') {
                alert('Erro ao consultar a nota fiscal!');
            }

        }).catch((error) => { alert(error); });
    };
  
    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }

    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }
  
    return (
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        {scanned && <Button title={'Ler QRCode'} onPress={() => setScanned(false)} />}
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    },
  });