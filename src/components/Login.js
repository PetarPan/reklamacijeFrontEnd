/** @format */

import React, { useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
import FormSt from "../styledComponents/FormSt.style";
import { Helmet, HelmetProvider } from "react-helmet-async";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  let history = useHistory();

  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:3002/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          role: response.data.role,
          status: true,
        });
        history.push("/");
         window.location.reload(); 
      }
    });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      login();
    }
  };

  return (
    <HelmetProvider>
      <FormSt onKeyDown={handleKeyPress}>
        <Helmet>
          <title>Login</title>
        </Helmet>
        <div className='formContainerLogin'>
          <label>KORISNIČKO IME:</label>

          <input
            type='text'
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            placeholder='Unesite svoje korisničko ime'
          />
          <br></br>
          <label>LOZINKA:</label>

          <input
            type='password'
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            placeholder='Unesite svoju lozinku'
          />
          <br></br>
          <button type='submit' onClick={login}>
            Login
          </button>
        </div>
      </FormSt>
    </HelmetProvider>
  );
}

export default Login;
