import { React, useContext, useState } from 'react';
import { AuthContext } from '../../context/auth.context';
import './Profile.css';
import Edit from '../../images/edit.png';
import useHttp from '../../hooks/http.hook'
import CheckMark from '../../images/checkmark.png';
import { useAuth } from '../../hooks/auth.hook';

function Profile(){
    const auth = useContext(AuthContext);
    const {load, request, error} = useHttp();

    const [nowEdit, setNowEdit] = useState(false);
    const [profile, setProfile] = useState({name: auth.name, second_name: auth.second_name});

    const [login, logout, userId, token, names] = useAuth();

    const changeNowEdit = () =>{
        setNowEdit(!nowEdit);
    };

    const editProfile = async(newProfile) =>{
        try{
            const data = await request(`/user/${auth.userId}?name=${newProfile.name}&second_name=${newProfile.second_name}`, 'GET', null, {});
            console.log(data);
            if(data != null){
                auth.login(auth.token, data.userId, data.name, data.second_name); 
            }
        }
        catch(e){
            alert("Какая-то проблема(");
        }
    };

    if(!nowEdit){
        return (
            <div className="nameBox">
                <span className="names">{auth.name} {auth.second_name}</span>
                <img src={Edit} className="editButton" onClick={changeNowEdit}></img>
            </div>
        );
    }

    return(
        <div className="nameBox">
                <input type={profile.name} value={profile.name} onChange={e => {setProfile({name: e.target.value, second_name: profile.second_name})}}/>
                <input type={profile.second_name} value={profile.second_name} onChange={e => {setProfile({name: profile.name, second_name: e.target.value})}}/>
                <img src={Edit} className="editButton" onClick={changeNowEdit}></img>
                <img src={CheckMark} className="editButton" onClick={e =>{editProfile(profile)}}></img>
            </div>
    );
}

export default Profile;