import React from "react"
import { View } from "react-native"

import BottomTabBar from "../navigation/BottomTabBar"

interface IContainerProps {
	children: any;
	navigate: (arg: string) => void;
}

export default ( props: IContainerProps ) => {
  return (
    <View style={ { height: "100%" } } >
        {props.children}
		{/* props.children is just ot render the child componets of container (which is BottomTabBar */}
		<BottomTabBar navigate={props.navigate} />
    </View>
  )
}


// Container is in every page that imports container (obviously)
