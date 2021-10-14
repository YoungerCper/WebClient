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
    const [tags, setTags] = useState([]);
    

    const [filter, setFilter] = useState({query: "", tag: "none"});

    const filteredPosts = useCallback(() => {
        if(posts != null){
        const newPosts = posts.filter(post => (post.title.toLowerCase().includes(filter.query.toLowerCase()) || post.text.toLowerCase().includes(filter.query.toLowerCase()))
                                                 && (post.tags.indexOf(filter.tag) != -1 || filter.tag == 'none'));
        return newPosts;
        }
        return posts;
    }, [filter, posts]);

    let a = Math.ceil(filteredPosts().length / 10);

    const changeNumberPage = (newNumber) =>{
        if(newNumber < 0) newNumber = 0;
        if(newNumber >= a) newNumber = a - 1;
        setNumberPage(newNumber);
    };

    const loadTags = (newPost) => {
        let ans = ["worl"];
        for(let i = 0; i < newPost.length; i++){
            for(let j = 0; j < newPost[i].tags.length; j++){
                if(ans.indexOf(newPost[i].tags[j]) == -1){
                    ans.push(newPost[i].tags[j]);
                }
            }
        }
        setTags(ans);
    };

    const loadPosts = useCallback(async () =>{
        try{
        const newPosts = await request('/post/take-all', 'POST',{});
        console.log(newPosts);  
        if(newPosts != null){
            setPosts(newPosts.sort((a,b)=>{
                const at = new Date(a);
                const bt = new Date(b);

                return (at > bt) ? 1 : -1;
            }));
            setCountPage(Math.ceil(newPosts.length / 10));
            loadTags(newPosts);
        }
        }
        catch(e){
            
        }
    }, [token, request]);

    
    useEffect(() => {
        loadPosts();
        
    }, [loadPosts]);

    if(posts == null){
        return (<div></div>);
    }

     return(
        <div className="postsPage" >
            <div>
                <FilterSpace changeFilter={setFilter} tags={tags}/>
            </div>
            <div className="postL">
                <PostsList posts={filteredPosts()} pageNumber={numberPage}/>
            </div>
            <div>
                <ScrollMenu countPage={a} changeNumberPage={changeNumberPage} numberPage={numberPage}/>
            </div>
        </div>
     );
    

    
}

export default Posts;