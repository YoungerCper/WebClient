import React from 'react';
import './Logo.css';
import LogoImage from '../../images/text.png';

function Logo(){

    return(
        <img src={LogoImage} className="logotype"/>
    );
}

export default Logo;