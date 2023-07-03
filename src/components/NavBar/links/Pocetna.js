import React, { useState, useEffect } from "react";
import LinijeApi from "../../../api/linije.api";
import "./pocetna.css";
import helpers from "../../../helpers/helpers";
import { Link } from "react-router-dom";
import bus1 from '../../images/bus1.jpg'
import bus2 from '../../images/bus2.jpg'

import './i18n'; // za prevodjenje
import '../../rezervacije/i18n';
import { useTranslation, Trans } from 'react-i18next';    //prevodjenje

import { useMediaQuery } from 'react-responsive';         // responsive
import MediaQuery from 'react-responsive';

const Pocetna = () => {

  //prevodjenje
  const lngs = {
      en: { nativeName: 'Engleski' }, 
      de: { nativeName: 'Srpski' }
  };
  const { t, i18n } = useTranslation();
  // prevodjenje 

  const isDesktop = useMediaQuery({ minWidth: 1092 });               //za responsive bilo 992
  const isDesktopSmall = useMediaQuery({minWidth: 920});
  const isTablet = useMediaQuery({ minWidth: 600, maxWidth: 991 });
  const isSmallTablet = useMediaQuery({minWidth: 481, maxWidth: 599});    
  const isMobile = useMediaQuery({ maxWidth: 480 });                // responsive


  const [filteredLinije, setFilteredLinije] = useState([]);
  const [valueDate, setValueDate] = useState("");
  const [val1, setVal1] = useState("");
  const [val2, setVal2] = useState("");
  const [polasci, setPolasci] = useState([]);
  const [dolasci, setDolasci] = useState([]);
  const [linije, setLinije] = useState([]);

  const[valueDateReturn, setValueDateReturn] = useState("");    /* za povratnu    */
  const[filteredPovratna, setFilteredPovratna]=useState("");    /* za povratnu    */
 /* const [valueDatePovratna, setValueDatePovratna] = useState("");   /*za povratnu   */
 
  /* za povratnu liniju sam dodala ovu fju dole     */
  const filterLinija = async () => {
    if (!valueDate) return;

    const response = await LinijeApi().filterLinija(val1, val2, valueDate);
    const data = await response.json();
    setFilteredLinije(data);
    
  };

  const filterPovratak = async () => {
    if (!valueDate) return;

    const odziv=await LinijeApi().filteredPovratna(val2, val1, valueDate);    /* za povratnu    */
    const podaci = await odziv.json();    /* za povratnu    */
    setFilteredPovratna(podaci);     /* za povratnu     */    
  };



  const getLinije = async () => {
    const response = await fetch("http://localhost:5000/linije/linija"); //izvlacenje svih linija iz baze
    const data = await response.json(); //
    const mestaPolaska = data //
      .map((item) => item.mestoPolaska) //Uradjen filter da se u selektu ne ponavljaju linije
      .filter(helpers.filterUnique); // za mesto polaska
    const mestaDolaska = data //
      .map((item) => item.mestoDolaska) //Uradjen filter da se u selektu ne ponavljaju linije
      .filter(helpers.filterUnique); //za mesto dolaska

    setLinije(data);
    setPolasci(mestaPolaska);
    setDolasci(mestaDolaska);
    setVal1(data[0].mestoPolaska);
    setVal2(data[0].mestoDolaska);

  };







  useEffect(() => {
    //
    getLinije(); //Prilikom ucitavanja stranice da pozove funkciju get linije
  }, []); //

  const click = () => {
    //ovde mozes upit da napravis da li se val 1 sadrzi u dolasci
    // i da li se val 2 sadrzi u polasci
    // primer polasci.includes(val2)

    if (!polasci.includes(val2) || !dolasci.includes(val1)) {
      //zamena mesta polja mesto dolaska i mesto polaska
      return;
    }
    setVal1(val2);
    setVal2(val1);
  };

  const [showClass, setShowClass] = useState(false);

  const changer = () => {
    setShowClass(!showClass);
  };

  const clickBait = (event) => {
    filterLinija();
    changer();
  };


  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [bus1, bus2];

  useEffect(() => {
    const interval = setInterval(() => {
      // Promijeni slajd na sledeći
      setCurrentSlide(prevSlide => (prevSlide + 1) % slides.length);
    }, 10000); // Promjena slike svakih 5 sekundi

    return () => {
      clearInterval(interval); // Očisti interval kad se komponenta unmountuje
    };
  }, []);
  

  let showDate = new Date();
  let displayTodaysDate =
    showDate.getDate() +
    "/" +
    (showDate.getMonth() + 1) +
    "/" +
    showDate.getFullYear;

  const vremePuta = (linija) => {
    const datumPolaska = new Date(linija.datumPolaska);
    const vremePolaska = linija.vremePolaska.split(":");
    datumPolaska.setHours(vremePolaska[0]);
    datumPolaska.setMinutes(vremePolaska[1]);

    const datumDolaska = new Date(linija.datumPolaska);
    const vremeDolaska = linija.vremeDolaska.split(":");
    datumDolaska.setHours(vremeDolaska[0]);
    datumDolaska.setMinutes(vremeDolaska[1]);

    const vremePuta = Math.abs(datumDolaska.getTime() - datumPolaska.getTime());

    const minuti = Math.floor((vremePuta % (1000 * 60 * 60)) / (1000 * 60));
    const sati = Math.floor(vremePuta / (1000 * 60 * 60));

    if (sati < 1) {
      return `${minuti} min`;
    } else {
      const sati1 = `${sati}h`;
      const min = `${minuti}m`;
      return [sati1, min].join(" : ");
    }
  };

  /* za radio button kod vrsta karte   */

  const [karta, setKarta] = useState("single");
  //const karta = false;
  
  // this function will be called when a radio button is checked
  const handleKarta = (e) => {
    setKarta(e.target.value);
  }

 // const [vidljivo, setVidljivo]=useState();
 //const vidljivo = true;

{/*

 function VrstaKarte(props){
  const karta=props.karta;
  //const pom[]=useState();

  if(karta=='single'){
    pom=false;
    return pom ;          
  }else{
    pom=true;
    return pom;
  }

}

function VrstaKarte_1(props){
  const karta=props.karta;

  if(karta=='single'){
    return <p> jedan smer karta  </p>   
  }else{
    return <p>povratni smer karta </p>
  }

}

*/}

function VrstaKarte_2(props){
  const karta=props.karta;

  if(karta=='return'){
    return <div className="form">
      <label className="labela"><Trans i18nKey="description.part70"> Datum povratka </Trans></label>
      <div className="input-date"> 
      <input
                type="date"
                className="dates"
                value={valueDateReturn}
                onChange={(e) => setValueDateReturn(e.target.value)}
              />
      </div>   
      </div>
  }

}


function VrstaKarte_2mala(props){
  const karta=props.karta;

  if(karta=='return'){
    return <div className="form">
      <label ><Trans i18nKey="description.part70"> Datum povratka </Trans></label>
      <div className="input-date">    {/* input-date */}
      
      <input
                type="date"
                className="dates"
                style={{width: "100%"}}
                value={valueDateReturn}
                onChange={(e) => setValueDateReturn(e.target.value)}
              />
      
      </div>   
      </div>
  }

}


function PovratnaKarta(props){
  const karta=props.karta;

  if(karta=='return'){
    return <div>
      
      <div style={{marginTop: "3rem"}}> 
      
      <h2 className="card-header">
            <i className="fa-solid fa-bus"></i>
            <span className="span"><Trans i18nKey="description.part71"> Red vožnje povratne linije
            </Trans></span>
      </h2>
      
      </div>   
      </div>
  }

}

function StampajPovratke(props){
  return "linijeee";
}


{/*  ovo bila samo mala proba */}
function Povratak(props){
  const karta1=props.karta;

  if(karta1=='return'){
    return
      <div>
        <div>
  {/*      <p style={{color: "red", fontWeight: "bolder"}}> Stampam  red vožnje za povratnu kartu </p>    */}
        Daka ovde !!!
        </div>
      </div>
  }
}



  return (
    

    <div >
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

    <div >
    <div className="home-page" >
        <h2 className="h2-card">
          <i className="fa fa-bus"></i>
          <span className="span"><Trans i18nKey="description.part30"> Pronađite liniju </Trans></span>
        </h2>
        
        {isDesktop &&
        <div className="travel-look" >
          <div className="form">
            <label className="labela"><Trans i18nKey="description.part31"> Polazna stanica </Trans></label>
            <select
              className="box-title"
              value={val1}
              onChange={(e) => setVal1(e.target.value)}
            >
              {polasci.map((linija) => {
                return (
                  <option key={linija} value={linija}>
                    {linija}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="form">
            <button
              className="fa-solid fa-repeat buttonSwitch "
              onClick={click}
            ></button>
          </div>

          <div className="form">
            <label className="labela"><Trans i18nKey="description.part32"> Dolazna stanica </Trans></label>
            <select
              className="box-title"
              value={val2}
              onChange={(e) => setVal2(e.target.value)}
            >
              {dolasci.map((linija) => {
                return (
                  <option key={linija} value={linija}>
                    {linija}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="form" >
            <label className="labela"><Trans i18nKey="description.part33"> Datum polaska </Trans></label>
            <div className="input-date">       
              <input
                type="date"
                className="dates"
                value={valueDate}
                onChange={(e) => setValueDate(e.target.value)}
              />
            </div>
          </div>

          <div className="form-button">
            <button onClick={clickBait} className="buttonSwitch">
            <Trans i18nKey="description.part34"> Red vožnje </Trans>
            </button>
          </div>


          {/*   povratna karta    */}
          <form className="form" style={{width: "20rem"}}>
          <fieldset >
          <legend style={{color: "darkblue", padding: "1rem", textAlign:"center"}}><Trans i18nKey="description.part72">Odaberite vrstu karte</Trans></legend>

          <input type="radio" name="karta"  id="single" value="single" 
          onChange={handleKarta} checked={karta === 'single'} />&ensp;<Trans i18nKey="description.part24">Jedan smer </Trans>
          &nbsp;&ensp;&emsp;
          
          <input type="radio" name="karta" id="return" value="return" 
          onChange={handleKarta} checked={karta === 'return'} />&ensp;<Trans i18nKey="description.part25">Povratna </Trans>
          
          </fieldset>
          </form>

          <div>&nbsp;</div>

          <div className="form" >
            {/*
            <label><Trans i18nKey="description.part70"> Datum povratka </Trans></label>
            <div className="input-date">       
              <input
                type="date"
                className="dates"
                value={valueDateReturn}
                onChange={(e) => setValueDateReturn(e.target.value)}
              />
            </div>
            */}
        {/*    {<VrstaKarte_1 karta={karta}/>}
            {<VrstaKarte karta={karta}/>? "povratna jeste" : "obicna jeste" }
        */}    
            {<VrstaKarte_2 karta={karta}/>}
        {/*    {<VrstaKarte_33 karta={karta}/>}   */}
            

           
          </div>
          
         
         

        {/* kraj bloka povratna karta */}
        </div>
        }
        

        {!isDesktop &&
        <div >
        
        <div className="form">
            <label><Trans i18nKey="description.part31"> Polazna stanica </Trans></label>
            <select
              className="box-title1"
              value={val1}
              onChange={(e) => setVal1(e.target.value)}
            >
              {polasci.map((linija) => {
                return (
                  <option key={linija} value={linija}>
                    {linija}
                  </option>
                );
              })}
            </select>
          </div>
            <br/>
          <div className="form">
            <button
              className="fa-solid fa-repeat buttonSwitch "
              onClick={click}
            ></button>
          </div>
              <br/>
          <div className="form">
            <label><Trans i18nKey="description.part32"> Dolazna stanica </Trans></label>
            <select
              className="box-title1"
              value={val2}
              onChange={(e) => setVal2(e.target.value)}
            >
              {dolasci.map((linija) => {
                return (
                  <option key={linija} value={linija}>
                    {linija}
                  </option>
                );
              })}
            </select>
          </div>  
        
          <br/>
        <div className="form">
            <label><Trans i18nKey="description.part33"> Datum polaska </Trans></label>
            <div  >       
              <input
                type="date"
                className="box-title1"
                value={valueDate}
                onChange={(e) => setValueDate(e.target.value)}
              />
            </div>
          </div>
            <br/>

          {/*   povratna karta    */}
          <form className="form" >
          <fieldset >
          <legend style={{color: "darkblue", padding: "1rem", textAlign:"center"}}><Trans i18nKey="description.part72">Odaberite vrstu karte</Trans></legend>

          <input type="radio" name="karta"  id="single" value="single" 
          onChange={handleKarta} checked={karta === 'single'} />&ensp;<Trans i18nKey="description.part24">Jedan smer </Trans>
          &nbsp;&ensp;&emsp;
          
          <input type="radio" name="karta" id="return" value="return" 
          onChange={handleKarta} checked={karta === 'return'} />&ensp;<Trans i18nKey="description.part25">Povratna </Trans>
          
          </fieldset>
          </form>

          <br/>

          <div className="form" >    
            {<VrstaKarte_2mala karta={karta}/>}
          </div><br/>

        {/* kraj bloka povratna karta */}

        <div className="form-button" style={{justifyContent: "center", fontWeight: "bolder"}}>
            <button onClick={clickBait} className="buttonSwitch" >
            <Trans i18nKey="description.part34"> Red vožnje </Trans>
            </button>
          </div>

        </div>
        }
        
      </div>

      <ul>
        <div className={`home-page1 .home-page1 ${showClass ? "show" : ""}`}>
          {" "}
          {/*kada se pretisne dugme otvorit se nov div sa ispisanim podacima*/}
          <style>{`
            .home-page1 {
              display: none;
            }
            .show {
              display: block;
            }
          `}</style>
          <h2 className="card-header">
            <i className="fa-solid fa-bus"></i>
            <span className="span"><Trans i18nKey="description.part34"> Red vožnje 
            </Trans></span>
          </h2>
          {isDesktop &&
          <div className="scroll">
            {filteredLinije.map((linija) => {
              return (
                <li key={linija.id}>
                  <div className="travel">
                    <div className="operator"> {linija.prevoznik}</div>
                    <div className="start">
                      <span className="start-time"> {linija.vremePolaska}</span>
                      <div className="start-destination">
                        {" "}
                        {linija.mestoPolaska}{" "}
                      </div>
                    </div>

                    <div className="travel-time">
                      <div className="time">
                        {/* {linija.vremeDolaska - linija.vremePolaska} */}
                        {vremePuta(linija)}
                      </div>
                      <div className="time-line"></div>
                      <div className="space"><Trans i18nKey="description.part36">Broj mesta </Trans></div>
                    </div>

                    <div className="end">
                      <div className="end-destination">
                        {" "}
                        {linija.mestoDolaska}
                      </div>
                      <span className="end-time"> {linija.vremeDolaska}</span>
                    </div>
                    <div>
                      <Link to={`${linija.id}/rezervacijakarte`}>
                        <button className="buttonSwitch1">
                        <Trans i18nKey="description.part35"> Rezerviši </Trans></button>
                      </Link>
                    </div>
                  </div>
                </li>
              );
            })}
           {<PovratnaKarta karta={karta}/>}
    {/*       {karta=='return'? "Red vožnje za povratnu liniju ": " "}      */}
           <br/>

           {filteredLinije.map((linija) => {
              return (
                <li key={linija.id}>
                  <div className="travel">
                    <div className="operator"> {linija.prevoznik}</div>
                    <div className="start">
                      <span className="start-time"> {linija.vremePolaska}</span>
                      <div className="start-destination">
                        {" "}
                        {linija.mestoPolaska}{" "}
                      </div>
                    </div>

                    <div className="travel-time">
                      <div className="time">
                        {vremePuta(linija)}
                      </div>
                      <div className="time-line"></div>
                      <div className="space"><Trans i18nKey="description.part36">Broj mesta </Trans></div>
                    </div>

                    <div className="end">
                      <div className="end-destination">
                        {" "}
                        {linija.mestoDolaska}
                      </div>
                      <span className="end-time"> {linija.vremeDolaska}</span>
                    </div>
                    <div>
                      <Link to={`${linija.id}/rezervacijakarte`}>
                        <button className="buttonSwitch1">
                        <Trans i18nKey="description.part35"> Rezerviši </Trans></button>
                      </Link>
                    </div>
                  </div>
                </li>
              );
            })}


    {/*       {StampajPovratke()}     */}

 


          </div>
          
          }

                    
          {!isDesktop &&
          
<div className="scroll">
            {filteredLinije.map((linija) => {
              return (
                <li key={linija.id}>
                {/*  <div style={{backgroundColor:"#f8f8f8", borderBlockStyle:"double", borderBlockColor: "#d1d1d1"}}> */}
                  <div className="travel1">                     {/* izbrisala klasu travel*/}
                    <br/>
                    <div  style={{fontStyle:"inherit", color: "darkblue", fontSize: "1.2rem", fontWeight: "bold"}}> {linija.prevoznik}</div>  {/*className="operator"*/}
                    <div className="start">           
                      
                      <div className="start-destination">             
                        {" "}
                        {linija.mestoPolaska}{" "}
                      </div>
                      <span className="start-time"> {linija.vremePolaska}</span>        
                    </div>

                    <div className="travel-time">
                      <div className="time">
                        {/* {linija.vremeDolaska - linija.vremePolaska} */}
                        {vremePuta(linija)}
                      </div>
                      <div className="time-line"></div>
                      <div className="space"><Trans i18nKey="description.part36">Broj mesta</Trans></div>
                    </div>

                    <div className="end">
                      <div className="end-destination">
                        {" "}
                        {linija.mestoDolaska}
                      </div>
                      <span className="end-time"> {linija.vremeDolaska}</span>
                    </div>
                    <div>
                      <Link to={`${linija.id}/rezervacijakarte`}>
                        <button className="buttonSwitch1" style={{marginLeft: "-1rem"}}><Trans i18nKey="description.part35">Rezerviši</Trans></button>
                      </Link>
                    </div>
                    <br/><br/>
                  </div>
                  <br/><br/>
                </li>
              );
            })}

          {<PovratnaKarta karta={karta}/>}
          </div>

          }
        </div>
          
      </ul>





      
      <div className="bus-container">
      <img src={slides[currentSlide]} alt="Slideshow" className="bus-image" style={{height: "auto"}}/>
      </div>
    </div>
    </div>
  );
};

export default Pocetna;
