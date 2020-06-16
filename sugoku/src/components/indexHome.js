import React from 'react'
import { Provider } from "react-redux";
import store from "../../store/store"
import Home from "./home/index"

export default HomeScreen = (props) => (
    <Provider store={store}>
        <Home props={props}/>
    </Provider>
)
