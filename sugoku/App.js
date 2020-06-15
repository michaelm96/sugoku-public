import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  Button,
  Alert,
} from "react-native";

export default function App() {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [board, setBoard] = useState([]);
  const [board2, setBoard2] = useState([]);
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
    fetch("https://sugoku.herokuapp.com/board?difficulty=easy")
      .then((res) => res.json())
      .then((data) => {
        setBoard(data.board);
        setBoard2(data.board);
      })
      .catch((err) => console.log(err));
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
      marginTop: 150,
      fontWeight: "bold",
      fontSize: 0.1 * windowWidth,
    },
  });

  const handleInput = (e) => {
    setBoard2;
  };

  // console.log(board2);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SUGOKU</Text>
      <View style={styles.container1}>
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
                      setBoard2(newBoard);
                      console.log(newBoard, "!!!!!!!!!!!!!1");
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
              body: encodeParams({board2}),
            })
              .then((response) => response.json())
              .then((response) => alert(response.status))
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
              body: encodeParams({board2}),
            })
              .then((response) => response.json())
              .then((response) => setBoard(response.solution))
              .catch((err) => console.log(err))
          }
        />
      </View>
    </View>
  );
}
