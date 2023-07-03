import { useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import RegistrationLogic from "./registration.logic";
import classes from "./registration.module.css";
import "react-toastify/dist/ReactToastify.css";


import { useTranslation, Trans } from 'react-i18next';    //prevodjenje
import '../NavBar/links/i18n';
import '../../components/NavBar/links/i18n';

const RegistrationComponent = () => {
  let [formInputsValid, setFormInputsValid] = useState({
    name: true,
    prezime: true,
    email: true,
    korisnickoIme: true,
    lozinka: true,
    brojTelefona: true,
  });
  const registrationLogic = RegistrationLogic();

  const fNameInputRef = useRef();
  const prezimeInputRef = useRef();
  const korisnickoImeInputRef = useRef();
  const emailInputRef = useRef();
  const brojTelefonaInputRef = useRef();
  const lozinkaInputRef = useRef();

  const confirmeHandler = (event) => {
    event.preventDefault();

    const formValidation = registrationLogic.formValidation(
      fNameInputRef,
      prezimeInputRef,
      emailInputRef,
      korisnickoImeInputRef,
      lozinkaInputRef,
      brojTelefonaInputRef
    );
    setFormInputsValid({
      name: formValidation.validName,
      prezime: formValidation.validPrezime,
      email: formValidation.validEmail,
      korisnickoIme: formValidation.validKorisnickoIme,
      brojTelefona: formValidation.validPhone,
      lozinka: formValidation.validLozinka,
    });
    if (!formValidation.isFormValid) {
      return;
    }

    registrationLogic.registracija();
  };

   //prevodjenje start
   const lngs = {
    en: { nativeName: 'Engleski' }, 
    de: { nativeName: 'Srpski' }
    };
    const { t, i18n } = useTranslation();
    // prevodjenje end

  return (
    <>
      {/*  header je deo za prevodjenje*/}
      <header>
        <div style={{textAlign:"right", marginRight:"3rem"}}>
          {Object.keys(lngs).map((lng) => (
            <button key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit" onClick={() => i18n.changeLanguage(lng)}>
              {lngs[lng].nativeName}
            </button>
          ))}
        </div>
        </header> 

      <form onSubmit={confirmeHandler} className={classes.form}>
        <div
          className={`${classes.control} ${
            formInputsValid.name ? "" : classes.invalid
          }`}
        >
          <label className="labela"><Trans i18nKey="description.part40">Ime :</Trans></label>
          <input
            type="text"
            name="ime"
            onChange={registrationLogic.changeHandler}
            ref={fNameInputRef}
          />
          {!formInputsValid.name && <p><Trans i18nKey="description.part41">Unesite ime</Trans></p>}
        </div>
        <div
          className={`${classes.control} ${
            formInputsValid.prezime ? "" : classes.invalid
          }`}
        >
          <label className="labela"><Trans i18nKey="description.part42">Prezime:</Trans></label>
          <input
            type="text"
            name="prezime"
            ref={prezimeInputRef}
            onChange={registrationLogic.changeHandler}
          />
          {!formInputsValid.prezime && <p><Trans i18nKey="description.part43">Unesite prezime</Trans></p>}
        </div>
        <div
          className={`${classes.control} ${
            formInputsValid.korisnickoIme ? "" : classes.invalid
          }`}
        >
          <label className="labela"><Trans i18nKey="description.part44">Korisničko ime:</Trans></label>
          <input
            type="text"
            name="korisnickoIme"
            ref={korisnickoImeInputRef}
            onChange={registrationLogic.changeHandler}
          ></input>
          {!formInputsValid.korisnickoIme && <p><Trans i18nKey="description.part45">Unesite korisničko ime</Trans></p>}
        </div>
        <div
          className={`${classes.control} ${
            formInputsValid.lozinka ? "" : classes.invalid
          }`}
        >
          <label className="labela"><Trans i18nKey="description.part46">Lozinka:</Trans></label>
          <input
            type="password"
            name="lozinka"
            ref={lozinkaInputRef}
            onChange={registrationLogic.changeHandler}
          ></input>
          {!formInputsValid.lozinka && <p><Trans i18nKey="description.part47">Unesite lozinku</Trans></p>}
        </div>
        <div
          className={`${classes.control} ${
            formInputsValid.brojTelefona ? "" : classes.invalid
          }`}
        >
          <label className="labela"><Trans i18nKey="description.part48">Broj telefona:</Trans></label>
          <input
            type="text"
            name="brojTelefona"
            ref={brojTelefonaInputRef}
            onChange={registrationLogic.changeHandler}
          ></input>
          {!formInputsValid.brojTelefona && <p><Trans i18nKey="description.part49">Unesite broj telefona</Trans></p>}
        </div>
        <div
          className={`${classes.control} ${
            formInputsValid.email ? "" : classes.invalid
          }`}
        >
          <label className="labela"><Trans i18nKey="description.part50">E-mail:</Trans></label>
          <input
            type="email"
            name="email"
            ref={emailInputRef}
            onChange={registrationLogic.changeHandler}
          ></input>
          {!formInputsValid.email && <p><Trans i18nKey="description.part51">Unesite e-mail</Trans></p>}
        </div>
        <br/>
        <div>
          <button className={classes.submit} ><Trans i18nKey="description.part52">Registruj se</Trans></button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default RegistrationComponent;
