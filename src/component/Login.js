import React from "react";
import "./Login.css";
import { Button } from "@mui/material";
import { auth, provider } from "../firbase";
import { signInWithPopup } from "firebase/auth";
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../Reducer";

const Login = () => {
  const [{}, dispatch] = useStateValue();

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      const dispatchResult =
        (result,
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        }));
      dispatchResult();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div className="login_container">
        <img
          src="https://png.pngtree.com/png-vector/20221018/ourmid/pngtree-whatsapp-icon-png-image_6315990.png"
          alt=""
        />

        <div className="login_text">
          <h1>Sign in to WhatApp</h1>
        </div>

        <Button type="submit" onClick={signInWithGoogle}>
          Sign in With Google
        </Button>
      </div>
    </div>
  );
};

export default Login;
