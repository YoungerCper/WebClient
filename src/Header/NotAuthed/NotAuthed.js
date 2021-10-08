import {React, useState, useContext} from 'react';
import { AuthContext } from '../../context/auth.context';
import useHttp from '../../hooks/http.hook'
import './NotAuthed.css';

function NotAuthed(){
    const auth = useContext(AuthContext);
    const {load, request, error} = useHttp();
    const [authData, setAuthData] = useState({login: "", password: ""});

    const signIn = async () =>{
        const data = await request('/auth/login', 'POST', {...authData});
        console.log(data);
        if(error != null){
            alert(error.message);
        }
        else{
            console.log(data);
            auth.login(data.token, data.userId, data.name, data.second_name);
        }
    };

    const signUp = async () =>{
        const data = await request('/auth/register', 'POST', {...authData});
        console.log(data);
        if(error != null){
            alert(error.message);
        }
        else{
        }
    };

    const changeLogin = (value) => { setAuthData({login: value, password: authData.password})};
    const changePassword = (value) => { setAuthData({login: authData.login, password: value})};

    return(
        <div>
            <input className="authInput" type="text" value={authData.login} onChange={e => changeLogin(e.target.value)}></input>
            <input className="authInput" type="text" value={authData.password} onChange={e => changePassword(e.target.value)}></input>
            <button className="authButton" onClick={signIn}>Вход</button>
            <button className="authButton" onClick={signUp}>Регистрация</button>
        </div>
    );
}

export default NotAuthed;