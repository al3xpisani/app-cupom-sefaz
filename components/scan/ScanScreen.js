import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';
import NfeAPI from '../../services/NFeAPI';
import { zeqContext } from "../../context/context";
import {app, db, getFirestore, collection, addDoc} from "../../config/firebase-config2";

const MAX_ATTEMPTS = 10;


// const searchQRCode = async (qrCodeData) => {
//     let attempts = 0;

//     while (attempts < MAX_ATTEMPTS) {
//         try {
//             const response = await NfeAPI.post('consulta/qr-code/', {
//                 qrcode: qrCodeData,
//                 estado: 'PE', //Modificar para tratar outros estados
//                 assincrono: true,
//                 url_notificacao: "https://cesar.org.br"
//             });
            
//             // alert(JSON.stringify(response.data));
            
//             if (response.data.status === 'concluido') {
//                 return response.data;
//             } else {
//                 await new Promise(resolve => setTimeout(resolve, 300));
//             }
//         } catch (error) {
//             alert("Erro"+JSON.stringify(error));
//             console.log(error);
//             attempts++;
//         }
//     }

//     throw new Error('Tentativas excedidas');
// }
    


// async function searchQRCode(qrCodeData) {
//     const response = await NfeAPI.post('consulta/qr-code/', {
//         qrcode: qrCodeData,
//         estado: 'PE', //Modificar para tratar outros estados
//         assincrono: true,
//         url_notificacao: "https://cesar.org.br"
//     });
//     return response;
// }

export default function ScanScreen() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
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

    const searchQRCode = async (qrCodeData) => {
        let attempts = 0;

        while (attempts < MAX_ATTEMPTS) {
            try {
                const response = await NfeAPI.post('consulta/qr-code/', {
                    qrcode: qrCodeData,
                    estado: 'PE', //Modificar para tratar outros estados
                    assincrono: true,
                    url_notificacao: "https://cesar.org.br"
                });
                
                // alert(JSON.stringify(response.data));
                
                if (response.data.status === 'concluido') {
                    return response.data;
                } else {
                    await new Promise(resolve => setTimeout(resolve, 300));
                }
            } catch (error) {
                alert("Erro"+JSON.stringify(error));
                console.log(error);
                attempts++;
            }
        }

        throw new Error('Tentativas excedidas');
    }
    
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

                addNfe(nfe);

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