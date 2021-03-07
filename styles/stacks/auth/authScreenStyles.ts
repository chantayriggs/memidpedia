import { StyleSheet } from "react-native"
import { dark } from "../../colors"
import constants from "expo-constants"


export default StyleSheet.create({
    container: {
        backgroundColor: dark,
        padding: 15,
        height: "100%",
        paddingTop: constants.statusBarHeight
    }
})