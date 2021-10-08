import { React, useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import './Profile.css';
import Edit from '../../images/edit.png';

function Profile(){
    const auth = useContext(AuthContext);
    return (
        <div className="nameBox">
            <span className="names">{auth.name} {auth.second_name}</span>
            <img src={Edit} className="editButton"></img>
        </div>
    );
}

export default Profile;