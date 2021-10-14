import {React, useCallback, useEffect, useState} from 'react';
import useHttp from '../../hooks/http.hook';
import './HelloPage.css';

function HelloPage(){

    const [helloData, setHelloData] = useState({countP: 0, countU: 0})
    const {load, request, error} = useHttp();

    const info = useCallback(async() => {
        try{
            const data = await request('/info', 'POST', {});
            console.log(data);
            setHelloData(data);
        }
        catch(e){
            
        }
    }, [request]);

    useEffect(() => {
        info();
    }, [info]);

    if(helloData == null){
        return (<div></div>);
    }

    return(
        <div className="helloBox">
            <p className="helloText">В этом месяце было <span className="helloData">{helloData.countP}</span> новых постов созданные <span className="helloData">{helloData.countU}</span> авторами.<span className="unverse"> Для использования приложения необходимо авторизоваться</span></p>
        </div>
    );
}

export default HelloPage;