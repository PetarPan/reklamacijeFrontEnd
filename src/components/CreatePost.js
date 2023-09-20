/** @format */

import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import FormSt from "../styledComponents/FormSt.style";
import {
  selectOptionsCreatePost,
  selectOptionComplaintType,
} from "../constants";
import { Helmet, HelmetProvider } from "react-helmet-async";

function CreatePost() {
  const initialValues = {
    buyerAccount: "",
    buyerName: "",
    address: "",
    city: "",
    typeOfCompliantSend: "",
    compliantNature: "",
    recieveCompliantDate: "",
    endCompliantDate: "",
    note: "",
    justifiedComplaint: "",
    compliantEnd: "",
  };

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      history.push("/login");
    }
  }, []);

  const validationSchema = Yup.object().shape({
    buyerAccount: Yup.string()
      .required("Polje sifra kupca je obavezno")
      .min(12, "Polje mora da ima najmanje i najvise 12 karaktera")
      .max(12, "Polje mora da ima najmanje i najvise 12 karaktera"),
    buyerName: Yup.string().required("Polje naziv kupca je obavezno"),
    address: Yup.string().required("Polje adresa kupca je obavezno"),
    city: Yup.string().required("Polje grad kupca je obavezno"),
    note: Yup.string()
      .required("Odgovor na reklamaciju je obavezno polje")
      .min(20, "Polje mora da ima najmanje 20 karaktera"),
    recieveCompliantDate: Yup.date().required("Obavezan je odabir datuma"),
    endCompliantDate: Yup.date().required("Obavezan je odabir datuma"),
    typeOfCompliantSend: Yup.string()
      .required("Obavezan je odabir nacina podnosenja reklamacije")
      .oneOf([
        "Telefonskim putem",
        "Putem mejla",
        "Putem Vibera",
        "Kontakt centar Sektora trgovine",
        "Putem poste",
        "Lično"
      ]),
    compliantNature: Yup.string()
      .required("Obavezan je odabir tipa reklamacije")
      .oneOf([
        "Nema gasa",
        "Curenje gasa",
        "Neočitano stanje",
        "Deblokada regulatora",
        "Havarija",
        "Primedba na obračun",
        "Dotrajali ormarić"
      ]),
    justifiedComplaint: Yup.string()
      .required("Obavezan je odabir opravdanosti reklamacije")
      .oneOf(["Reklamacija je opravdana", "Reklamacija je neopravdana"]),
    compliantEnd: Yup.string()
      .required("Obavezan je odabir statusa zakljucenosti reklamacije")
      .oneOf(["Reklamacija je zaključena", "Reklamacija je nezaključena"]),
  });

  let history = useHistory();

  const onSubmit = (data, { resetForm }) => {
    axios
      .post("http://localhost:3002/posts", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        resetForm();
        //history.push("/");
      })
      .catch((error) => {
        console.error("Error creating post:", error);
      });
    console.log(data);
  };

  return (
    <HelmetProvider>
      <FormSt>
        <Helmet>
          <title>Napravi reklamaciju</title>
        </Helmet>
        {<h3 className='naslov'>Forma za kreiranje reklamacija</h3>}

        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}>
          {/*  <div className='formContainer'> */}
          <Form className='formContainer'>
            <div className='left'>
              <label>ŠIFRA KUPCA: </label> <br></br>
              <ErrorMessage name='buyerAccount' component='span' />
              <br></br>
              <Field
                id='inputCreatePost'
                name='buyerAccount'
                placeholder='(Unesite sifru kupca)'
              />
              <br></br>
              <label>IME KUPCA: </label>
              <br></br>
              <ErrorMessage name='buyerName' component='span' />
              <br></br>
              <Field
                id='inputCreatePost'
                name='buyerName'
                placeholder='(Ex. Pera Peric)'
              />
              <br></br>
              <label>ADRESA: </label>
              <br></br>
              <ErrorMessage name='address' component='span' />
              <br></br>
              <Field
                id='inputCreatePost'
                name='address'
                placeholder='(Ex. Mileve Maric 2/3)'
              />
              <br></br>
              <label>GRAD: </label>
              <br></br>
              <ErrorMessage name='city' component='span' />
              <br></br>
              <Field
                id='inputCreatePost'
                name='city'
                placeholder='(Ex.Beograd)'
              />
              <br></br>
              <label>NAČIN PODNOŠENJA REKLAMACIJE: </label>
              <br></br>
              <ErrorMessage name='typeOfCompliantSend' component='span' />
              <br></br>
              <Field
                id='inputCreatePost'
                name='typeOfCompliantSend'
                placeholder='(Ex. ovde ide lista opcija)'
                as='select'>
                <option value='' disabled>
                  Izaberite način podnošenja reklamacije
                </option>
                {Object.entries(selectOptionsCreatePost).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
                {/*  <option value='' disabled>
                Odaberi tip nacin prijema reklamacije
              </option>
              <option value='Telefonskim putem'>Telefonskim putem</option>
              <option value='Putem mejla'>Putem mejla</option>
              <option value='Putem Vibera'>Putem Vibera</option>
              <option value='Kontakt centar Sektora trgovine'>
                Kontakt centar Sektora trgovine
              </option>
              <option value='Putem poste'>Putem poste</option> */}
              </Field>
              <br></br>
            </div>
            <div className='right'>
              <label>TIP REKLAMACIJE: </label>
              <br></br>
              <ErrorMessage name='compliantNature' component='span' />
              <br></br>
              <Field
                id='inputCreatePost'
                name='compliantNature'
                placeholder='(Ex.ovde ide lista opcija)'
                as='select'>
                <option value='' disabled>
                  Izaberite tip reklamacije
                </option>
                {Object.entries(selectOptionComplaintType).map(
                  ([key, value]) => (
                    <option key={key} value={key}>
                      {value}
                    </option>
                  )
                )}
                {/* <option value='' disabled>
                Odaberi tip reklamacije
              </option>
              <option value='Nema gasa'>Nema gasa</option>
              <option value='Curenje gasa'>Curenje gasa</option>
              <option value='Neocitano stanje'>Neocitano stanje</option>
              <option value='Deblokada regulatora'>Deblokada regulatora</option>
              <option value='Havarija'>Havarija</option>
              <option value='Primedba na obracun'>Primedba na obracun</option> */}
              </Field>
              <br></br>
              <label>DATUM PRIJEMA: </label>
              <br></br>
              <ErrorMessage name='recieveCompliantDate' component='span' />
              <br></br>
              <Field
                id='inputCreatePost'
                name='recieveCompliantDate'
                placeholder='(Ex. datum)'
                type='date'
              />
              <br></br>
              <label>DATUM REŠAVANJA: </label>
              <br></br>
              <ErrorMessage name='endCompliantDate' component='span' />
              <br></br>
              <Field
                id='inputCreatePost'
                name='endCompliantDate'
                placeholder='Ex. datum'
                type='date'
              />
              <br></br>
              <label>OPRAVDANOST:</label>
              <br></br>
              {/* <ErrorMessage name='justifiedComplaint' component='span' /> */}
              <Field
                id='inputCreatePost'
                name='justifiedComplaint'
                placeholder='Ex.ovde ide lista opcija'
                as='select'>
                <option value='' disabled>
                  Da li je reklamacija opravdana?
                </option>
                <option value='Reklamacija je opravdana'>Reklamacija je opravdana</option>
                <option value='Reklamacija je neopravdana'>Reklamacija je neopravdana</option>
              </Field>{" "}
              <br></br>
              <label>ZAKLJUČENO :</label>
              <br></br>
              <Field
                id='inputCreatePost'
                name='compliantEnd'
                placeholder='Ex.ovde ide lista opcija'
                as='select'>
                <option value='' disabled>
                  Da li je reklamacija zatvorena?
                </option>
                <option value='Reklamacija je zaključena'>Reklamacija je zaključena</option>
                <option value='Reklamacija je nezaključena'>Reklamacija je nezaključena</option>
              </Field>{" "}
              <br></br>
              <label>Odgovor na reklamaciju : </label>
              <br></br>
              <ErrorMessage name='note' component='span' />
              <br></br>
              <Field
                as='textarea'
                id='inputCreatePost'
                name='note'
                placeholder='Odgovor na reklamaciju'
              />
              <br></br>
              <br></br>
              <button className='btn-make-post' type='submit'>
                Napravi reklamaciju
              </button>
            </div>
          </Form>
        </Formik>
      </FormSt>
    </HelmetProvider>
  );
}

export default CreatePost;
