import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { setName } from "../../../store/actions/userActions";
import { useDispatch, Provider } from "react-redux";
import store from "../../../store/store";

function Home(props) {
  const { navigate } = props.props.navigation;
  const dispatch = useDispatch();
  const [nameText, setNameText] = useState("");

  const onChangeText = (text) => {
    setNameText(text);
  };

  const submitName = async () => {
    await dispatch(setName(nameText));
    navigate("Sugoku");
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "grey",
      }}
    >
      <Text style={{ marginBottom: "50%", fontSize: 30, fontWeight: "100" }}>
        SUGOKU
      </Text>
      <Text style={{ marginBottom: "5%", fontSize: 20, fontWeight: "100" }}>
        Input Your Name:
      </Text>
      <TextInput
        onChangeText={(text) => onChangeText(text)}
        style={{
          backgroundColor: "white",
          width: 200,
          height: 30,
          textAlign: "center",
        }}
      />
      <Button
        disabled={!nameText.length ? true : false}
        onPress={() => submitName()}
        title="Enter the game"
      ></Button>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({});
