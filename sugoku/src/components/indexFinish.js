import React from 'react'
import { Provider } from "react-redux";
import store from "../../store/store"
import Finish from "./finish/index"

export default FinishScreen = (props) => (
    <Provider store={store}>
        <Finish props={props}/>
    </Provider>
)
