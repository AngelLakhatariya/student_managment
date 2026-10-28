import * as T from "./actionTypes";

const API = "http://localhost:5000";

export const login = (email, password) => async (dispatch) => {
  try {
    const res = await fetch(
      `${API}/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`
    );
    const users = await res.json();
    if (users.length === 0) throw new Error("Invalid email or password");
    const { password: _pw, ...user } = users[0]; // never keep the password in state
    localStorage.setItem("user", JSON.stringify(user));
    dispatch({ type: T.LOGIN_SUCCESS, payload: user });
    return true;
  } catch (err) {
    dispatch({ type: T.LOGIN_FAILURE, payload: err.message });
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem("user");
  return { type: T.LOGOUT };
};
