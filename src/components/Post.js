import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import PostSt from "../styledComponents/PostSt.style";
import {
  Image,
} from "@react-pdf/renderer";
import // ...
  "@react-pdf/renderer";
import Img from "./Img";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useReactToPrint } from 'react-to-print';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';


function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});

  let history = useHistory();
  useEffect(() => {
    axios.get(`http://localhost:3002/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });

  }, [id]);

  /* funkcija za brisanje reklamacije */

  const deletePost = (id) => {
    axios
      .delete(`http://localhost:3002/posts/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        history.push("/");
        console.log(`Post ID ${id} deleted`);
        alert(`Reklamacija ID ${postObject.id} kupca ${postObject.buyerAccount} je obrisana`)
      });
    /* .catch((error) => {
        console.error("An error occurred during post deletion:", error);
        
      }) */
  };

  /* Funkcija za update vrednosti reklamacije */
  const editPost = (option) => {
    let newValue;

    switch (option) {
      case "buyerAccount":
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

      case "buyerName":
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

      case "address":
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

      case "city":
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

      case "typeOfCompliantSend":
        newValue = prompt(`Enter new ${option}: `);
        axios.put(
          `http://localhost:3002/posts/typeOfCompliantSend`,
          {
            newTypeOfCompliantSend: newValue,
            id: id,
          },
          { headers: { accessToken: localStorage.getItem("accessToken") } }
        );
        setPostObject({ ...postObject, typeOfCompliantSend: newValue });
        break;

      case "compliantNature":
        newValue = prompt(`Enter new ${option}: `);
        axios.put(
          `http://localhost:3002/posts/compliantNature`,
          {
            newCompliantNature: newValue,
            id: id,
          },
          { headers: { accessToken: localStorage.getItem("accessToken") } }
        );
        setPostObject({ ...postObject, compliantNature: newValue });
        break;

      case "recieveCompliantDate":
        newValue = prompt(`Enter new ${option} u formatu gggg-mm-dd: `);
        axios.put(
          `http://localhost:3002/posts/recieveCompliantDate`,
          {
            newRecieveCompliantDate: newValue,
            id: id,
          },
          { headers: { accessToken: localStorage.getItem("accessToken") } }
        );
        setPostObject({ ...postObject, recieveCompliantDate: newValue });
        break;

      case "endCompliantDate":
        newValue = prompt(`Enter new ${option} u formatu gggg-mm-dd: `);
        axios.put(
          `http://localhost:3002/posts/endCompliantDate`,
          {
            newEndCompliantDate: newValue,
            id: id,
          },
          { headers: { accessToken: localStorage.getItem("accessToken") } }
        );
        setPostObject({ ...postObject, endCompliantDate: newValue });
        break;

      case "note":
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

      case "justifiedComplaint":
        newValue = prompt(`Enter new ${option}: `);
        axios.put(
          `http://localhost:3002/posts/justifiedCompliant`,
          {
            newJustifiedCompliant: newValue,
            id: id,
          },
          { headers: { accessToken: localStorage.getItem("accessToken") } }
        );
        setPostObject({ ...postObject, justifiedComplaint: newValue });
        break;

      case "compliantEnd":
        newValue = prompt(`Enter new ${option}: `);
        axios.put(
          `http://localhost:3002/posts/compliantEnd`,
          {
            newCompliantEnd: newValue,
            id: id,
          },
          { headers: { accessToken: localStorage.getItem("accessToken") } }
        );
        setPostObject({ ...postObject, compliantEnd: newValue });
        break;

      default:
        return 0;
    }
  };

  //printing Compliant
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'emp-data',

  });
  const startDate = new Date(postObject.recieveCompliantDate);
  const endDate = new Date(postObject.endCompliantDate);
  const timeDifference = (endDate - startDate) / (24 * 60 * 60 * 1000);
  const daysDifference = timeDifference;
  let resultTime = '';
  if (daysDifference === 1) {
    resultTime = '1 dan';
  } else {
    resultTime = daysDifference + ' dana';
  }
  //printing Compliant End

  return (
    <HelmetProvider>
      <Helmet>
        <title>Izmena reklamacije</title>
      </Helmet>
      <PostSt>
        {/* Prikaz za štampanje reklamacije */}

        <div ref={componentRef} style={{ width: '100%', height: window.innerHeight }}>
          <Image src={Img} style={{ maxWidth: '100%', height: 'auto' }} className='img' />
          <h1 className="text-center my-3 border py-3">JP Srbijagas - Sektor distribucija gasa Beograd</h1>
          <h3 className="text-center my-3 border py-3">Reklamacija broj {postObject.id} za kupca {postObject.buyerName},<br></br> Ugovor br. {postObject.buyerAccount}</h3>
          <Table className="w-75 mx-auto" bordered>
            <tbody>
              <tr>
                <td>Broj Ugovora</td>
                <td onClick={() => {
                  editPost("buyerAccount");
                }}>{postObject.buyerAccount}</td>
              </tr>
              <tr>
                <td>Naziv kupca</td>
                <td onClick={() => {
                  editPost("buyerName");
                }}>{postObject.buyerName}</td>
              </tr>
              <tr>
                <td>Adresa</td>
                <td onClick={() => {
                  editPost("address");
                }}>{postObject.address}</td>
              </tr>
              <tr>
                <td>Grad</td>
                <td onClick={() => {
                  editPost("city");
                }}>{postObject.city}</td>
              </tr>
              <tr>
                <td>Način podnošenja</td>
                <td onClick={() => {
                  editPost("typeOfCompliantSend");
                }}>{postObject.typeOfCompliantSend}</td>
              </tr>
              <tr>
                <td>Tip reklamacije</td>
                <td onClick={() => {
                  editPost("compliantNature");
                }}>{postObject.compliantNature}</td>
              </tr>
              <tr>
                <td>Datum prijema</td>
                <td onClick={() => {
                  editPost("recieveCompliantDate");
                }}>{postObject.recieveCompliantDate ? postObject.recieveCompliantDate.substring(0, 10) : 'Nema datuma'}</td>
              </tr>
              <tr>
                <td>Datum rešavanja</td>
                <td onClick={() => {
                  editPost("endCompliantDate");
                }}>{postObject.endCompliantDate ? postObject.endCompliantDate.substring(0, 10) : 'Nema datuma'}</td>
              </tr>
              <tr>
                <td>Vreme rešavanja</td>
                <td>{resultTime}</td>
              </tr>
              <tr>
                <td>Odgovor</td>
                <td onClick={() => {
                  editPost("note");
                }}>{postObject.note}</td>
              </tr>
              <tr>
                <td>Opravdanost</td>
                <td onClick={() => {
                  editPost("justifiedComplaint");
                }}>{postObject.justifiedComplaint}</td>
              </tr>
              <tr>
                <td>Zaključeno</td>
                <td onClick={() => {
                  editPost("compliantEnd");
                }}>{postObject.compliantEnd}</td>
              </tr>
              <tr>
                <td>Obradio</td>
                <td>{postObject.UserId}</td>
              </tr>
            </tbody>
          </Table>

        </div>

        {/* Dugme za štampu reklamacije / čuvanje u PDF */}
        <button onClick={handlePrint}>Preuzmi reklamaciju PDF / Štampa</button>
        {/* Dugme za brisanje reklamacije */}
        <button
          onClick={() => {
            deletePost(postObject.id);
          }}>
          Obriši reklamaciju
        </button>

      </PostSt>
    </HelmetProvider>
  );
}

export default Post;
