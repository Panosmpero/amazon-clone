import axios from "axios";
import Cookie from "js-cookie";
import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from "../constants/userConstants";

const signin = (email, password) => async (dispatch) => {
  dispatch({
    type: USER_SIGNIN_REQUEST,
    payload: { email, password },
  });
  try {
    const { data } = await axios.post("/api/users/signin", { email, password });
    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data,
    });
    Cookie.set("userInfo", JSON.stringify(data));
    
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload: error.message,
    });
  }
};

const register = (username, email, password) => async (dispatch) => {
  dispatch({
    type: USER_REGISTER_REQUEST,
    payload: { username, email, password },
  });
  try {
    const { data } = await axios.post("/api/users/register", {
      username,
      email,
      password,
    });
    if (data.msg === "Invalid Username") {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload: data,
      });
    } else {
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });
      Cookie.set("userInfo", JSON.stringify(data));
    }
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.message,
    });
  }
};

export { signin, register };
