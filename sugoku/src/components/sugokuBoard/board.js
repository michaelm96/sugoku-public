import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Button,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  setBoard,
  setBoard2,
  updateBoard2,
  solveBoard,
} from "../../../store/actions/sugokuActions";
import { setStatus } from "../../../store/actions/userActions"

const Board = (props) => {
  const windowWidth = Dimensions.get("window").width;
  const dispatch = useDispatch();
  const { navigate } = props.props.navigation
  const name = useSelector((state) => state.user.user);
  const board = useSelector((state) => state.sugoku.board);
  const board2 = useSelector((state) => state.sugoku.board2);
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

  useEffect(() => {
    dispatch(setBoard());
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "grey",
    },
    container1: {
      flex: 1,
      backgroundColor: "#fff",
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
    },
    boxder1: {
      backgroundColor: "white",
      justifyContent: "center",
      width: "33.3%",
      height: "33.3%",
      borderColor: "#090696",
      borderWidth: 2,
      flexDirection: "row",
      flexWrap: "wrap",
      textAlign: "center",
    },
    title: {
      marginBottom: 100,
      fontWeight: "bold",
      fontSize: 0.1 * windowWidth,
    },
    name: {
      fontWeight: "bold",
      fontSize: 0.1 * windowWidth,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SUGOKU</Text>
      <Text style={styles.name}>Hi,{name}</Text>
      <View style={styles.container1}>
        {board === [] && <Text>Loading...</Text>}
        {board.map((ele, i) => {
          return (
            <View key={i} style={styles.boxder}>
              {board[i].map((e2, j) => {
                return (
                  <TextInput
                    key={i + "+" + j}
                    style={styles.boxder1}
                    maxLength={1}
                    editable={String(e2) !== "0" ? false : true}
                    keyboardType="number-pad"
                    value={String(e2) !== "0" ? String(e2) : null}
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
                alert(response.status);
                dispatch(setStatus(response.status))
                navigate("Finish")
              })
              .catch((err) => console.log(err))
          }
        />
        <Button
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
    </View>
  );
};

export default Board;
