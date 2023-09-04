import styled from "styled-components";

const HomeTable = styled.div`
  th {
    text-align: center;
    vertical-align: middle;
  }

  td {
    text-align: center;
    vertical-align: middle;
  }
  input {
    margin: 0 auto;
    
  }

  select {
    margin: 0 auto;
  }

  /* Sledece tri klase sakrivaju "Filter By u zaglavlju tabele, mnogo dobra fora, svaka cast onome ko je provali" */
.react-bootstrap-table .filter-text {
  display: none; 
}
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  border: 0;
}
`;

export default HomeTable;
