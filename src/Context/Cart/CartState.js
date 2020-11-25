import React, { useReducer } from "react";
import CartContext from "./CartContext";
import CartReducer from "./CartReducer";
import axios from "axios";
import setAuthToken from "../../utils/SetAuthToken";
import {
  AUTH_ERROR,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  USER_LOADED,
} from "../Types";

const CartState = (props) => {
  const initialState = {
    cart: localStorage.getItem("cart"),
    loading: true,
    error: null,
  };
  const [state, dispatch] = useReducer(CartReducer, initialState);

  //Load user
  const loadUser = async () => {
    if (localStorage.cart) {
      let InCart = JSON.parse(window.localStorage.getItem("InCart"));
      setCart(localStorage.cart);
    }

    try {
      const res = await axios.get("/api/auth");
      dispatch({ type: USER_LOADED, payload: res.data });
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };
  //Register user
  const register = async (formData) => {
    const config = {
      headers: {
        "content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/users", formData, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      });
      // console.log(err.response.data.msg);
    }
  };

  //Login User
  const login = async (formData) => {
    const config = {
      headers: {
        "content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/api/auth", formData, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
      // console.log(err.response.data.msg);
    }
  };

  //Logout user
  const logOut = () => {
    dispatch({
      type: LOGOUT,
    });
  };

  //clear errors
  const clearError = () => {
    dispatch({ type: CLEAR_ERRORS });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        login,
        loadUser,
        logOut,
        clearError,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
