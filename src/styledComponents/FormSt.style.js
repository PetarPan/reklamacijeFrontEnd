import styled from 'styled-components';

const HomeSt = styled.div`

    .createPostPage {
  font-family: Arial, Helvetica, sans-serif;
  width: 100vw;
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.formContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 500px;
  height: auto;
  padding: 20px;
  border: 5px solid dodgerblue;
  border-radius: 5px;
  margin:0 auto;
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

.formContainer .button {
  margin:0 auto;
  margin-top: 10px;
  height: 40px;
  width: 100px;
  border: none;
  background-color: lightskyblue;
  border-radius: 5px;
  color: white;
}

.formContainer button:hover {
  cursor: pointer;
  background-color: dodgerblue;
}

span {
  color: red;
}
    
`

export default HomeSt;