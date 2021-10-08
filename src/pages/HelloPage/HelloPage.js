import {React, useState} from 'react';
import './HelloPage.css';

function HelloPage(){

    const [helloData, setHelloData] = useState({N: 0, M: 0})

    return(
        <div className="helloBox">
            <p className="helloText">В этом месяце было <span className="helloData">{helloData.N}</span> новых постов созданные <span className="helloData">{helloData.M}</span> авторами. Для использования приложения необходимо авторизоваться</p>
        </div>
    );
}

export default HelloPage;