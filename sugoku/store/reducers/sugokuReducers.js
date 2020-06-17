import {
  SET_BOARD,
  SET_BOARD2,
  UPDATE_BOARD2,
  SOLVE_BOARD,
  SET_DIFFICULTY,
} from "../actionType";

const initialState = {
  board: [],
  board2: [],
  difficulty: "easy",
};

export default sugokuReducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOARD: {
      return { ...state, board: action.payload };
    }
    case SET_BOARD2: {
      return { ...state, board2: action.payload };
    }
    case UPDATE_BOARD2: {
      return { ...state, board2: action.payload };
    }
    case SOLVE_BOARD: {
      return { ...state, board: action.payload };
    }
    case SET_DIFFICULTY: {
      return { ...state, difficulty: action.payload };
    }
    default: {
      return state;
    }
  }
};
