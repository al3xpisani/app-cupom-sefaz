import React, { useEffect, useState, useContext } from "react";
import {
  Image,
  Text,
  StyleSheet,
  View,
  ScrollView,
  Pressable,
  SafeAreaView,
} from "react-native";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../../config/firebase-config";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import { ShowToast } from "../../helpers/ShowToast";
import { useSelector, useDispatch, connect } from 'react-redux'
import { actionCreators as loginActions } from "../../../redux/actions/loginActions";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [navigateToHome, setNavigateToHome] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  
  const navigation = useNavigation();
  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  // const { loggedUser } = useSelector((state)=> state.logins)
  const { loggedUser } = props.login
  // const dispatch = useDispatch()

  useEffect(() => {
    // dispatch(loginActions.registerLogin(email.toLowerCase()))
    props.registerLogin(email.toLowerCase())
  }, [email]);
  console.log('props......... ', props.login)
  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        ShowToast("Conta criada com sucesso")
      })
      .catch((error) => {
        console.log(error);
        ShowToast(error)
        console.log("Error" + error);
      });
  };

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Logged In as ",loggedUser);
        navigation.navigate("Home");
      })
      .catch((error) => {
        console.log("Error ==>" + error);
        ShowToast("Usuário ou senha inválidos")
      });
  };

  return (
    <SafeAreaView>
        <ScrollView contentContainerStyle={styles.container}>
          <Image
            source={require("../../../assets/images/ic_ZQlogo.png")}
            style={{ width: 50, height: 50 }}
          />
          <Text>
            <Text style={{ fontSize: 22, fontWeight: 800, color: "#540d6e" }}>
              ZeQ -{" "}
            </Text>
            <Text style={{ fontSize: 22, fontWeight: 400, color: "#540d6e" }}>
              Zero Queue
            </Text>
          </Text>
          <View style={styles.login}>
            <View>
              <TextInput
                onChangeText={(text) => setEmail(text)}
                label="Email"
                mode="outlined"
              />
            </View>
            <View>
              <TextInput
                size="large"
                secureTextEntry={secureTextEntry}
                onChangeText={(text) => setPassword(text)}
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

            <Text style={{ color: "#14d864" }}>Esqueceu sua senha?</Text>

            <View
              style={{
                flexDirection: "column",
                justifyContent: "space-between",
                display: "flex",
                gap: 10,
              }}
            >
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
                <Text
                  style={{ fontSize: 16, fontWeight: 700, color: "#ffffff" }}
                >
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
                <Text
                  style={{ fontSize: 16, fontWeight: 700, color: "#ffffff" }}
                >
                  CRIAR CONTA
                </Text>
              </Pressable>
            </View>
          </View>
          <View
            style={{
              width: "100%",
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
              }}
            >
              Desenvolvido por
            </Text>
            <Image source={require("../../../assets/images/ic_cesarLOGO.png")} />
          </View>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#14d864",
    alignItems: "center",
    height: "100%",
    minHeight: 700,
    gap: 20,
    paddingTop: 60,
  },
  login: {
    width: 350,
    borderRadius: 20,
    padding: 10,
    backgroundColor: "#ffffff",
    display: "flex",
    gap: 15,
  },
});

const mapStateToProps = function(state) {
  return {
    login: state.logins,
  }
}

const mapDispatchToProps = {
  registerLogin: loginActions.registerLogin,
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
