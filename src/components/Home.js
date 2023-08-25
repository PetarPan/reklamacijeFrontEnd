/** @format */

import React, {  } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import {  useHistory } from "react-router-dom/cjs/react-router-dom.min";
/* import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorderIcon"; */
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
//import cellEditFactory, {Type} from "react-bootstrap-table2-editor";
import filterFactory, {textFilter} from "react-bootstrap-table2-filter";




function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  let history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      history.push('/login');
    } else {
    axios
      .get("http://localhost:3002/posts", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        setListOfPosts(response.data.listOfPosts);
      });
    }
  }, []);

//header definition

  const columns = [
    {
    dataField: "buyerAccount",
    text: "Ugovor",
    sort: true,
    filter: textFilter()
    
  },
    {
    dataField: "buyerName",
    text: "Naziv kupca"
  },
  {
    dataField: "address",
    text: "Adresa",
  },
  {
    dataField: "city",
    text: "Grad",
  },
  {
    dataField: "typeOfCompliantSend",
    text: "Nacin prijema",
  },
  {
    dataField: "compliantNature",
    text: "Vrsta reklamacije",
  },
  {
    dataField: "recieveCompliantDate",
    text: "Datum prijema",
    formatter: (cellContent) => {
      return cellContent.substring(0,10);
    },
  },
  {
    dataField: "endCompliantDate",
    text: "Datum resavanja",
    formatter: (cellContent) => {
      return cellContent.substring(0,10);
    },
  },
  {
    dataField: "note",
    text: "Odgovor",
  },
  {
    dataField: "justifiedComplaint",
    text: "Opravdano",
  },
  {
    dataField: "compliantEnd",
    text: "Zaključeno",
  },
]
const handleRowClick = (row) => {
  history.push(`/post/${row.id}`); // Navigacija na stranicu za uređivanje
};
  return (

    <>
    <BootstrapTable 
    keyField="id" 
    data={listOfPosts} 
    columns={columns} 
    striped
    hover
    condensed
    pagination = {paginationFactory()}
    rowEvents={{
      onClick: (e, row) => {
        handleRowClick(row); // Poziv funkcije za rukovanje klikom na red
      },
    }}
    /* cellEdit = {cellEditFactory({
      mode: "dbclick",
      blurToSave: true,
    })} */
    filter={filterFactory()}
    />
    {/* <HomeSt>
      
      
      {listOfPosts.map((value) => {
        return (
          <div className='wrapper' key={value.id}>
           
            <div className='title'> {value.title} </div>
            <div
              className='postText'
              onClick={() => {
                history.push(`/post/${value.id}`);
              }}>
              
              {value.postText}
            </div>
            <div className="username">
              <Link to={`/profile/${value.UserId}`}>  {value.username}</Link>
            </div>
            <div className='buttton'>
            <FontAwesomeIcon icon={faHeart} onClick={() => {
                  likeAPost(value.id);
                }}
                className={likedPosts.includes(value.id) ? "unliked" : "liked"}/>      
             
              <label>{value.Likes.length}</label>
            </div>
          </div>
        );
      })}
    </HomeSt> */}
    </>
  );
}

export default Home;
