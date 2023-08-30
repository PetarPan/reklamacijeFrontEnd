import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import FormSt from "../styledComponents/FormSt.style";
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
      ]),
    compliantNature: Yup.string()
      .required("Obavezan je odabir tipa reklamacije")
      .oneOf([
        "Nema gasa",
        "Curenje gasa",
        "Neocitano stanje",
        "Deblokada regulatora",
        "Havarija",
        "Primedba na obracun",
      ]),
    justifiedComplaint: Yup.string()
      .required("Obavezan je odabir opravdanosti reklamacije")
      .oneOf(["Da", "Ne"]),
    compliantEnd: Yup.string()
      .required("Obavezan je odabir statusa zakljucenosti reklamacije")
      .oneOf(["Da", "Ne"]),
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
    <FormSt>
      <div className='formContainer'>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}>
          <Form>
            <label>Sifra kupca: </label> <br></br>
            <ErrorMessage name='buyerAccount' component='span' />
            <Field
              id='inputCreatePost'
              name='buyerAccount'
              placeholder='(Unesite sifru kupca)'
            />
            <br></br>
            <label>Ime kupca: </label>
            <br></br>
            <ErrorMessage name='buyerName' component='span' />
            <Field
              id='inputCreatePost'
              name='buyerName'
              placeholder='(Ex. Pera Peric)'
            />
            <br></br>
            <label>Adresa: </label>
            <br></br>
            <ErrorMessage name='address' component='span' />
            <Field
              id='inputCreatePost'
              name='address'
              placeholder='(Ex. Mileve Maric 2/3)'
            />
            <br></br>
            <label>Grad: </label>
            <br></br>
            <ErrorMessage name='city' component='span' />
            <Field
              id='inputCreatePost'
              name='city'
              placeholder='(Ex.Beograd)'
            />
            <br></br>
            <label>Nacin podnosenja reklamacije: </label>
            <br></br>
            {/* <ErrorMessage name='typeOfCompliantSend' component='span' /> */}
            <Field
              id='inputCreatePost'
              name='typeOfCompliantSend'
              placeholder='(Ex. ovde ide lista opcija)'
              as='select'>
              <option value='' disabled>
                Odaberi tip nacin prijema reklamacije
              </option>
              <option value='Telefonskim putem'>Telefonskim putem</option>
              <option value='Putem mejla'>Putem mejla</option>
              <option value='Putem Vibera'>Putem Vibera</option>
              <option value='Kontakt centar Sektora trgovine'>
                Kontakt centar Sektora trgovine
              </option>
              <option value='Putem poste'>Putem poste</option>
            </Field>
            <br></br>
            <label>Tip reklamacije: </label>
            <br></br>
            {/* <ErrorMessage name='compliantNature' component='span' /> */}
            <Field
              id='inputCreatePost'
              name='compliantNature'
              placeholder='(Ex.ovde ide lista opcija)'
              as='select'>
              <option value='' disabled>
                Odaberi tip reklamacije
              </option>
              <option value='Nema gasa'>Nema gasa</option>
              <option value='Curenje gasa'>Curenje gasa</option>
              <option value='Neocitano stanje'>Neocitano stanje</option>
              <option value='Deblokada regulatora'>Deblokada regulatora</option>
              <option value='Havarija'>Havarija</option>
              <option value='Primedba na obracun'>Primedba na obracun</option>
            </Field>
            <br></br>
            <label>Datum prijema reklamacije: </label>
            <br></br>
            {/*  <ErrorMessage name='recieveCompliantDate' component='span' /> */}
            <Field
              id='inputCreatePost'
              name='recieveCompliantDate'
              placeholder='(Ex. datum)'
              type='date'
            />
            <br></br>
            <label>Datum zatvaranja reklamacije: </label>
            <br></br>
            {/* <ErrorMessage name='endCompliantDate' component='span' /> */}
            <Field
              id='inputCreatePost'
              name='endCompliantDate'
              placeholder='Ex. datum'
              type='date'
            />
            <br></br>
            <label>Opravdanost:</label>
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
              <option value='Da'>Da</option>
              <option value='Ne'>Ne</option>
            </Field>{" "}
            <br></br>
            <label>Zaključeno :</label>
            <br></br>
            <Field
              id='inputCreatePost'
              name='compliantEnd'
              placeholder='Ex.ovde ide lista opcija'
              as='select'>
              <option value='' disabled>
                Da li je reklamacija zatvorena?
              </option>
              <option value='Da'>Da</option>
              <option value='Ne'>Ne</option>
            </Field>{" "}
            <br></br>
            <label>Odgovor na reklamaciju : </label>
            <br></br>
            <ErrorMessage name='note' component='span' />
            <Field
              as='textarea'
              id='inputCreatePost'
              name='note'
              placeholder='Odgovor na reklamaciju'
            />
            <br></br>
            <br></br>
            <button type='submit'>Napravi reklamaciju</button>
          </Form>
        </Formik>
      </div>
    </FormSt>
  );
}

export default CreatePost;
