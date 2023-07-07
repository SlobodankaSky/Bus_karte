import React from "react";
import { useState } from "react";
import bus1 from "../../images/bus1.jpg";
import "./pocetna.css";


import './i18n'; // za prevodjenje
import '../../rezervacije/i18n';
import { useTranslation, Trans } from 'react-i18next';    //prevodjenje

import { useMediaQuery } from 'react-responsive';         // responsive
import MediaQuery from 'react-responsive';

const Pocetna_nova = () => {

    //prevodjenje
    const lngs = {
        en: { nativeName: 'Engleski' }, 
        de: { nativeName: 'Srpski' }
    };
    const { t, i18n } = useTranslation();
    // prevodjenje 


    /* za radio button kod vrsta karte   */

    const [karta, setKarta] = useState("single");
    
    // this function will be called when a radio button is checked
    const handleKarta = (e) => {
        setKarta(e.target.value);
    }
    

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


    return (

        <div >

        <div style={{ backgroundImage: `url(${bus1})`, backgroundRepeat: "no-repeat", backgroundSize: "contain", height: "30rem",  opacity: "160%"}}>

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

            <div className="okvir1" >        {/*  home-page   */}
            <h3 className="h3-card">
                <i className="fa fa-bus" style={{color: "darkblue"}}></i>
                <span className="span"><Trans i18nKey="description.part30"> Pronađite liniju </Trans> </span>
            </h3>
        {/*    </div>        */}
            
        {/*    </div>       */}


            {/*   povratna karta    */}
          <form className="form1" >
          <fieldset  className="belo">
          <legend style={{color: "darkblue", padding: "1rem", textAlign:"center"}}><Trans i18nKey="description.part72">Odaberite vrstu karte</Trans></legend>

          <input type="radio" name="karta"  id="single" value="single" 
          onChange={handleKarta} checked={karta === 'single'} />&ensp;<Trans i18nKey="description.part24">Jedan smer </Trans>
          &nbsp;&ensp;&emsp;
          
          <input type="radio" name="karta" id="return" value="return" 
          onChange={handleKarta} checked={karta === 'return'} />&ensp;<Trans i18nKey="description.part25">Povratna </Trans>
          
          </fieldset>
          &nbsp;
          <br/><br/>
          
          </form>

        </div>

        </div>
        
        </div>
      );
}
 
export default Pocetna_nova;