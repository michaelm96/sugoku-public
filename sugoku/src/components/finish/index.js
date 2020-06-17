import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { setBoard } from '../../../store/actions/sugokuActions'
import { color } from 'react-native-reanimated'

const Finish = (props) => {
    const { navigate } = props.props.navigation
    const status = useSelector(state => state.user.status)
    const name = useSelector(state => state.user.user)
    const difficulty = useSelector(state => state.sugoku.difficulty)
    const dispatch = useDispatch()

    return (
        <View style={{ backgroundColor: "purple", flex: 1 }}>
            <Text style={styles.textHi}>Hi, {name}</Text>
            <Text style={styles.status}>Your sugoku is {status}</Text>
            <Button style={styles.button} onPress={() => {
                dispatch(setBoard(difficulty))
                navigate('Sugoku')
            }} title="Try Again"></Button>
        </View>
    )
}

export default Finish

const styles = StyleSheet.create({
    textHi: {
        fontSize: 30,
        textAlign: "center",
        color: "#34ebd5"
    },
    status: {
        fontSize: 30,
        textAlign: "center",
        color: "#34ebd5",
        marginBottom: 20
    },
})
