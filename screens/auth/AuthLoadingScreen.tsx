import React, { useEffect, useContext } from "react"
import { View } from "react-native"
import * as SecureStore from "expo-secure-store"

import CurrentUserContext from "../../contexts/CurrentUserContext"
import api from "../../utils/api"

interface IAuthLoadingScreenProps {
    navigation: {
        navigate: ( screenName: string ) => void
    }
}

// This screen is to see if a user is logged in or not, so we don't actually have to render anything
// This will just renavigate the user
export default ( props: IAuthLoadingScreenProps ) => {
    const { setCurrentUser } = useContext(CurrentUserContext)

    useEffect( () => {
        checkLogin()
    },[])

    const checkLogin = async () => {
        const token = await SecureStore.getItemAsync("memipedia_secure_token")

        if (token) {
            
            api.get("/logged_in", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then( response => {
                console.log("Response from checkLogin:", response.data)
                if (response.data.memipedia_user) {
                    setCurrentUser(response.data.memipedia_user)
                    props.navigation.navigate("App")
                }
            }).catch( error => {
                setCurrentUser(null)
                props.navigation.navigate("Auth")
            })
        } else {
            setCurrentUser(null)
            props.navigation.navigate("Auth")
        }
    }


    return <View />
}