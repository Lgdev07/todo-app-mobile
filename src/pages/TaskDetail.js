import React, { useEffect, useState } from 'react'
import {View, Text, TextInput, StyleSheet, TouchableOpacity, Image} from 'react-native'
import api from '../services/api'
import backIcon from '../assets/backIcon.png'

export default function TaskDetail({ navigation }){

    const [task, setTask] = useState({})
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    
    useEffect(() => {

        const { taskId } = navigation.state.params

        const loadTask = async () => {
            const response = await api.get(`/tasks/${taskId}`)

            setTask(response.data)

        }

        loadTask()
    }, [])

    const handleDone = async () => {
        await api.put(`/tasks/${task._id}`,{
            active: false
        })

        navigation.navigate('Dashboard')
    }

    const handleUpdate = async () => {
        await api.put(`/tasks/${task._id}`,{
            name: name || task.name,
            description: description || task.description
        })

        navigation.navigate('Dashboard')
    }

    const handleDelete = async () => {
        await api.delete(`/tasks/${task._id}`)

        navigation.navigate('Dashboard')
    }

    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.backIcon} onPress={() => navigation.navigate('Dashboard')}>
                <Image source={backIcon}/>
            </TouchableOpacity>
            <TextInput 
                defaultValue={task.name}
                style={styles.title}
                onChangeText={setName}/>
            <View style={styles.body}>
                <TextInput 
                  defaultValue={task.description}
                  style={styles.description}
                  onChangeText={setDescription}/>
                <TouchableOpacity style={styles.buttonDone} onPress={handleDone}>
                    <Text style={styles.buttonText}>Mark as Done</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonUpdate} onPress={handleUpdate}>
                    <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonDelete} onPress={handleDelete}>
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        marginTop: 30
    },
    header:{
        flexDirection:"row",
    },
    title:{
        marginTop: 70,
        fontWeight: "bold",
        fontSize:30,
    },
    body:{
        height: 500,
        width: 350
    },
    backIcon:{
        position:"absolute",
        left:20,
        top:30
    },
    buttonDone: {
        height: 42,
        width: 120,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        position: 'absolute',
        left:    0,
        bottom:   0,
    },
    buttonDelete: {
        height: 42,
        width: 70,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        position: 'absolute',
        right:    0,
        bottom:   0,
    },
    buttonUpdate: {
        height: 42,
        width: 70,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        position: 'absolute',
        right:    115,
        bottom:   0,
    },
    buttonText:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },
    description:{
        alignSelf: 'center',
        marginTop:40,
        fontSize:20

    }
})