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
  Button,
  Pressable,
} from "react-native";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { BlurView } from "expo-blur";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../config/firebase-config";
import { useNavigation, StackActions } from "@react-navigation/native";
import { zeqContext } from "../../context/context";
import { TextInput } from "react-native-paper";

const cesarLogo =
  "https://www.cesar.org.br/image/layout_set_logo?img_id=1086110&t=1673865791645";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setLoggedUser } = useContext(zeqContext);
  const [navigateToHome, setNavigateToHome] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const navigation = useNavigation();

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  useEffect(() => {
    setLoggedUser(email.toLowerCase());
  }, [email]);

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
    <ScrollView contentContainerStyle={styles.container}>
      {/* <View
        style={
          {
            width: "100%",
            height: "100%",
            position: "absolute",
            backgroundColor: "#14d864",
          }
        }
      > */}
      <Image
        source={require("../../assets/images/ic_ZQlogo.png")}
        style={{ width: 50, height: 50 }}
      />
      <Text
        style={
          {
            // fontSize: 50,
            // fontWeight: "bold",
            // color: "white",
            // textAlign: "center",
            // marginTop: 100,
            //             font-size: 22px;
            // font-weight: 800;
            // color: #540d6e;
          }
        }
      >
        <Text style={{ fontSize: 22, fontWeight: 800, color: "#540d6e" }}>
          ZeQ -{" "}
        </Text>
        <Text style={{ fontSize: 22, fontWeight: 400, color: "#540d6e" }}>
          Zero Queue
        </Text>
      </Text>
      {/* </View> */}

      {/* <ScrollView

      > */}
      {/* <BlurView intensity={100}> */}
      <View style={styles.login}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: "#540d6e",
            // marginBottom,
            textAlign: "center",
          }}
        >
          Login Account
        </Text>
        <View>
          {/* <Text style={{ fontSize: 17, fontWeight: "400" }}>Email</Text> */}
          <TextInput
            onChangeText={(text) => setEmail(text)}
            // style={styles.input}
            // placeholder="Email"
            label="Email"
            mode="outlined"
          />
        </View>
        <View>
          {/* <Text style={{ fontSize: 17, fontWeight: "400" }}>Password</Text> */}
          <TextInput
            size="large"
            secureTextEntry={secureTextEntry}
            onChangeText={(text) => setPassword(text)}
            // style={styles.input}
            label="Senha"
            mode="outlined"
            right={
              <TextInput.Icon
                icon="eye"
                onPress={() => setSecureTextEntry(!secureTextEntry)}
              />
            }
          />
        </View>

        <Text style={{ color: "#14d864" }}>Exqueceu sua senha?</Text>

        <View
          style={{
            flexDirection: "column",
            // flex: 1,
            justifyContent: "space-between",
            display: "flex",
            gap: 10,
          }}
        >
          {/* <TouchableOpacity
              onPress={handleLogin}
              style={[styles.button, { backgroundColor: "#00CFEB90" }]}
            >
              <Text style={{ fontSize: 17, fontWeight: "400", color: "white" }}>
                Login
              </Text>
            </TouchableOpacity> */}
          {/* <TouchableOpacity
              onPress={handleCreateAccount}
              style={[styles.button, { backgroundColor: "#6792F098" }]}
            >
              <Text style={{ fontSize: 17, fontWeight: "400", color: "white" }}>
                Criar Conta
              </Text>
            </TouchableOpacity> */}

          {/* <Button title="Login" color="#04b44c" style={{ height: 90 }} /> */}

          <Pressable
            style={{
              backgroundColor: "#04b44c",
              height: 56,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              width: 330,
            }}
            onPress={handleLogin}
          >
            <Text style={{ fontSize: 16, fontWeight: 700, color: "#ffffff" }}>
              LOGIN
            </Text>
          </Pressable>

          <Pressable
            style={{
              backgroundColor: "#6792F098",
              height: 56,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              width: 330,
            }}
            onPress={handleCreateAccount}
          >
            <Text style={{ fontSize: 16, fontWeight: 700, color: "#ffffff" }}>
              CRIAR CONTA
            </Text>
          </Pressable>
        </View>
      </View>
      {/* </BlurView> */}
      {/* </ScrollView> */}
      <View
        style={{
          // position: "absolute",
          // bottom: 0,
          width: "100%",
          // height: 100,
          alignItems: "center",
          justifyContent: "center",
          marginTop: "auto",
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            fontSize: 17,
            fontWeight: "400",
            color: "white",
            marginBottom: 5,
            // marginTop: "auto",
          }}
        >
          Desenvolvido por
        </Text>
        {/* <Image source={{ cesarLogo }} style={StyleSheet.absoluteFill} /> */}
        <Image source={require("../../assets/images/ic_cesarLOGO.png")} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#14d864",
    alignItems: "center",
    // justifyContent: "space-between",
    height: "100%",
    minHeight: 700,
    gap: 20,
    paddingTop: 20,
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
    // height: 300,
    // borderColor: "#6792F098",
    // borderWidth: 2,
    borderRadius: 20,
    padding: 10,
    // alignItems: "center",
    backgroundColor: "#ffffff",
    display: "flex",
    gap: 15,
  },
  input: {
    width: 330,
    height: 40,
    // borderColor: "#fff",
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

export default Login;
