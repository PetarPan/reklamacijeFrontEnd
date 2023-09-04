/** @format */

import { BrowserRouter as Router, Route, Switch  } from "react-router-dom";
import Home from "./components/Home";
import CreatePost from "./components/CreatePost";
import Post from "./components/Post";
import Registration from "./components/Registration";
import Login from "./components/Login";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";
import PageNotFound from "./components/PageNotFound";
import Profile from "./components/Profile";
import ChangePassword from "./components/ChangePassword";
import Nav from "./components/Nav";
import ListOfUsers from "./components/ListOfUsers";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    role:'',
    name: "",
    lastName: "",
    status: false,
    });
    
  console.log(authState);
  useEffect(() => {
    axios
      .get("http://localhost:3002/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            role: response.data.role,
            name: response.data.name,
            lastName: response.data.lastName,
            status: true
           
          });
        }
        console.log("provera autentifikacije zavrsena");
      })
      .catch((err) => {
        console.log("greska pri proveri autentifikacije", err);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <Router>
        <Nav setAuthState={setAuthState} />        
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/createpost' exact component={CreatePost} />
          <Route path='/post/:id' exact component={Post} />
          <Route path='/registration' exact component={Registration} />
          <Route path='/login' exact component={Login} />
          <Route path='/profile/:id' exact component={Profile} />
          <Route path='/changepassword' exact component={ChangePassword} />
          <Route path="/listofusers" exact component={ListOfUsers} />
          <Route path='*' exact component={PageNotFound} />
        </Switch>
        
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
