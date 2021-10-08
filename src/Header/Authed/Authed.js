import React, { useContext, useCallback } from 'react';
import { AuthContext } from '../../context/auth.context';
import './Authed.css';
import plus from '../../images/plus.png';
import { NavLink } from 'react-router-dom';

function Authed(){

    const auth = useContext(AuthContext);

    const nameFixer = useCallback(() =>{
        
        return (<p className="nameUser">{auth.name} {auth.second_name}</p>);
    }, [auth.name, auth.second_name])

    const logout = () =>{
        auth.logout();  
    };

    return(
        <div className="authField">
            <div className="createPost">
                <NavLink to="/create" style={{ textDecoration: 'none' }}>
                    <div className="imageBox">
                        <img className="plusImage" src={plus}></img>
                    </div>
                </NavLink>
            </div>
            <div className="infoBox">
                <NavLink to='/profile' style={{ textDecoration: 'none' }}>
                    {nameFixer()}
                </NavLink>
            </div>
            <div className="logoutBox">
                <span className="logoutText" onClick={logout}>Выйти</span>
            </div>
        </div>
    );
}

export default Authed;