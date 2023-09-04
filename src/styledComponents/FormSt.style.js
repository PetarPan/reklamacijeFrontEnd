import styled from 'styled-components';

const FormSt = styled.div`

 
.formContainerLogin {
  display: flex;
  flex-direction: column; 
  justify-content: center; 
  align-items: center; 
  border: 5px solid dodgerblue;
  border-radius: 5px;
  margin: 0 auto;
  margin-top: 25px;
  width: 30rem;
  padding: 30px;
}

.formContainer {
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  width: 50em;
  height: 595px; 
  border: 5px solid dodgerblue;
  border-radius: 5px;
  margin: 0 auto;
 
}


.formContainer input {
  height: 40px;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 2px solid grey;
  border-radius: 5px;
  padding-left: 10px;
  font-size: 20px;
}

/* .textarea {
  width: 1000px; 
} */
span {
  color: red;
}
    
button {
  /* height: 100%; */
  display: block;
  font-size: 1.2rem;
  width: 200 px;
  background: #28A745;
  color: #FFFFFF;
  border-radius: 10px;
  cursor: pointer;
  margin: 0 auto;
}

button:hover {
  background: #1E7E34;
  transition: .5s;
}

.naslov {
  text-align: center;
  margin: 15px; 
}

.left {
  position: absolute;
  top: 10px;
  left: 10px;
}

.right {
  position: absolute;
  top: 10px;
  right: 10px;
}


`

export default FormSt;