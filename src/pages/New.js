import React, { useState, useEffect } from 'react'
import { AsyncStorage, StyleSheet, View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import api from '../services/api'
import backIcon from '../assets/backIcon.png'


export default function New({ navigation }){

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmit = async () =>{
        const user_id = await AsyncStorage.getItem('user')

        await api.post('/tasks',{
            name,
            description,
        },{
            headers: { user_id }
        })

        navigation.navigate('Dashboard')
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backIcon} onPress={() => navigation.navigate('Dashboard')}>
                    <Image source={backIcon}/>
                </TouchableOpacity>
                <Text style={styles.title}>New Task</Text>
            </View>
            <View style={styles.form}>
                <Text style={styles.label}>Name</Text>
                <TextInput 
                style={styles.inputName}
                placeholder="Name of Your Task"
                placeholderTextColor="#999"
                autoCorrect={false}
                value={name}
                onChangeText={setName}
                />

                <Text style={styles.label}>Description</Text>
                <TextInput
                style={styles.inputDescription}
                placeholder="Description of Your Task"
                placeholderTextColor="#999"
                multiline = {true}
                numberOfLines = {4}
                value={description}
                onChangeText={setDescription}
                />

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Create</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        fontFamily:"Calamity-Bold"        
    },
    title:{
        marginTop: 40,
        fontWeight: "bold",
        fontSize:20,
    },
    header:{
        flexDirection:"row",
        marginTop:20,
    },
    backIcon:{
        position:"absolute",
        right:170,
        top:30
    },
    form: {
        alignSelf:'stretch',
        paddingHorizontal:30,
        marginTop:30
    },
    label: {
        fontWeight:'bold',
        color: '#444',
        marginBottom: 8,
    },
    inputName: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },
    inputDescription: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 150,
        marginBottom: 20,
        borderRadius: 2,
    },
    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },
    buttonText:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
})