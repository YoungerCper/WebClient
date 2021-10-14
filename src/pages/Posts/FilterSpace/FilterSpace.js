import React, { useEffect, useState, useCallback, useMemo, useContext } from 'react';
import useHttp from '../../../hooks/http.hook';
import { AuthContext } from '../../../context/auth.context';
import './FilterSpace.css';

function FilterSpace(props){

    const [query, setQuery] = useState("");
    const [tag, setTag] = useState("none");

    const changeTag = (value) =>{
        console.log(value);
        if(value == "без фильтра"){
            setTag("none");
            return;
        }
        setTag(value);
    };

    return(
    <div>
        <input className="filterInput" onChange={e => {setQuery(e.target.value)}} value={query}/>
        <select className="filterSelector" onChange={e => changeTag(e.target.value)}>
            <option>без фильтра</option>
            {props.tags.map(tag => <option>{tag}</option>)}
        </select>
        <button className="filterButton" onClick={ e => {props.changeFilter({query, tag})}}>фильтровать</button>
        <button className="filterButton" onClick={ e => {props.changeFilter({query: "", tag: "none"})}}>сбросить фильтры</button>
    </div>);
}

export default FilterSpace;

//