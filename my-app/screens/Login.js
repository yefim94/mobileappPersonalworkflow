import React from 'react';
import { Button,StyleSheet,View,Text, Image,SafeAreaView, TextInput, KeyboardAvoidingView, TouchableOpacity,ImageBackground} from 'react-native';
import {auth} from "../firebase"
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { FirebaseError } from 'firebase/app';

export const Login = () => {
  const image = { uri: "https://cdn.discordapp.com/attachments/901614276748402820/946538103714222141/Screen_Shot_2022-02-24_at_5.44.12_PM.png" };
    const [email, setEmail] = React.useState("")
   const [password, setPassword] = React.useState("")
  const handleSignUp = (e) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  }
  const handleLogin  =  () => {
    signInWithEmailAndPassword(auth, email, password)
    .then(userCredentials => {
      const user = userCredentials.user;
      console.log('Logged in with:', user.email);
    })
    .catch(error => alert("A error occured, please use the correct password"))
  }
  return (
    <View style={styles.overallcont}>
    <ImageBackground source={image} resizeMode="cover" style={styles.imagebackground}>
   <SafeAreaView>

   </SafeAreaView>
   </ImageBackground>
    <KeyboardAvoidingView
    style={styles.container}
    behavior="padding">  
    {/** <View style={{
      backgroundColor: "#fff",
      borderRadius: 10,
      paddingTop: 0,
      alignSelf: "flex-start",
      marginTop: -40,
      marginBottom: 20
    }} >
     <Text style={styles.heading}>alumnna</Text>
    </View> */}
    <Text style={styles.heading2}>Manage Your Daily Tasks 🙌</Text>
    <View style={styles.inputContainer}>
      <TextInput
      value={email}
        placeholder="Email"
        style={styles.input}
        onChangeText={text => setEmail(text)}
        autoCapitalize='none'
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        onChangeText={text => setPassword(text)}
        value={password}
        secureTextEntry
        autoCapitalize='none'
      />
    </View>

    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.buttonOutline]}
        onPress={handleSignUp}
      >
        <Text style={styles.buttonOutlineText} >Register</Text>
      </TouchableOpacity>
    </View>
</KeyboardAvoidingView>
</View>
  )
};
const styles = StyleSheet.create({
  overallcont: {
    backgroundColor: "#F5BD87",
    flex: 1
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: "column",
    flex: 0.5,
    paddingTop: 60,
    paddingLeft: 40,
    paddingRight:  40,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    backgroundColor: "#fff",
  },
  imagebackground: {
    alignItems: 'flex-start',
    justifyContent: "flex-start",
    flexDirection: "column",
    display: "flex",
    flex: 0.5
  },
  inputContainer: {
    width: '80%'
  },
  image: {
    width: 200,
    marginTop: 80,
    height: 200
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  heading: {
    fontSize: 27,
    fontWeight: "700",
    color: 'rgba(0,0,0,0.77)'
  },
  heading2: {
    fontSize: 38,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#B55CFA',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    backgroundColor: "#55DC1A",
    marginTop: 5,
    borderColor: '#fff',
    borderWidth: 2,
    color: "#000"
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 16,
  },
});
