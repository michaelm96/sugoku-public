import { SET_BOARD, SET_BOARD2, UPDATE_BOARD2,SOLVE_BOARD, SET_DIFFICULTY } from "../actionType/";

export function setBoard(difficulty) {
  return (dispatch, getState) => {
    fetch(`https://sugoku.herokuapp.com/board?difficulty=${difficulty}`)
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

export function setDifficulty(difficulty) {
  return (dispatch, getState) => {
    dispatch({
      type: SET_DIFFICULTY,
      payload: difficulty,
    });
  };
}
