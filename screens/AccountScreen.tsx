
import React from "react"
import { Text, View } from "react-native"

interface IAccountProps {
  navigation: {
      navigate: (arg: string) => void
  }
}

export default (props: IAccountProps) => {
  return (
    <View>
      <Text>Account</Text>
    </View>
  )
}