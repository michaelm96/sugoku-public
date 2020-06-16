import { SET_BOARD, SET_BOARD2, UPDATE_BOARD2,SOLVE_BOARD } from "../actionType/";

export function setBoard() {
  return (dispatch, getState) => {
    fetch("https://sugoku.herokuapp.com/board?difficulty=easy")
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: SET_BOARD,
          payload: data.board,
        })
        dispatch({
          type: SET_BOARD2,
          payload: data.board,
        })
      })
      .catch((err) => console.log(err));
  };
}

export function updateBoard2(newBoard) {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_BOARD2,
      payload: newBoard,
    });
  };
}

export function solveBoard(solvedBoard) {
  return (dispatch, getState) => {
    dispatch({
      type: SOLVE_BOARD,
      payload: solvedBoard,
    });
  };
}
