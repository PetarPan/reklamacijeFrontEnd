/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import PostSt from "../styledComponents/PostSt.style";
import { Page, Text, View, Document, PDFDownloadLink, StyleSheet  } from "@react-pdf/renderer";
import {
  // ...
} from "@react-pdf/renderer";

// Dodajte ovaj komentar kako biste postavili UTF-8 enkoding
// @ts-nocheck

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [showPdf, setShowPdf] = useState(false);

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

  const handlePrintPdf = () => {
    setShowPdf(true);
  };

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

      case "typeOfComplaintSend":
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

      case "complaintNature":
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

      case "recieveComplaintDate":
        newValue = prompt(`Enter new ${option} u formatu gggg-mm-dd: `);
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

      case "endComplaintDate":
        newValue = prompt(`Enter new ${option} u formatu gggg-mm-dd: `);
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
          `http://localhost:3002/posts/justifiedComplaint`,
          {
            newJustifiedComplaint: newValue,
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


  /* const styles = StyleSheet.create({
    container: {
      padding: 25,
    },
    header: {
    textAlign: "center",
    color: 'red',
    marginBottom: 15,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    text: {
      fontSize: 16,
      marginBottom: 5,
    },
    }); */
    const styles = StyleSheet.create({
      container: {
        padding: 25,
        margin: 5,
        border: '2pt solid #000', 
      },
      header: {
        textAlign: 'center',
        color: 'red',
        marginBottom: 15,
        borderBottom: '1pt solid #000',
        padding: 5, 
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        borderBottom: '0.5pt solid #000',
        padding: 5,
      },
      text: {
        fontSize: 16,
        marginBottom: 5,
        borderBottom: '0.5pt solid #000', 
        padding: 5,
      },
    });
    
  return (
    <PostSt>
      <div className='postPage'>
        <div className='leftSide'>
          <div className='post' id='individual'>
            <div className='title'>
              Izmena podataka za reklamaciju ID:{`${postObject.id}`}
            </div>
            {/* Buyer Account Number */}
            <div
              className='postPage'
              onClick={() => {
                editPost("buyerAccount");
              }}>
              <label>Broj Ugovora: </label>
              {postObject.buyerAccount}
            </div>
            {/* Buyer Name */}
            <div
              className='postPage'
              onClick={() => {
                editPost("buyerName");
              }}>
              <label>Ime i prezime: </label>
              {postObject.buyerName}
            </div>
            {/* Buyer Address */}
            <div
              className='postPage'
              onClick={() => {
                editPost("address");
              }}>
              <label>Adresa: </label>
              {postObject.address}
            </div>
            {/* Buyer City */}
            <div
              className='postPage'
              onClick={() => {
                editPost("city");
              }}>
              <label>Grad: </label>
              {postObject.city}
            </div>
            {/* Typer of Complaint */}
            <div
              className='postPage'
              onClick={() => {
                editPost("typeOfCompliantSend");
              }}>
              <label>Način prijema reklamacije: </label>
              {postObject.typeOfCompliantSend}
            </div>
            {/* Complaint Nature */}
            <div
              className='postPage'
              onClick={() => {
                editPost("compliantNature");
              }}>
              <label>Reklamacija na: </label>
              {postObject.compliantNature}
            </div>
            {/* Complaint Start Date */}
            <div
              className='postPage'
              onClick={() => {
                editPost("recieveComplaintDate");
              }}>
              <label>Datum prijema reklamacije: </label>
              {postObject.recieveCompliantDate /* .substring(0,10) */}
            </div>
            {/* Complaint End Date */}
            <div
              className='postPage'
              onClick={() => {
                editPost("endComplaintDate");
              }}>
              <label>Datum zatvaranja reklamacije: </label>
              {postObject.endCompliantDate /* .substring(0,10) */}
            </div>
            {/* Complaint Note */}
            <div
              className='postPage'
              onClick={() => {
                editPost("note");
              }}>
              <label>Odgovor na rekmlamaciju: </label>
              {postObject.note}
            </div>
            {/* Is it Justified? */}
            <div
              className='postPage'
              onClick={() => {
                editPost("justifiedComplaint");
              }}>
              <label>Da li je reklamacija opravdana?: </label>
              {postObject.justifiedComplaint}
            </div>
            {/* Is it Ended? */}
            <div
              className='postPage'
              onClick={() => {
                editPost("compliantEnd");
              }}>
              <label>Da li je reklamacija zaključena?: </label>
              {postObject.compliantEnd}
            </div>
            <div className='footer'>
              <label>Reklamaciju kreirao: </label>
              {postObject.UserId}
              <button
                onClick={() => {
                  deletePost(postObject.id);
                }}>
                Delete Post
              </button>
              <button onClick={handlePrintPdf}>Štampa reklamacije </button>
            </div>
          </div>
        </div>
{/* Ispis celokupne reklamacije, kao forma za izmenu podataka, yakomentarisana je, trenutno nije potrebna */}
       {/*  {showPdf && (
          <div className='pdfContainer'>
            <Document>
              <Page size='A4'>
                <View>
                  <Text>Broj Ugovora: {postObject.buyerAccount}</Text>
                </View>
                <br></br>
                <View>
                  <Text>Ime i prezime kupca: {postObject.buyerName}</Text>
                </View>
                <br></br>
                <View>
                  <Text>Adresa: {postObject.address}</Text>
                </View>
                <br></br>
                <View>
                  <Text>Grad: {postObject.city}</Text>
                </View>
                <br></br>
                <View>
                  <Text>Datum prijema: {postObject.recieveCompliantDate.substring(0,10)}</Text>
                </View>
                <br></br>
                <View>
                  <Text>Datum rešavanja: {postObject.endCompliantDate.substring(0,10)}</Text>
                </View>
                <br></br>
                <View>
                  <Text>Način prijema: {postObject.typeOfCompliantSend}</Text>
                </View>
                <br></br>
                <View>
                  <Text>Tip reklamacije: {postObject.compliantNature}</Text>
                </View>
                <br></br>
                <View>
                  <Text>Odgovor kupcu: {postObject.note}</Text>
                </View>
                <br></br>
                <View>
                  <Text>Opravdana: {postObject.justifiedComplaint}</Text>
                </View>
                <br></br>
                <View>
                  <Text className="red">Zaključena: {postObject.compliantEnd}</Text>
                </View>
                <br></br>
              </Page>
            </Document>
          </div>
        )} */}

        {showPdf && (
      <div className='pdfContainer'>
        <PDFDownloadLink
            document={
            <Document>
              <Page size='A4'>
              <View style={styles.container}>
                  <Text style={styles.header}>Sektor distribucija gasa Beograd</Text>
                  <br></br>
                  <Text style={styles.header}>Reklamacija broj: {postObject.id}</Text>
                  <br></br>
                  <Text style={styles.title}>Broj Ugovora: {postObject.buyerAccount}</Text>
                
                <br></br>
               
                  <Text style={styles.title}>Ime i prezime kupca: {postObject.buyerName}</Text>
               
                <br></br>
               
                  <Text style={styles.text}>Adresa: {postObject.address}</Text>
                
                <br></br>
               
                  <Text style={styles.title}>Grad: {postObject.city}</Text>
               
                <br></br>
               
                  <Text style={styles.title}>Datum prijema: {postObject.recieveCompliantDate.substring(0,10)}</Text>
               
                <br></br>
                
                  <Text style={styles.title}>Datum rešavanja: {postObject.endCompliantDate.substring(0,10)}</Text>
                
                <br></br>
                
                  <Text style={styles.title}>Način prijema: {postObject.typeOfCompliantSend}</Text>
                
                <br></br>
                
                  <Text style={styles.title}>Tip reklamacije: {postObject.compliantNature}</Text>
               
                <br></br>
               
                  <Text style={styles.title}>Odgovor kupcu: {postObject.note}</Text>
               
                <br></br>
               
                  <Text style={styles.title}>Opravdana: {postObject.justifiedComplaint}</Text>
               
                <br></br>
                
                  <Text style={styles.title}>Zaključena: {postObject.compliantEnd}</Text>
                </View>
                <br></br>
              </Page>
            </Document>
          }
          fileName={`reklamacija_${postObject.buyerAccount}.pdf`}
        >
          {({ blob, url, loading, error }) =>
            loading ? 'Loading document...' : 'Preuzmi reklamaciju PDF'
          }
        </PDFDownloadLink>
      </div>
    )}
      </div>
    </PostSt>
  );
}

export default Post;
