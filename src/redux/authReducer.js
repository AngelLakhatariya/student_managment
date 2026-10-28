import * as T from "./actionTypes";

const savedUser = JSON.parse(localStorage.getItem("user") || "null");

const initialState = {
  user: savedUser,
  isAuthenticated: !!savedUser,
  error: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case T.LOGIN_SUCCESS:
      return { user: action.payload, isAuthenticated: true, error: null };
    case T.LOGIN_FAILURE:
      return { ...state, error: action.payload };
    case T.LOGOUT:
      return { user: null, isAuthenticated: false, error: null };
    default:
      return state;
  }
}
