import axios from "axios";
import React, { useState } from "react";
import FormSt from "../styledComponents/FormSt.style";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Helmet, HelmetProvider } from "react-helmet-async";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const history = useHistory();
  const changePassword = () => {
    axios
      .put(
        "http://localhost:3002/auth/changepassword",
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        }
        
      });
      alert("Uspešno promenjena lozinka");
        history.push('/')
  };
  return (
    <HelmetProvider>
      <Helmet>
        <title>Promena lozinke</title>
      </Helmet>
    <FormSt>
      <form onClick={(e) => {
        e.preventDefault();
      }}>
    <div className='formContainer'>
      <h3>Forma za izmenu lozinke:</h3>
      <label>STARA LOZINKA: </label>
      <input
        type='text'
        placeholder='Unesite staru lozinku'
        onChange={(event) => {
          setOldPassword(event.target.value);
        }}></input>{" "}
      <br></br>
      <label>NOVA LOZINKA: </label>
      <input
        type='password'
        placeholder='Unesite novu lozinku'
        onChange={(event) => {
          setNewPassword(event.target.value);
        }}></input>{" "}
      <br></br>
      <button onClick={changePassword}>Save Changes</button>
    </div>
    </form>
    </FormSt>
    </HelmetProvider>
  );
}

export default ChangePassword;
