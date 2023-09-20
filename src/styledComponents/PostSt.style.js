import styled from 'styled-components';


/*post style */


const PostSt = styled.div`

.post {
  position: relative;
  width: 400px;
  /*  height: 300px;  */
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
  border: 1px solid lightgray;
  font-family: Arial, Helvetica, sans-serif;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}

.post:hover {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  cursor: pointer;
}
.post .title {
 /*  flex: 20%; */
  border-bottom: 1px solid lightgray;
  background-color: dodgerblue;
  display: grid;
  place-content: center;
  color: white;
}

.post .body {
 flex: 60%; 
  display: grid;
  place-content: center;
  
}

.post .footer {
  /* flex: 20%; */
  border-top: 1px solid lightgray;
  display: flex;
  align-items: center;
  padding-left: 15px;
  background-color: dodgerblue;
  color: white;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

}
  .postPage {
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 0 15px 0 15px;
/*   height: 100%;
 */}
 .sss:hover {
  background: lightgrey;
  transition: .5s;
 }

.leftSide {
  flex: 50%;
  height: calc(100vh - 70px);
  display: grid;
  place-items: center;
  
}

#individual {
/*   height: 500px;
 */  width: 600px;
}

#individual .title,
#individual .footer {
  font-size: 30px;
}

#individual .body {
  font-size: 25px;
}


button {
  height: 100%;
  display: block;
  font-size: 1.2rem;
  background: #28A745;
  color: #FFFFFF;
  border-radius: 10px;
  cursor: pointer;
  margin: 10px;
}
.pdfContainer a {
  
  color: #FFFFFF;
  text-decoration: none;
}
button:hover {
  background: #1E7E34;
  transition: .5s;
}
.pdfContainer a:hover {
  background: #1E7E34;
  transition: .5s;
}

  .pdfContainer {
    display: absolute;
    top: 22px;
    right: 25px;
  }
 .naslov {
  text-align: center;
  margin: 20px;
 }
 th {
    text-align: center;
    vertical-align: middle;
  }

  td {
    text-align: center;
    vertical-align: middle;
  }



`

export default PostSt;