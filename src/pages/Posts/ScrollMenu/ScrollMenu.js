import React, { useEffect, useState, useCallback, useMemo, useContext } from 'react';
import useHttp from '../../../hooks/http.hook';
import { AuthContext } from '../../../context/auth.context';
import './ScrollMenu.css';
import { PromiseProvider } from 'mongoose';

function ScrollMenu(props){

    let dot = true;

    const downPage = () =>{
        props.changeNumberPage(props.numberPage - 1);
        dot = true;
    };

    const upPage = () =>{
        props.changeNumberPage(props.numberPage + 1);
        dot = true;
    };

    const goToPageNumber = (number) =>{
        props.changeNumberPage(number - 1);
        dot = true;
    };    

    const dots = () =>{
        
        if(dot){
            dot = false;
            return(<span className="dots">...</span>);
        }
        return;
    };


    let blockArray = [];

    for(let i = 1; i <= props.countPage; i++){
        blockArray.push(((props.numberPage - 5 <= i - 1 && props.numberPage + 5 >= i - 1 || i == 1 || i == props.countPage)?
        ((props.numberPage == i - 1)?
        <div className="numberPageSelected" onClick={() => {goToPageNumber(i)}}>{i}</div>:
        <div className="numberPage" onClick={() => {goToPageNumber(i)}}>{i}</div>):
        <div>{dots()}</div>))
    }

    return(
    <div className="scroller">
        <button onClick={downPage}>{'<--'}</button>
        {blockArray}
        <button onClick={upPage}>{'-->'}</button>
    </div>);
}

export default ScrollMenu;