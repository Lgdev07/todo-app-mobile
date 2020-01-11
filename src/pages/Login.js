import React, { useState, useEffect } from 'react'
import { AsyncStorage, StyleSheet, View, Text, TextInput, Image, TouchableOpacity } from 'react-native'
import logo from '../assets/logo.png'
import api from '../services/api'

export default function Login({ navigation }){

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        AsyncStorage.getItem('user').then(user=>{
            if(user){
                navigation.navigate('Dashboard')
            }
        })
    },[])

    const handleSubmit = async () =>{
        const response = await api.post('/users/login',{
            login,
            password
        })

        const { _id } = response.data

        await AsyncStorage.setItem('user', _id)

        navigation.navigate('Dashboard')
    }

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={logo}></Image>
            <Text style={styles.title}>Todo App</Text>
            <View style={styles.form}>
                <Text style={styles.label}>Login</Text>
                <TextInput 
                style={styles.input}
                placeholder="Your Login"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={login}
                onChangeText={setLogin}
                />

                <Text style={styles.label}>Password</Text>
                <TextInput
                style={styles.input}
                placeholder="Your Password"
                placeholderTextColor="#999"
                keyboardType="visible-password"
                autoCapitalize="none"
                autoCorrect={false}
                value={password}
                onChangeText={setPassword}
                />

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    logo:{
        width: 70,
        height: 80
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily:"Calamity-Bold"        
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
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },
    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },
    buttonRegister: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },
    textRegister: {
        marginTop:20,
        marginBottom:5,
        fontWeight:'bold',
        color: '#444',
    },
    buttonText:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    }
})