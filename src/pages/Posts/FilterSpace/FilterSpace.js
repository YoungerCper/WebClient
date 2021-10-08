import React, { useEffect, useState, useCallback, useMemo, useContext } from 'react';
import useHttp from '../../../hooks/http.hook';
import { AuthContext } from '../../../context/auth.context';
import './FilterSpace.css';

function FilterSpace(){

    return(
    <div>
        <input className="filterInput"/>
        <select className="filterSelector">
            <option>тег первый</option>
            <option>тег 2</option>
        </select>
        <button className="filterButton">фильтровать</button>
        <button className="filterButton">сбросить фильтры</button>
    </div>);
}

export default FilterSpace;