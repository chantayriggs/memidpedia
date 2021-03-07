import React from "react"
import { Text, View, ScrollView } from "react-native"
import Container from "../components/layouts/Container"
import PostItem from "../components/posts/PostItem"
import PostItemStyles from "../styles/stacks/posts/postItemStyles"

interface IPostDetailScreenProps {
    navigation: {
        navigate: any,
        state: {
            params: {
                post: {
                    id: number,
                    name: string,
                    content: string,
                    post_image_url: string
                }
            }
        }
    }
}


export default ( props: IPostDetailScreenProps ) => {


    const { post } = props.navigation.state.params

    return (

        <Container navigate={props.navigation.navigate}>
            <ScrollView>
                <View>
                    <PostItem post={post} />
                    <View style={PostItemStyles.contentWrapper} >
                        <Text style={PostItemStyles.contentText}>
                            { post.content }
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </Container>
    )
}