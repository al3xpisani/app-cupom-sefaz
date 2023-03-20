import React, { useEffect, useState, createContext, useContext } from "react";
import { Input } from "react-native-elements";
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
} from "react-native";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { BlurView } from "expo-blur";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../config/firebase-config";
import { useNavigation } from "@react-navigation/native";
import { zeqContext } from "../../App";

const cesarLogo =
  "https://www.cesar.org.br/image/layout_set_logo?img_id=1086110&t=1673865791645";

function Login() {
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {setLoggedUser} = useContext(zeqContext);

    const navigation = useNavigation();

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    useEffect(() => {
        setLoggedUser(email.toLowerCase())
    },[email])
  
    const handleCreateAccount = () => {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          alert("Conta Criada com Sucesso");
          const user = userCredential.user;
        })
        .catch((error) => {
          alert(error.message);
          console.log("Error" + error);
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    };
  
    const handleLogin = () => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("Logged In");
          const user = userCredential.user;
          navigation.navigate("Home");
        })
        .catch((error) => {
          console.log("Error" + error);
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    };
  
    return (
        <View style={styles.container}>
          <View
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              backgroundColor: "#52D2B1",
            }}
          >
            <Text
              style={{
                fontSize: 50,
                fontWeight: "bold",
                color: "white",
                textAlign: "center",
                marginTop: 100,
              }}
            >
              Zero Queue
            </Text>
          </View>
  
          <ScrollView
            contentContainerStyle={{
              flex: 1,
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <BlurView intensity={100}>
              <View style={styles.login}>
                <View>
                  <Text style={{ fontSize: 17, fontWeight: "400", color: "white" }}>
                    Email
                  </Text>
                  <TextInput
                    onChangeText={(text) => setEmail(text)}
                    style={styles.input}
                    placeholder="Email"
                  />
                </View>
                <View>
                  <Text style={{ fontSize: 17, fontWeight: "400", color: "white" }}>
                    Password
                  </Text>
                  <TextInput
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                    style={styles.input}
                    placeholder="Senha"
                  />
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    flex: 1,
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    onPress={handleLogin}
                    style={[styles.button, { backgroundColor: "#00CFEB90" }]}
                  >
                    <Text
                      style={{ fontSize: 17, fontWeight: "400", color: "white" }}
                    >
                      Login
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={handleCreateAccount}
                    style={[styles.button, { backgroundColor: "#6792F098" }]}
                  >
                    <Text
                      style={{ fontSize: 17, fontWeight: "400", color: "white" }}
                    >
                      Criar Conta
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </BlurView>
          </ScrollView>
          <View
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              height: 100,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontSize: 17, fontWeight: "400", color: "white" }}>
              Desenvolvido por CESAR
            </Text>
            <Image source={{ cesarLogo }} style={StyleSheet.absoluteFill} />
          </View>
        </View>
    );
  }
  

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#52D2B1",
      alignItems: "center",
      justifyContent: "center",
    },
    containerInvoiceListing: {
      padding: 10,
      flex: 1,
      backgroundColor: "#FFFFFF",
    },
    button: {
      width: 250,
      height: 40,
      borderRadius: 10,
      alignItems: "center",
      padding: 10,
    },
    login: {
      width: 350,
      height: 300,
      borderColor: "#6792F098",
      borderWidth: 2,
      borderRadius: 10,
      padding: 10,
      alignItems: "center",
    },
    input: {
      width: 250,
      height: 40,
      borderColor: "#fff",
      borderWidth: 2,
      borderRadius: 10,
      padding: 10,
      marginVertical: 10,
      backgroundColor: "#ffffff90",
      marginBottom: 20,
    },
    imageStyle: {
      padding: 10,
      margin: 5,
      height: 25,
      width: 25,
      resizeMode: "stretch",
      alignItems: "center",
    },
  });

export default Login