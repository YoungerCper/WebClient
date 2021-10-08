import React, { useContext } from 'react';
import './Header.css';
import Authed from './Authed/Authed';
import NotAuthed from './NotAuthed/NotAuthed';
import Logo from './Logo/Logo';
import { AuthContext } from '../context/auth.context';
import { NavLink } from 'react-router-dom';

function Header(){
    const auth = useContext(AuthContext);
    const authComponent = () => {
        if(auth.isAuth){
            return(
                <Authed/>
            );
        }
        else{
            return(
                <NotAuthed/>
            );
        }
    }

    return (
        <div className="header">
            <div className="logoBox">
                <NavLink to="/posts">
                    <Logo/>
                </NavLink>
            </div>
            <div className="authBox">
                {authComponent()}
            </div>
        </div>
    );

}

export default Header;