import {React, useContext, useState} from 'react';
import './App.css';
import Header from './Header/Header';
import {useRoutes} from './pages/routes';
import { BrowserRouter as Router } from 'react-router-dom';
import {AuthContext} from './context/auth.context';
import { useAuth } from './hooks/auth.hook';

function App(){    
    const auth = useContext(AuthContext);
    const [login, logout, useId, token, names] = useAuth();
    const isAuth = !!token;
    let routes = useRoutes(isAuth);

    return (
        <AuthContext.Provider value={{
            login, logout, useId, token, isAuth, name: names.name, second_name: names.second_name 
        }}>
        <Router>
            <div className="window">
                <div className="headBox"><Header/></div>
                <div className="mainBox">{routes}</div>
            </div>
        </Router>
        </AuthContext.Provider>
    );
}

export default App;