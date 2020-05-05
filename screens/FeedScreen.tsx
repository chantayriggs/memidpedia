import React from "react"
import { Text, View, TouchableOpacity } from "react-native"

import Container from "../components/layouts/Container"

interface IFeedScreenProps {
    navigation: {
        navigate: (arg: string) => void
    }
}
export default (props: IFeedScreenProps) => {
  return (
    <Container navigate={props.navigation.navigate}>
      {/* each of these tags within container are child components so when we call props.children 
      
      ?in Container, it renders these children */}
      <Text>Feed screen</Text>
    </Container>
  )
}