/** @format */

import React, { useContext } from "react";
import axios from "axios";
import HomeSt from "../styledComponents/HomeSt.style";
import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { AuthContext } from "../helpers/AuthContext";
/* import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorderIcon"; */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
//import cellEditFactory, {Type} from "react-bootstrap-table2-editor";
import filterFactory, {textFilter} from "react-bootstrap-table2-filter";




function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  let history = useHistory();
  const { authState } = useContext(AuthContext);

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
        setLikedPosts(
          response.data.likedPosts.map((like) => {
            return like.PostId;
          })
        );
      });
    }
  }, []);

  const likeAPost = (postId) => {
    axios
      .post(
        "http://localhost:3002/likes",
        { PostId: postId },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        setListOfPosts(
          listOfPosts.map((post) => {
            //automatsko menjanje broja lajkova bez refresovanja stranice
            if (post.id === postId) {
              if (response.data.liked) {
                //uvecavanje za lajkovanje
                return { ...post, Likes: [...post.Likes, 0] };
              } else {
                //umanjenje za dislajk
                const likeArray = post.Likes;
                //pop() funkcija uklanja jedan iz array - a
                likeArray.pop();
                return { ...post, Likes: likeArray };
              }
            } else {
              return post;
            }
          })
        );
        if (likedPosts.includes(postId)) {
          setLikedPosts(
            likedPosts.filter((id) => {
              return id !== postId;
            })
          );
        } else {
          setLikedPosts([...likedPosts, postId]);
        }
      });
  };

  const columns = [
    {
    dataField: "username",
    text: "Korisnicko ime",
    sort: true,
    filter: textFilter()
    
  },
    {
    dataField: "title",
    text: "Naslov"
  },
  {
    dataField: "postText",
    text: "Sadrzaj",
    
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
