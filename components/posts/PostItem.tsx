import React from "react"
import { View, Text, Dimensions } from "react-native"
import AutoHeightImage from "react-native-auto-height-image"
import postItemStyles from "../../styles/stacks/posts/postItemStyles"

interface IPostItemProps {
    post : {
        id: number,
        name: string,
        post_image_url: string
    }
}


export default ( props: IPostItemProps ) => {

    const { name, post_image_url } = props.post

    return (
        <View style={postItemStyles.itemWrapper}>
            <View>
                <AutoHeightImage style={postItemStyles.imageWrapper} width={Dimensions.get("window").width} source={{ uri: post_image_url }} />
            </View>
            <View style={[postItemStyles.contentWrapper, postItemStyles.postHeading ]}>
                <Text style={postItemStyles.nameText}>{name}</Text>
            </View>
            
        </View> 
    )

}