
import React, { useState } from "react"
import { Text, View, TextInput, TouchableOpacity } from "react-native"
import * as SecureStore from "expo-secure-store"
import Feather from "react-native-vector-icons/Feather";

import Container from "../components/layouts/Container"
import api from "../utils/api"
import PostList from "../components/posts/PostList"
import searchStyles from "../styles/stacks/posts/searchStyles"

const {searchFormContainer, searchTextInput, searchIcon } = searchStyles

interface ISearchScreenProps {
  navigation: {
      navigate: (arg: string) => void
  }
}

export default (props: ISearchScreenProps) => {

  const [ query, setQuery ] = useState("")
  const [ posts, setPosts ] = useState([])
  const [ isLoading, setIsLoading ] = useState(false)
  const [ emptyQuery, setEmptyQuery ] = useState(false)

  const handleSearch = async () => {
    const token = await SecureStore.getItemAsync("memipedia_secure_token");

    setIsLoading(true)
    setEmptyQuery(false)

    const params = {
      query
    }
    const headers = {
      Authorization: `Bearer ${token}`
    }

    api.get("/memipedia_queries", {
      params, 
      headers
    }).then( response => {
      if (response.data.memipedia_posts.length === 0 ) {
          setEmptyQuery(true)
      } 
      setPosts(response.data.memipedia_posts)
      setIsLoading(false)
    }).catch( error => {
      setIsLoading(false)
      alert("Error running query")
    })
  }

  const searchBar = (
    <View style={searchFormContainer}>
      <TextInput
        value={query}
        onChangeText={ val => setQuery(val)}
        placeholder="Search for a meme"
        onSubmitEditing={handleSearch}
        style={ searchTextInput }
      />
      <TouchableOpacity onPress={handleSearch} style={ searchIcon }>
        <Feather name="search" color="white" size={25} />
      </TouchableOpacity>
    </View>
  )

  const queryRenderer = () => {
    if (emptyQuery) {
      return <View style={{ padding: 15 }}><Text style={{ color: "white" }}>There were no posts matching your search</Text></View>
    } else {
      return <PostList getPosts={handleSearch} isLoading={isLoading} posts={posts} navigate={props.navigation.navigate} />
    }
  }

  return (
    <Container navigate={props.navigation.navigate}>
      {searchBar}
      {queryRenderer()}
    </Container>
  )
}
