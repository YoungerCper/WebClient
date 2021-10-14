import React, { useEffect, useState, useCallback, useMemo, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import useHttp from '../../../hooks/http.hook';
import { AuthContext } from '../../../context/auth.context';
import './PostsList.css';
import PostCard from './PostCard/PostCard';

function PostsList(props){

    const visPosts = useCallback(() =>{
        let newArray = [];
        for(let i = props.pageNumber * 10; i < (props.pageNumber + 1) * 10 && i < props.posts.length; i++){
            newArray.push(props.posts[i]);
        }
        return newArray;
    }, [props.pageNumber, props.posts])

    if(props.posts == null)
        return(<p>Постов нет</p>);

    if(props.posts.length <= 0)
        return(<p>Постов нет</p>);

    return(
        <div className="postList">
            {visPosts().map(post => (<NavLink to={`/posts/${post._id}`} style={{ textDecoration: 'none' }}><div className="postBox"><PostCard post={post}/></div></NavLink>))}   
        </div>
    );
}

export default PostsList;