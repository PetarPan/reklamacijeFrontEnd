
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import  PostSt from "../styledComponents/PostSt.style";

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});

  let history = useHistory();
  useEffect(() => {
    axios.get(`http://localhost:3002/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });
  }, [id]);


  const deletePost = (id) => {
    axios
      .delete(`http://localhost:3002/posts/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        history.push("/");
        console.log(`Post ID ${id} deleted`);
      });
    /* .catch((error) => {
        console.error("An error occurred during post deletion:", error);
        
      }) */
  };

    const editPost = (option) => {
      let newValue;
      
      switch (option) {

        case 'buyerAccount':
          newValue = prompt(`Enter new ${option}: `);
          axios.put(
            `http://localhost:3002/posts/buyerAccount`,
            {
              newBuyerAccount: newValue,
              id: id,
            },
            { headers: { accessToken: localStorage.getItem("accessToken") } }
          );
          setPostObject({ ...postObject, buyerAccount: newValue });
          break;
          
        case 'buyerName':
          newValue = prompt(`Enter new ${option}: `);
          axios.put(
            `http://localhost:3002/posts/buyerName`,
            {
              newBuyerName: newValue,
              id: id,
            },
            { headers: { accessToken: localStorage.getItem("accessToken") } }
          );
          setPostObject({ ...postObject, buyerName: newValue });
          break;
          
          case 'address':
            newValue = prompt(`Enter new ${option}: `);
            axios.put(
              `http://localhost:3002/posts/address`,
              {
                newAddress: newValue,
                id: id,
              },
              { headers: { accessToken: localStorage.getItem("accessToken") } }
            );
            setPostObject({ ...postObject, address: newValue });
            break;

            case 'city':
            newValue = prompt(`Enter new ${option}: `);
            axios.put(
              `http://localhost:3002/posts/city`,
              {
                newCity: newValue,
                id: id,
              },
              { headers: { accessToken: localStorage.getItem("accessToken") } }
            );
            setPostObject({ ...postObject, city: newValue });
            break;

            case 'typeOfComplaintSend':
            newValue = prompt(`Enter new ${option}: `);
            axios.put(
              `http://localhost:3002/posts/typeOfComplaintSend`,
              {
                newTypeOfComplaintSend: newValue,
                id: id,
              },
              { headers: { accessToken: localStorage.getItem("accessToken") } }
            );
            setPostObject({ ...postObject, typeOfComplaintSend: newValue });
            break;

            case 'complaintNature':
              newValue = prompt(`Enter new ${option}: `);
              axios.put(
                `http://localhost:3002/posts/complaintNature`,
                {
                  newComplaintNature: newValue,
                  id: id,
                },
                { headers: { accessToken: localStorage.getItem("accessToken") } }
              );
              setPostObject({ ...postObject, complaintNature: newValue });
              break;

              case 'recieveComplaintDate':
              newValue = prompt(`Enter new ${option}: `);
              axios.put(
                `http://localhost:3002/posts/recieveComplaintDate`,
                {
                  newRecieveComplaintDate: newValue,
                  id: id,
                },
                { headers: { accessToken: localStorage.getItem("accessToken") } }
              );
              setPostObject({ ...postObject, recieveComplaintDate: newValue });
              break;

              case 'endComplaintDate':
              newValue = prompt(`Enter new ${option}: `);
              axios.put(
                `http://localhost:3002/posts/endComplaintDate`,
                {
                  newEndComplaintDate: newValue,
                  id: id,
                },
                { headers: { accessToken: localStorage.getItem("accessToken") } }
              );
              setPostObject({ ...postObject, endComplaintDate: newValue });
              break;

              case 'note':
              newValue = prompt(`Enter new ${option}: `);
              axios.put(
                `http://localhost:3002/posts/note`,
                {
                  newNote: newValue,
                  id: id,
                },
                { headers: { accessToken: localStorage.getItem("accessToken") } }
              );
              setPostObject({ ...postObject, note: newValue });
              break;

              case 'justifiedComplaint':
              newValue = prompt(`Enter new ${option}: `);
              axios.put(
                `http://localhost:3002/posts/justifiedComplaint`,
                {
                  newJustifiedComplaint: newValue,
                  id: id,
                },
                { headers: { accessToken: localStorage.getItem("accessToken") } }
              );
              setPostObject({ ...postObject, justifiedComplaint: newValue });
              break;

        default:
          return 0;
      }
    };
    
  return (
     <PostSt>
      <div className='postPage'>
        <div className='leftSide'>
          <div className='post' id='individual'>
            <div
              className='title'
              onClick={() => {
                editPost("buyerAccount");
              }}>
              {postObject.buyerAccount}
            </div>
            <div
              className='postPage'
              onClick={() => {
                editPost("buyerName");
              }}>
              {postObject.buyerName}
            </div>
            <div className='footer'>
              {postObject.UserId}
                <button
                  onClick={() => {
                    deletePost(postObject.id);
                  }}>
                  Delete Post
                </button>
            </div>
          </div>
        </div>
        
      </div>
    </PostSt> 
  );
}

export default Post;
