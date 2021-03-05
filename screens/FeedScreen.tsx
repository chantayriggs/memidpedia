import React, { useState, useEffect } from "react"
import { View, ActivityIndicator, ScrollView } from "react-native"
import * as SecureStore from "expo-secure-store"
import PostItem from "../components/posts/PostItem"

import BaseStyles from "../styles/common/baseStyles"


import Container from "../components/layouts/Container"
import api from "../utils/api"

interface IFeedScreenProps {
    navigation: {
        navigate: (arg: string) => void
    }
}
export default (props: IFeedScreenProps) => {

  const [ posts, setPosts ] = useState([])
  const [ isLoading, setIsLoading ] = useState(true)

  useEffect( () => {
    getPosts()
  }, [])

  const getPosts = async () => {
    const token = await SecureStore.getItemAsync("memipedia_secure_token")

    api.get("/memipedia_posts", {
      headers: {
          Authorization: `Bearer ${token}`
      }
    }).then( response => {
      console.log("Got here from getPosts()", response.data)
      setPosts(response.data.memipedia_posts)
      setIsLoading(false)
    }).catch( error => {
      console.log("Error here from getPosts()", error)
      setIsLoading(false)
    })


  }



  return (
    <Container navigate={props.navigation.navigate}>
      	{/* each of these tags within container are child components so when we call props.children 
      
      	?in Container, it renders these children */}
      	<View>
              {
            isLoading ? <ActivityIndicator /> 
            
            : 

            <ScrollView style={ BaseStyles.containerWithBottomTabBar } >
              {
                posts.map( post => (
                  <PostItem post={post} key={post.id} />
                ))
              }
            </ScrollView>


              }

        
      	</View>
    </Container>
  )
}