import React, { useEffect, useState, useContext } from "react";
// import {Button} from 'cesar-hub'
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
import LoadSpinning from "../../loadspinning/LoadSpinning";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../../config/firebase-config";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import { ShowToast } from "../../helpers/ShowToast";
import { useSelector, useDispatch, connect } from 'react-redux'
import { bindActionCreators} from '@reduxjs/toolkit'
import { registerLoggedUserAction, fetchToDoListFromSlice } from "../../../redux/slices/login/login.slice";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [navigateToHome, setNavigateToHome] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [pressedLogin, setPressedLogin] = useState(false);
  
  const navigation = useNavigation();
  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const { login: {loggedUser} } = props
  const { registerLoginActions: {registerLoggedUserAction}, fetchTodoList: {fetchToDoListFromSlice}} = props

  useEffect(() => {
    registerLoggedUserAction(email.toLowerCase())

    //código abaixo serve de exemplo, isolando a api no redux
    // fetchToDoListFromSlice("alexxxxxxxxxxxxxxxxxxxxxxxxxxxx")
  }, [email]);

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
    setPressedLogin(true)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Logged In as ",loggedUser);
        navigation.navigate("Home");
      })
      .catch((error) => {
        console.log("Error ==>" + error);
        ShowToast("Usuário ou senha inválidos")
      })
      .finally(() => {
        setPressedLogin(false)
      })
  };

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Image
            source={require("../../../assets/images/ic_ZQlogo.png")}
            style={{ width: 50, height: 50 }}
          />
          <Text>
            <Text style={{ fontSize: 22, fontWeight: 800, color: "#540d6e" }}>
              Smart
            </Text>
            <Text style={{ fontSize: 22, fontWeight: 400, color: "#540d6e" }}>
            {" "} Shopping
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
                style={[pressedLogin ? styles.pressedLoginButton : styles.loginButton, {
                  height: 56,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 10,
                  width: 330,
                }]}
                onPress={handleLogin}
              >
                {pressedLogin && (
                  <LoadSpinning spinSize={25}/>
                )}
                {(!pressedLogin &&
                <Text
                  style={{ fontSize: 16, fontWeight: 700, color: "#ffffff" }}
                >
                  LOGIN
                </Text>
                )}
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
                onPress={()=> navigation.navigate("ZeqHub")}
              >
                <Text
                  style={{ fontSize: 16, fontWeight: 700, color: "#ffffff" }}
                >
                  CRIAR CONTA
                </Text>
              </Pressable>
              {/* <Button label={"Create account z"}/> */}
            </View>
          </View>
          <View
            style={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "auto",
              marginBottom: 15,
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
  scrollContainer: {
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
  pressedLoginButton: {
    backgroundColor: '#14d864'
  },
  loginButton: {
    backgroundColor: "#04b44c",
  }
});

const mapStateToProps = function(state) {
  return {
    login: state.logins,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    registerLoginActions : bindActionCreators({registerLoggedUserAction}, dispatch),
    fetchTodoList: bindActionCreators({fetchToDoListFromSlice}, dispatch)
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
