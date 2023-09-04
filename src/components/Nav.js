import React, { useContext } from "react";
import NavSt from "../styledComponents/NavSt.style";
import { AuthContext } from "../helpers/AuthContext";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function Nav({ setAuthState }) {
  const { authState } = useContext(AuthContext);
  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      id: 0,
      role: "",
      name: "",
      lastName: "",
      status: false,
    });
  };
  return (
    <NavSt>
      {!authState.status ? (
        <>
          <Link to='/login'> Login</Link>
        </>
      ) : Number(authState.role) === 1 ? (
        <>
          <Link to='/'> Početna strana</Link>
          <Link to='/createpost'> Napravi reklamaciju</Link>
          <Link to='/registration'>Registruj korisnika</Link>
          <Link to='/changepassword'>Promeni lozinku</Link>
          <Link to='/login' onClick={logout}>
            Logout
          </Link>
          <Link className='username' to='#'>
            {" "}
            Korisnik: {authState.username}
          </Link>
        </>
      ) : (
        <>
          <Link to='/'> Početna strana</Link>
          <Link to='/createpost'> Napravi reklamaciju</Link>
          <Link to='/changepassword'>Promeni lozinku</Link>
          <Link to='/login' onClick={logout}>
            Logout
          </Link>
          <Link className='username' to='#'>
            {" "}
            Korisnik: {authState.name + " " + authState.lastName}
          </Link>
        </>
      )}
    </NavSt>
  );
}
export default Nav;
