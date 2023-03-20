import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import { Alert, Image, Text, StyleSheet, View, ScrollView, TouchableOpacity, TextInput, Button, VirtualizedList } from 'react-native';
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import { BlurView } from 'expo-blur';
import {initializeApp} from 'firebase/app';
import { firebaseConfig } from './config/firebase-config';
import { getFirestore, collection, getDocs } from "firebase/firestore";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListInvoices from './components/invoice/InvoiceListing';

const cesarLogo = 'https://www.cesar.org.br/image/layout_set_logo?img_id=1086110&t=1673865791645';

const SearchIcon = () => {
  const [input, setInput] = useState('');
  return (
    <View style={{flex: 1, justifyContent: 'center', paddingTop: 20}}>
      <Input
        inputContainerStyle={{
        backgroundColor: '#efefef',
        borderRadius: 8,
        borderBottomWidth: 0,
        }}
        placeholder='Buscar por nota fiscal'
        value={input}
        onChange={(value) => setInput(value)}
        leftIcon={
          <Icon
            style={{paddingLeft:10}}
            name='search'
            size={14}
            color='black'
          />
        }
      />
    </View>
  );
};

const AddInvoice = ({onHandleScan}) => {
    return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title='Adicionar Nota Fiscal' onPress={() => onHandleScan()}></Button>
    </View>
  );
}

function HomeScreen() {
  const navigation = useNavigation();

  const handleScan = () => {
    navigation.navigate('Scan');
  }

  return (
    <View
      style={[styles.containerInvoiceListing,
        {
          flexDirection: 'column',
        },
      ]}>
      <View style={{flex: 1, justifyContent: 'center', backgroundColor: 'white'}}>
        <SearchIcon/>
      </View>
      <View style={{flex: 8, backgroundColor: 'white'}}>
        <ListInvoices/>
      </View>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <AddInvoice onHandleScan={handleScan}/>
      </View>
    </View>
  )
}

function ScanScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Scan QRCode</Text>
    </View>
  );
}

function LoginScreen()  {

  const [email, setEmail] = React.useState('apa@cesar.org.br');
  const [password, setPassword] = React.useState('123456');
  const navigation = useNavigation();

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert('Conta Criada com Sucesso');
      const user = userCredential.user;
    })
    .catch((error) => {
      alert(error.message);
      console.log('Error' + error)
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('Logged In');
      const user = userCredential.user;
      navigation.navigate('Home');
    })
    .catch((error) => {
      console.log('Error' + error)
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }

  return (
    <View style={styles.container}>
      <View style={{width: '100%', height: '100%', position: 'absolute', backgroundColor: '#52D2B1'}}>
        <Text style={{fontSize: 50, fontWeight: 'bold', color: 'white', textAlign: 'center', marginTop: 100}}>
          Zero Queue
        </Text>
      </View>

      <ScrollView contentContainerStyle={{
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <BlurView intensity={100}>
          <View style={styles.login}>
            <View>
              <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Email</Text>
              <TextInput onChangeText={(text) => setEmail(text)} style={styles.input} placeholder="Email"/>
            </View>
            <View>
              <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Password</Text>
              <TextInput secureTextEntry={true} onChangeText={(text) => setPassword(text)} style={styles.input} placeholder="Senha" />
            </View>
            <View style={{flexDirection: 'column', flex:1, justifyContent: 'space-between'}}>
              <TouchableOpacity onPress={handleLogin} style={[styles.button, {backgroundColor: '#00CFEB90'}]}>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Login</Text> 
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCreateAccount} style={[styles.button, {backgroundColor: '#6792F098'}]}>
                <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Criar Conta</Text> 
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>
      </ScrollView>
      <View style={{position: 'absolute', bottom: 0, width: '100%', height: 100, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 17, fontWeight: '400', color: 'white'}}>Desenvolvido por CESAR</Text>  
        <Image source={{cesarLogo}} style={StyleSheet.absoluteFill} />
      </View>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Scan" component={ScanScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#52D2B1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerInvoiceListing: {
    padding: 10,
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  button: {
    width: 250,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    padding: 10
  }, 
  login: {
    width: 350,
    height: 300,
    borderColor: '#6792F098',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',  
  },
  input: {
    width: 250,
    height: 40,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ffffff90',
    marginBottom: 20,
  },
  imageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
});
