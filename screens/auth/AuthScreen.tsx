import React, { useContext, useState } from "react"
import { View, Text, TouchableOpacity, TextInput, ScrollView } from "react-native"
import * as SecureStore from "expo-secure-store"

import API from "../../utils/api"
import Button from "../../components/helpers/buttons"
import { formatErrors } from "../../utils/textFormatters"

import authScreenStyles from "../../styles/stacks/auth/authScreenStyles"
import textInputStyles from "../../styles/forms/textInputStyles"
import CurrentUserContext from "../../contexts/CurrentUserContext"

const { textField, textFieldWrapper } = textInputStyles


interface IAuthScreenProps {
    navigation: {
        navigate: (arg: string) => void
    }
}

// this function has access to one type of prop and it's the navigation prop
export default ( props: IAuthScreenProps ) => {

    const [formToShow, setFormToShow] = useState("LOGIN")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { getUser } = useContext(CurrentUserContext)


    const screenTypeText = () => {
        if (formToShow === "LOGIN") {
            return "Need an account? Register"
        } else if (formToShow === "REGISTER") {
            return "Already have an account? Login"
        }
    }

    const handleAuthTypePress = () => {
        if (formToShow === "LOGIN") {
            setFormToShow("REGISTER")
        } else if (formToShow === "REGISTER") {
            setFormToShow("LOGIN")
        }
    }

    const buttonText = () => {
        if (formToShow === "LOGIN") {
            return "Login"
        } else if (formToShow === "REGISTER") {
            return "Register"
        }
    }

    const handleLogin = () => {
        const params = {
            auth: {
                email: email,
                password: password
            }
        }

        API.post("memipedia_user_token", params)
             .then( async response => {

                 if (response.data.jwt) {
                    await SecureStore.setItemAsync("memipedia_secure_token", response.data.jwt)
                    getUser()
                    setIsSubmitting(false)
                    props.navigation.navigate("Feed")
                 } else {
                    setIsSubmitting(false)
                    alert("Unrecognized email or password")
                 }
                 
             })
             .catch( error => {
                setIsSubmitting(false)
                alert("Unrecognized email or password")
             })
    }

    const handleRegistration = () => {

        const params = {
            user: {
                email: email,
                password: password
            }
        }

        API.post("memipedia_users", params)
            .then( response => {
                if (response.data.memipedia_user) {
                    handleLogin()
                } else {
                    setIsSubmitting(false)
                    alert(`Error creating account: ${formatErrors(response.data.errors)}`)
                }
            })
            .catch( error => {
                setIsSubmitting(false)
                alert("Error creating user account")
            })
        
    }
    
    const handleSubmit = () => {
        setIsSubmitting(true)

        if (formToShow === "LOGIN") {
            handleLogin()
        } else {

            handleRegistration()
        }
        

    }



    return(
        <ScrollView style={authScreenStyles.container}>

            <View style={textFieldWrapper}>
                <TextInput
                    style={textField}
                    placeholder="Email"
                    value={ email } 
                    onChangeText={ typing => setEmail(typing) }
                    autoCapitalize="none"
                    spellCheck={false}
                    keyboardType="email-address"
                />
            </View>
            <View style={textFieldWrapper}>
                <TextInput
                    style={textField}
                    placeholder="Password"
                    value={ password } 
                    onChangeText={ typing => setPassword(typing) }
                    secureTextEntry={true}
                    onSubmitEditing={handleSubmit}
                />
            </View>

            <TouchableOpacity style={{ marginTop: 10, marginBottom: 20 }} onPress={handleAuthTypePress}>
            <Text style={{ color: "white" }}>{ screenTypeText() }</Text>
            </TouchableOpacity>

            {
                isSubmitting ? <Button text={"Submitting..."} onPress={handleSubmit} disabled={true} />
                : <Button text={buttonText()} onPress={handleSubmit} />
            }

        </ScrollView>
    )
}