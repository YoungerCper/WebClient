import {useState, useCallback, useEffect} from 'react';

const storage = "authUser";

export const useAuth = () => {

    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [names, setNames] = useState({name: "", second_name: ""});

    const login = useCallback((jwtToken, useId, name, second_name) => {
        setToken(jwtToken);
        setUserId(userId);
        setNames({name, second_name});

        localStorage.setItem(storage, JSON.stringify({userId: userId, token: jwtToken, name: names.name, second_name: names.second_name}));
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);

        localStorage.removeItem(storage);
    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storage));

        if(data != null && data.token != null){
            login(data.token, data.userId);
        }
    }, [login]);

    return [login, logout, userId, token, names];
}