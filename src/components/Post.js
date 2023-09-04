import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import PostSt from "../styledComponents/PostSt.style";
import {
  Page,
  Text,
  View,
  Document,
  PDFDownloadLink,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import // ...
"@react-pdf/renderer";
import Img from "./Img";
import { Helmet, HelmetProvider } from "react-helmet-async";


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




/* Stilizovanje .pdf reklamacije */
  const styles = StyleSheet.create({
    container: {
      padding: 25,
      margin: 5,
      height: 800,
        fontFamily: "Helvetica",
      border: "2pt solid #000",
    },
    header: {
/*       fontFamily: 'Arial Unicode MS',
 */      textAlign: "center",
      color: "black",
      fontWeight: "bold",
      marginBottom: 15,
      /* borderBottom: "1pt solid #000", */
      padding: 5,
    },
    title: {
      fontSize: 17,
      fontWeight: "bold",
      marginBottom: 10,
      borderBottom: "0.5pt solid #000",
      padding: 5,
    },
    text: {
      fontSize: 16,
      marginBottom: 5,
      borderBottom: "0.5pt solid #000",
      padding: 5,
    },
    image: {
      width: 235,
      height: 45,
    },
  });

  return (
    <HelmetProvider>
      <Helmet>
      <title>Izmena reklamacije</title>
      </Helmet>
    <PostSt>
      <h3 className='naslov'>
        Izmena podataka za reklamaciju ID: {`${postObject.id}`}, kupac: {postObject.buyerName}, Ugovor br. {postObject.buyerAccount}
      </h3>
      {/* Postavljanje jedne reklamacije u tabelarni prikaz i funkcionalnost izmene vrednosti na klik */}
      <table className='table table-striped table-bordered table-hover table-sm .table-responsive{-sm|-md|-lg|-xl}'>
        <thead className='thead-dark'>
          <tr>
            <th scope='col'>Broj Ugovora</th>
            <th scope='col'>Ime kupca</th>
            <th scope='col'>Adresa</th>
            <th scope='col'>Grad</th>
            <th scope='col'>Način podnošenja</th>
            <th scope='col'>Tip reklamacije</th>
            <th scope='col'>Datum reklamacije</th>
            <th scope='col'>Datum rešavanja</th>
            <th scope='col'>Odgovor kupcu</th>
            <th scope='col'>Opravdanost</th>
            <th scope='col'>Zaključenost</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              onClick={() => {
                editPost("buyerAccount");
              }}>
              {postObject.buyerAccount}
            </td>
            <td
              onClick={() => {
                editPost("buyerName");
              }}>
              {postObject.buyerName}
            </td>
            <td
              onClick={() => {
                editPost("address");
              }}>
              {postObject.address}
            </td>
            <td
              onClick={() => {
                editPost("city");
              }}>
              {postObject.city}
            </td>
            <td
              onClick={() => {
                editPost("typeOfCompliantSend");
              }}>
              {postObject.typeOfCompliantSend}
            </td>
            <td
              onClick={() => {
                editPost("compliantNature");
              }}>
              {postObject.compliantNature}
            </td>
            <td
              onClick={() => {
                editPost("recieveCompliantDate");
              }}>
              {postObject.recieveCompliantDate &&
                postObject.recieveCompliantDate.substring(0, 10)}
            </td>
            <td
              onClick={() => {
                editPost("endCompliantDate");
              }}>
              {postObject.endCompliantDate &&
                postObject.endCompliantDate.substring(0, 10)}
            </td>
            <td
              onClick={() => {
                editPost("note");
              }}>
              {postObject.note}
            </td>
            <td
              onClick={() => {
                editPost("justifiedComplaint");
              }}>
              {postObject.justifiedComplaint}
            </td>
            <td
              onClick={() => {
                editPost("compliantEnd");
              }}>
              {postObject.compliantEnd}
            </td>
          </tr>
        </tbody>
      </table>
{/* Dugme za brisanje reklamacije */}
      <button
        onClick={() => {
          deletePost(postObject.id);
        }}>
        Obriši reklamaciju
      </button>
      {/* Dugme za transformisanje reklamacije u .pdf i štampu */}
      <button /* onClick={handlePrintPdf} */>
        <div className='pdfContainer'>
          <PDFDownloadLink
            document={
              <Document>
                <Page size='A4'>
                  <View style={styles.container}>
                    <Image src={Img} style={styles.image} />
                    <Text style={styles.header}>
                      SEKTOR DISTRIBUCIJA GASA BEOGRAD, REKLAMACIJA BR: {postObject.id}
                    </Text>
                    <Text style={styles.title}>
                      Broj Ugovora: {postObject.buyerAccount}
                    </Text>
                    <br></br>
                    <Text style={styles.title}>
                      Ime i prezime kupca: {postObject.buyerName}
                    </Text>
                    <br></br>
                    <Text style={styles.title}>
                      Adresa: {postObject.address}
                    </Text>
                    <br></br>
                    <Text style={styles.title}>Grad: {postObject.city}</Text>
                    <br></br>
                    <Text style={styles.title}>
                      Datum prijema:{" "}
                      {postObject.recieveCompliantDate &&
                        postObject.recieveCompliantDate.substring(0, 10)}
                    </Text>
                    <br></br>
                    <Text style={styles.title}>
                      Datum rešavanja:{" "}
                      {postObject.endCompliantDate &&
                        postObject.endCompliantDate.substring(0, 10)}
                    </Text>
                    <br></br>
                    <Text style={styles.title}>
                      Način prijema: {postObject.typeOfCompliantSend}
                    </Text>
                    <br></br>
                    <Text style={styles.title}>
                      Tip reklamacije: {postObject.compliantNature}
                    </Text>
                    <br></br>
                    <Text style={styles.title}>
                      Odgovor kupcu: {postObject.note}
                    </Text>
                    <br></br>
                    <Text style={styles.title}>
                      Opravdana: {postObject.justifiedComplaint}
                    </Text>
                    <br></br>
                    <Text style={styles.title}>
                      Zaključena: {postObject.compliantEnd}
                    </Text>
                    <Text style={styles.title}>
                      Reklamaciju obradio: {postObject.UserId}
                    </Text>
                  </View>
                  <br></br>
                </Page>
              </Document>
            }
            fileName={`reklamacija_${postObject.buyerAccount}.pdf`}>
            {({ blob, url, loading, error }) =>
              loading ? "Loading document..." : "Preuzmi reklamaciju PDF"
            }
          </PDFDownloadLink>
        </div>
      </button>
    </PostSt>
    </HelmetProvider>
  );
}

export default Post;
