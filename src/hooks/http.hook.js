import {useState, useCallback} from 'react';

function useHttp(){

    const [load, setLoad] = useState(false);
    const [error, setError] = useState(null);

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {

        setLoad(true);
        setError(null);

        try{
            if(body){
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json';
            }
            const response = await fetch(url, {method, body, headers});
            const data = await response.json();
            
            if(!response.ok) throw new Error(data.message || 'Что-то случмлось');

            setLoad(false);
            console.log(data);
            return data;
        }
        catch(e){
            setError(e);
            setLoad(false);
            return null;
        }
    }, []);

    return {load, request, error};
}

export default useHttp;