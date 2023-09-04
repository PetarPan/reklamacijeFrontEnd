import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ListOfUsers() {
  const [users, setUsers] = useState([]);
  /* useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      history.push("/login");
    } else {
      axios
        .get("http://localhost:3002/listofusers", {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then((response) => {
          setUsers(response.data.users);
        });
    }
  }, []); */

  useEffect(() => {
    axios
    .get("http://localhost:3002/listofusers").then((res) => {
        setUsers(res.data)
    })
  },[])

  return (
    <div>
       
       <div>
        {users.map((u, key) => (
        <div key={key}>{u.username}</div>
        ))}
    </div>
      
    </div>
  );
}

export default ListOfUsers;
