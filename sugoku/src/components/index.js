import React from 'react'
import { Provider } from "react-redux";
import store from "../../store/store"
import Board from "./sugokuBoard/board"

export default BoardGame = (props) => (
    <Provider store={store}>
        <Board props={props}/>
    </Provider>
)
