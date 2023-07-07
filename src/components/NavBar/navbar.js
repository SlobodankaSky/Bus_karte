import React, { useState } from 'react';
import './main.css';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import logo from "../images/eurocompass.png";




const Navbar = () => {

  const [isMobile, setIsMobile] = useState(false);
 // const isDesktop = useMediaQuery({ minWidth: 890 });  /* dodala sn u ovom slucaju bitna je ta dimenzija   */
 // const isMobile = useMediaQuery({maxWidth:889});

    return (
      <nav className="navbar">
    {/*    <Link to='/pocetna' className='logo'><i className="fa fa-bus"></i></Link>      */}
        <Link to='/pocetna' ><img src={logo} alt="Eurocompass logo" style={{width:"80%", height: "80%"}}/> </Link>
        
        <ul className={isMobile ? "nav-links-mobile" : "nav-menu"}
        onClick={() => setIsMobile(false)}>
          <li><Link to='/adminpanel'><i className='fa-solid fa-users nav-links'></i>Admin panel</Link></li>
          <li><Link to='/pocetna'><i className='fa-solid fa-house-user nav-links'></i>Početna</Link></li>          
          <li><Link to='/pocetna_nova'><i className='fa-solid fa-house-user nav-links'></i>Početna nova</Link></li>
          <li><Link to='/kontakt'><i className='fa-solid fa-address-book nav-links'></i>Kontakt</Link></li>
          <li><Link to='/login.component'><i className='fa fa-user-circle nav-links'></i>Prijavi se</Link></li>
          </ul>
          <button className='mobile-menu-icon'
          onClick={() => setIsMobile(!isMobile)}>
            {isMobile ? (<i className='fas fa-times'></i> ) 
            : (
              <i className='fas fa-bars'></i>
            ) }
          </button>
      </nav>

     
    );
  }
   
  export default Navbar;