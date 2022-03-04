import React, { useEffect } from 'react';
import {useState} from "react"
import { SafeAreaView, Text, View, Button, TouchableOpacity, Modal, StyleSheet,Pressable, TextInput,ImageBackground, Image, ScrollView,  } from 'react-native';
import { collection, doc, setDoc, query, getDocs, onSnapshot, addDoc, orderBy, limit, Timestamp, where} from "firebase/firestore"; 
import {db} from "../firebase"
import { auth } from '../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Checkbox from 'expo-checkbox';
import {signPlsOut} from "../firebase"

export  const Dashboard = () => {
  const image = { uri: "https://cdn.discordapp.com/attachments/901614276748402820/946157600041476176/Screen_Shot_2022-02-23_at_4.32.16_PM.png" };
  const {uid, photoURL, displayName} = auth.currentUser;
  const projectsref =  collection(db, "projects");
  const [modalVisible, setModalVisible] = useState([]);
  const [projects, setProjects] = useState([])
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");
  const [isChecked, setChecked] = React.useState(false)

  useEffect(() => {
    const getData = async () => {
      const q = await query(projectsref, where('uid', '==', uid), orderBy("createdAt"))
      onSnapshot(q, (snapshot) => {
        let todos = []
        snapshot.forEach((doc) => {todos.push(doc.data())})
        setProjects(todos)
      })
    }
    getData()
  }, [])
  async function handleAddTask () {
    try {
      await addDoc(projectsref, {
        title: title,
        desc: desc,
        createdAt: Timestamp.fromDate(new Date()),
        uid: uid,
      }) 
      setTitle("")
      setDesc("")
      setModalVisible(false)
    }
    catch(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
      // ADD THIS THROW error
      throw error;
    }
  }
  return (
    <>
         <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Add task:</Text>
            <View style={{marginBottom: 20}}>
              <TextInput placeholder='title' value={title} onChangeText={(text) => setTitle(text)} style={{marginBottom: 20, fontSize: "20"}}></TextInput>
              <TextInput placeholder='description' value={desc} onChangeText={(text) => setDesc(text)}></TextInput>
            </View>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text    onPress={() => setModalVisible(!modalVisible)} style={styles.textStyle}>submit task</Text>
            </Pressable>
            <Pressable
              style={[styles.cancel]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={{color: "#000, ", fontSize: 20}}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <SafeAreaView style={{
      flex: 1,
      display: "flex",
      justifyContent: 'space-between',
      margin: 20,
      flexDirection: "column", 
  }}>
     <View style={{
       flex: 1,
       marginTop: 20
     }}>
        <View style={{marginBottom: 20, display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
          <View style={{display: "flex", flexDirection: "row"}}>
          <Image source={{uri: "https://cdn.discordapp.com/attachments/856542608171073616/947245168191496212/Screen_Shot_2022-02-26_at_4.33.30_PM.png"}} style={{width: 50, height: 50}}></Image>
          <View style={{marginLeft: 20, display: "flex", justifyContent: "space-between"}}>
            <Text style={{fontSize: 17, fontWeight: "700"}}>{auth.currentUser.email}</Text>
            <Text style={{color: "grey", fontSize: 15}}>Good Morning 👋🏼</Text>
          </View>
          </View>
          <View style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
            <AntDesign name="search1" size={24} color="black" />
            <Feather name="bell" size={24} color="black" style={{marginLeft: 10}}/>
          </View>
       </View>
    <ScrollView style={{backgroundColor: "#EEE6DF", flex: 1, padding: 10, borderRadius: 20, marginBottom: 20, }}>
         <Text style={{
           fontSize: 30,
           fontWeight: "700"
         }}>Create Daily Tasks 🙌</Text>
        <View style={{display: "flex", flexDirection:  "row", flexWrap: "wrap", alignItems: "center"}}>
        {projects.map((doc, key) => (
          <View key={key} style={{
            backgroundColor: "#fff",
            borderRadius: "20px",
            padding: 10,
            marginTop: 20, 
            width: 130, 
            marginLeft: 20
          }}>
             <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? '#4630EB' : undefined}
        />
          <Text style={{
            color: "#000",
            fontSize: 30, 
            fontWeight: "700"
          }}>{doc.title}</Text>
          <Text style={{
            color: "#000",
            fontSize: 20
          }}>{doc.desc}</Text>
        </View>
     ))}

        </View>
           <View style={{backgroundColor: "#4630EB", borderRadius: "20", padding: 10, alignSelf: "center"}}>
      <Button title='Sign Out' onPress={signPlsOut}  color="#fff" style={{
                    color: "#fff" 
                  }}></Button>
      </View>
       </ScrollView>
     </View>
     <View style={{
         display: "flex",
         alignItems: "center",
         justifyContent: "center",
         flexDirection: "row", 
       }}>
         <TouchableOpacity >
         <Pressable
        onPress={() => setModalVisible(true)}>
           <AntDesign name="pluscircle" size={50} color="#8BF45B" />
        </Pressable>
         </TouchableOpacity>
       </View>
    </SafeAreaView>
      </>
      
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 0, 
    backgroundColor: "rgba(0,0,0,0.7)"
  },
  imagebackground2: {
    alignItems: 'center',
    flexDirection: "column",
    display: "flex",
    flex: 1
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#B55FE9",  
  }, 
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center", 
    fontSize: 20
  },
  cancel: {
    borderRadius: 20,
    padding: 10,
    elevation: 2, 
    marginTop: 20
    },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "700", 
    fontSize: 40
  }
});
