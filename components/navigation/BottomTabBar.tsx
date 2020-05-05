
import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";

import bottomTabStyles from "../../styles/navigation/bottomTabStyles";

interface IBottomTabBarProps {
  navigate: (arg: string) => void;
}

export default (props: IBottomTabBarProps) => {
  return (
    <View style={bottomTabStyles.container}>
      <TouchableOpacity onPress={() => props.navigate("Feed")}>
        <FontAwesome name="newspaper-o" color="white" size={25} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigate("Search")}>
        <Feather name="search" color="white" size={25} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigate("PostForm")}>
        <Feather name="plus-square" color="white" size={25} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.navigate("Account")}>
        <Feather name="settings" color="white" size={25} />
      </TouchableOpacity>
    </View>
  );
};