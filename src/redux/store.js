import { legacy_createStore as createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import studentReducer from "./studentReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  students: studentReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
