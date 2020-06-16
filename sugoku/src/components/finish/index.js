import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { useSelector } from 'react-redux'

const Finish = (props) => {
    const { goBack } = props.props.navigation
    const status = useSelector(state => state.user.status)
    const name = useSelector(state => state.user.user)

    return (
        <View>
            <Text>Hi, {name}</Text>
            <Text>Your sugoku is {status}</Text>
            <Button onPress={() => goBack()} title="Retry"></Button>
        </View>
    )
}

export default Finish

const styles = StyleSheet.create({})
