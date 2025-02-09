import {  createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import CombineReducers from "./Reducers/CombineReducers";

const AppStore = createStore(CombineReducers,composeWithDevTools());

export default AppStore;