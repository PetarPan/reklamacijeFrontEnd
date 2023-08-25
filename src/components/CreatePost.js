/** @format */

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
    /* title: Yup.string().required("Polje Naslov je obavezno!"),
    postText: Yup.string().required(), */
  });

  let history = useHistory();

  const onSubmit = (data) => {
    axios
      .post("http://localhost:3002/posts", data, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        history.push("/");
      }).catch((error) => {
        console.error("Error creating post:", error);
      }
      );
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
            <label>Sifra kupca: </label>
            <ErrorMessage name='buyerAccount' component='span' />
            <Field
              id='inputCreatePost'
              name='buyerAccount'
              placeholder='(Unesite sifru kupca)'
            />
            <br></br>
            <label>Ime kupca: </label>
            <ErrorMessage name='buyerName' component='span' />
            <Field
              id='inputCreatePost'
              name='buyerName'
              placeholder='(Ex. Pera Peric)'
            />
            <br></br>
            <label>Adresa: </label>
            <ErrorMessage name='address' component='span' />
            <Field
              id='inputCreatePost'
              name='address'
              placeholder='(Ex. Mileve Maric 2/3)'
            />
            <br></br>
            <label>Grad: </label>
            <ErrorMessage name='city' component='span' />
            <Field
              id='inputCreatePost'
              name='city'
              placeholder='(Ex.Beograd)'
            />
            <br></br>
            <label>Nacin podnosenja reklamacije: </label>
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
              <option value='Kontakt centar Sektora trgovine'>Kontakt centar Sektora trgovine</option>
              <option value='Putem poste'>Putem poste</option>
            </Field>
            <br></br>
            <label>Tip reklamacije: </label>
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
           {/*  <ErrorMessage name='recieveCompliantDate' component='span' /> */}
            <Field
              id='inputCreatePost'
              name='recieveCompliantDate'
              placeholder='(Ex. datum)'
              type='date'
            />
            <br></br>
            <label>Datum zatvaranja reklamacije: </label>
            {/* <ErrorMessage name='endCompliantDate' component='span' /> */}
            <Field
              id='inputCreatePost'
              name='endCompliantDate'
              placeholder='(Ex. datum)'
              type='date'
            />
            <br></br>
            <label>Odgovor na reklamaciju : </label>
            <ErrorMessage name='note' component='span' />
            <Field
              id='inputCreatePost'
              name='note'
              placeholder='(Odgovor na reklamaciju)'
            />
            <label>Opravdano :</label>
            {/* <ErrorMessage name='justifiedComplaint' component='span' /> */}
            <Field
              id='inputCreatePost'
              name='justifiedComplaint'
              placeholder='(Ex.ovde ide lista opcija)'
              as='select'>
              <option value='' disabled>
                Da li je reklamacija opravdana?
              </option>
              <option value='Da'>Da</option>
              <option value='Ne'>Ne</option>
            </Field> <br></br>
            <label>Zaključeno :</label>
            <Field
              id='inputCreatePost'
              name='compliantEnd'
              placeholder='(Ex.ovde ide lista opcija)'
              as='select'>
              <option value='' disabled>
                Da li je reklamacija zatvorena?
              </option>
              <option value='Da'>Da</option>
              <option value='Ne'>Ne</option>
            </Field> <br></br>
            <button type='submit'>Napravi reklamaciju</button>
          </Form>
        </Formik>
      </div>
    </FormSt>
  );
}

export default CreatePost;
