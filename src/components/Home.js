/** @format */

import "react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
/* import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorderIcon"; */
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
//import defaultSorted from "react-bootstrap-table2-paginator";
//import cellEditFactory, {Type} from "react-bootstrap-table2-editor";
import filterFactory, {
  textFilter,
  selectFilter /* dateFilter  */,
} from "react-bootstrap-table2-filter";
import {
  selectOptionComplaintType,
  selectOptionsCreatePost,
} from "../constants";
import HomeTable from "../styledComponents/HomeTable.style";
import moment from "moment";
import { Helmet, HelmetProvider } from "react-helmet-async";

function Home() {
  const [listOfPosts, setListOfPosts] = useState([]);
  let history = useHistory();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      history.push("/login");
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
      filter: textFilter({
        placeholder: "01xx-xxxxx-xx",
      }),
    },
    {
      dataField: "buyerName",
      text: "Naziv kupca",
      sort: true,
      filter: textFilter({
        placeholder: "Pera Perić",
      }),
    },
    {
      dataField: "address",
      text: "Adresa",
      sort: true,
    },
    {
      dataField: "city",
      text: "Grad",
      sort: true,
    },
    {
      dataField: "typeOfCompliantSend",
      text: "Nacin prijema",
      sort: true,
      formatter: (cell) => selectOptionsCreatePost[cell],
      filter: selectFilter({
        options: selectOptionsCreatePost,
        placeholder: "Odaberi iz liste",
      }),
    },
    {
      dataField: "compliantNature",
      text: "Vrsta reklamacije",
      sort: true,
      formatter: (cell) => selectOptionComplaintType[cell],
      filter: selectFilter({
        options: selectOptionComplaintType,
        placeholder: "Odaberi iz liste",
      }),
    },
    {
      dataField: "recieveCompliantDate",
      text: "Datum prijema",
      sort: true,
      formatter: (cellContent) => {
        return cellContent.substring(0, 10);
      },
      /*       filter: dateFilter(),
       */
    },
    {
      dataField: "endCompliantDate",
      text: "Datum resavanja",
      sort: true,
      formatter: (cellContent) => {
        return cellContent.substring(0, 10);
      },
      /* filter: dateFilter(), */
    },
    {
      dataField: "",
      text: "Vreme rešavanja",
      text: "Vreme rešavanja",
      formatter: (cell, row) => {
        const receiveDate = moment(row.recieveCompliantDate, "YYYY-MM-DD");
        const endDate = moment(row.endCompliantDate, "YYYY-MM-DD");
        let resolutionTime = endDate.diff(receiveDate, "days"); // Računanje razlike u danima
        resolutionTime = resolutionTime === 1 ? '1 dan' : resolutionTime + 'dana';
        return resolutionTime
      },
      sort: true,
    },
    {
      dataField: "note",
      sort: true,
      text: "Odgovor",
      filter: textFilter({
        className: "react-bootstrap-table filter-text",
        delay: 5000,
      }),
    },
    {
      dataField: "justifiedComplaint",
      sort: true,
      text: "Opravdano",
    },
    {
      dataField: "compliantEnd",
      sort: true,
      text: "Zaključeno",
    },
  ];
  const handleRowClick = (row) => {
    // history.push(`/post/${row.id}/${row.resolutionTime}`);
    history.push(`/post/${row.id}`); // Navigacija na stranicu za uređivanje

  };
  return (
    <HelmetProvider>
      <div>
        <HomeTable>
          <Helmet>
            <title>Početna strana</title>
          </Helmet>
          <BootstrapTable
            keyField='id'
            className='table table-striped table-bordered table-hover table-sm table-responsive react-bootstrap-table filter-text '
            data={listOfPosts}
            columns={columns}
            responsive
            bordered
            striped
            hover
            condensed
            noDataIndication='Nisu se uspešno učitali podaci'
            defaultSorted={[{dataField: 'recieveCompliantDate', order: 'desc'}]}
            pagination={paginationFactory()}
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
        </HomeTable>
      </div>
    </HelmetProvider>
  );
}

export default Home;
