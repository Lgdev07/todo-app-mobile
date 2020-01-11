import React, { useEffect, useState } from 'react'
import { Image, FlatList, StyleSheet, AsyncStorage, View, Text, TouchableOpacity} from 'react-native'
import api from '../services/api'
import logo from '../assets/logo.png'

export default function Dashboard({ navigation }){
    
    const [tasks, setTasks] = useState([])

    const loadTasks = async () => {
        const user_id = await AsyncStorage.getItem('user')      
        const response = await api.get('/tasks?active=true',{
            headers: { user_id }
        })
        setTasks(response.data)
        setLoading(false)
    }

    const handleDone = async (id) =>{
      await api.put(`/tasks/${id}`,{
        active: false
      })

      loadTasks()
    }

    useEffect(() =>{
        loadTasks()
    },[])
    
    return(
        <View style={styles.container}>
            <View style={styles.containerLogo}>
              <Image style={styles.logo} source={logo}></Image>
              <Text style={styles.title}>Todo App</Text>       
            </View>   
            <TouchableOpacity onPress={() => navigation.navigate('New')} style={styles.buttonNew}>
                <Text style={styles.buttonNewText}>New +</Text>
            </TouchableOpacity>
       
            <View style={styles.dashboardView}>
              <FlatList
              data={tasks}
              style={styles.list}
              keyExtractor={task => task._id}
              renderItem={({item}) => (

                  <View style={styles.thumbnail}>
                    <TouchableOpacity onPress={() => navigation.navigate('TaskDetail',{
                      taskId: item._id
                    })}>
                      <Text>{item.name}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => handleDone(item._id)}>
                        <Text style={styles.buttonText}>Mark as Done</Text>
                    </TouchableOpacity>
                  </View>

              )}
              numColumns={3}
              />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 30
    },
    containerLogo: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 20,
      color: '#444',
      paddingHorizontal: 20,
      marginBottom: 15,
      fontWeight: 'bold'
    },
  
    bold: {
      fontWeight: 'bold'
    },
  
    list: {
      margin: 10,
    },
    thumbnail: {
      width: 95,
      height: 120,
      resizeMode: 'cover',
      borderWidth: 2,
      borderRadius: 10,
      padding:5,
      alignContent: "center",
      margin:10
    },

    button: {
      height: 20,
      backgroundColor: '#f05a5b',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 2,
      position:"absolute",
      width: 80,
      bottom: 5,
      right:5
    },
  
    buttonText: {
      color: '#FFF',
      fontWeight: 'bold',
      fontSize: 12,
    },
    buttonNew:{
      height: 30,
      backgroundColor: '#f05a5b',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 2,
      marginLeft:20,
      marginRight:20,
    },
    buttonNewText:{
      color: '#FFF',
      fontWeight: 'bold',
      fontSize: 20,
    },
    logo:{
      justifyContent: 'center',
      alignItems: 'center',
      width: 70,
      height: 80
    },
    dashboardView:{
      marginRight:20
    }
  });
