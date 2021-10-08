import React, { useEffect, useState, useCallback, useMemo, useContext, useRef, useLayoutEffect } from 'react';
import useHttp from '../../hooks/http.hook';
import { AuthContext } from '../../context/auth.context';
import './Posts.css';
import PostsList from './PostsList/PostsList';
import FilterSpace from './FilterSpace/FilterSpace';
import ScrollMenu from './ScrollMenu/ScrollMenu';

function Posts(){

    const {load, request, error} = useHttp();
    const [posts, setPosts] = useState([]);
    const {token} = useContext(AuthContext);
    const [countPage, setCountPage] = useState(0);
    const [numberPage, setNumberPage] = useState(0);

    const changeNumberPage = (newNumber) =>{
        if(newNumber < 0) newNumber = 0;
        if(newNumber >= countPage) newNumber = countPage - 1;
        setNumberPage(newNumber);
    };

    const loadPosts = useCallback(async () =>{
        try{
        const newPosts = await request('/post/take-all', 'POST',{});
        setPosts(newPosts);
        console.log(newPosts);
        
        setCountPage(Math.ceil(newPosts.length / 10));
        }
        catch(e){
            
        }
    }, [token, request]);

    useEffect(() => {
        loadPosts();
        
    }, [loadPosts]);
    console.log(countPage);
     return(
        <div className="postsPage" >
            <div>
                <FilterSpace/>
            </div>
            <div className="postL">
                <PostsList posts={posts} pageNumber={numberPage}/>
            </div>
            <div>
                <ScrollMenu countPage={countPage} changeNumberPage={changeNumberPage} numberPage={numberPage}/>
            </div>
        </div>
     );
}

export default Posts;