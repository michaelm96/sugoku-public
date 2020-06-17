import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  ScrollView,
  Button,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  setBoard,
  updateBoard2,
  solveBoard,
  setDifficulty,
} from "../../../store/actions/sugokuActions";
import { setStatus } from "../../../store/actions/userActions";

const Board = (props) => {
  const windowWidth = Dimensions.get("window").width;
  const dispatch = useDispatch();
  const { navigate } = props.props.navigation;
  const { name } = props.props.route.params;
  const board = useSelector((state) => state.sugoku.board);
  const board2 = useSelector((state) => state.sugoku.board2);
  const { difficulty } = props.props.route.params;
  const [text, setText] = useState("");

  useEffect(() => {
    dispatch(setBoard(difficulty));
  }, [difficulty]);


  //Board thingy
  const encodeBoard = (board) =>
    board.reduce(
      (result, row, i) =>
        result +
        `%5B${encodeURIComponent(row)}%5D${
          i === board.length - 1 ? "" : "%2C"
        }`,
      ""
    );

  const encodeParams = (params) =>
    Object.keys(params)
      .map((key) => key + "=" + `%5B${encodeBoard(params[key])}%5D`)
      .join("&");

  //STYLES
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "grey",
    },
    container1: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      flexWrap: "wrap",
      paddingTop: 20,
      backgroundColor: "grey",
    },
    boxder: {
      backgroundColor: "red",
      justifyContent: "center",
      width: 0.3 * windowWidth,
      height: 0.3 * windowWidth,
      borderColor: "blue",
      borderWidth: 2,
      flexDirection: "row",
      flexWrap: "wrap",
      margin: 2,
    },
    boxder1: {
      backgroundColor: "white",
      justifyContent: "center",
      borderColor: "#090696",
      borderWidth: 2,
      flexDirection: "row",
      flexWrap: "wrap",
      textAlign: "center",
    },
    title: {
      fontWeight: "bold",
      fontSize: 0.1 * windowWidth,
      textAlign: "center",
    },
    difficulty: {
      marginBottom: 20,
      marginTop: 20,
      fontWeight: "bold",
      fontSize: 0.05 * windowWidth,
      textAlign: "center",
    },
    name: {
      fontWeight: "bold",
      fontSize: 0.1 * windowWidth,
      textAlign: "center",
      color: "lightblue",
    },
  });
  //STYLES END

  //return here
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        <Text style={{ color: "red" }}>S</Text>
        <Text style={{ color: "orange" }}>U</Text>
        <Text style={{ color: "yellow" }}>G</Text>
        <Text style={{ color: "green" }}>O</Text>
        <Text style={{ color: "blue" }}>K</Text>
        <Text style={{ color: "indigo" }}>U</Text>
      </Text>
      <Text style={styles.difficulty}>
        Difficulty:{" "}
        {(difficulty === "easy" && (
          <Text style={{ color: "green" }}>{difficulty}</Text>
        )) ||
          (difficulty === "medium" && (
            <Text style={{ color: "blue" }}>{difficulty}</Text>
          )) ||
          (difficulty === "hard" && (
            <Text style={{ color: "red" }}>{difficulty}</Text>
          ))}
      </Text>
      <Text style={styles.name}>Hi, {name}</Text>
      <View style={styles.container1}>
        {board.map((ele, i) => {
          return (
            <View key={i} style={{ borderWidth: 2, width: 40 }}>
              {board[i].map((e2, j) => {
                return (
                  <TextInput
                    key={i + "+" + j}
                    style={styles.boxder1}
                    maxLength={1}
                    editable={String(e2) !== "0" ? false : true}
                    keyboardType="numeric"
                    value={String(e2) !== "0" ? String(e2) : null}
                    // textContentType='telephoneNumber'
                    onChange={(e) => {
                      const num = Number(e.nativeEvent.text);
                      const newBoard = board2.map((e3, k) => {
                        return e3.map((e4, l) =>
                          i === k && j === l ? num : e4
                        );
                      });
                      dispatch(updateBoard2(newBoard));
                    }}
                  />
                );
              })}
            </View>
          );
        })}
        <Button
          color="#090696"
          title="Validate"
          onPress={() =>
            fetch("https://sugoku.herokuapp.com/validate", {
              method: "POST",
              headers: {
                "content-type": "application/x-www-form-urlencoded",
              },
              body: encodeParams({ board: board2 }),
            })
              .then((response) => response.json())
              .then((response) => {
                dispatch(setStatus(response.status));
                navigate("Finish");
              })
              .catch((err) => console.log(err))
          }
        />
        <Button
          color="#c6c600"
          title="Solve Now"
          onPress={() =>
            fetch("https://sugoku.herokuapp.com/solve", {
              method: "POST",
              headers: {
                "content-type": "application/x-www-form-urlencoded",
              },
              body: encodeParams({ board: board2 }),
            })
              .then((response) => response.json())
              .then((response) => {
                dispatch(solveBoard(response.solution));
              })
              .catch((err) => console.log(err))
          }
        />
      </View>
    </ScrollView>
  );
};

export default Board;
