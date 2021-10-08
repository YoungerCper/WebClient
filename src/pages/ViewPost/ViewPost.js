import React, { useCallback, useEffect, useState, useContext } from 'react';
import {useParams} from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import useHttp from '../../hooks/http.hook';
import './ViewPost.css';

function ViewPost(){

    const [postId, setPostId] = useState(useParams().id);
    const [post, setPost] = useState(null);
    const {token} = useContext(AuthContext);

    const {load, request, error} = useHttp();

    let ret;

    const postLoad = useCallback(async() =>{
        try{
            const data = await request(`/post/${postId}`,'GET',{});
            setPost(data);
            alert(1);
        }
        catch(e){
            
        }
    }, [postId, request]);

    useEffect(() =>{
        postLoad();
    }, [postLoad]);

    const formatingDate = (time) =>{
        const myDate = new Date(time);
        return (myDate.getDate() + '/' + (myDate.getMonth() + 1) + '/' + myDate.getFullYear() + ' '
                + myDate.getHours() + ':' + myDate.getMinutes() + "");
    };

   

    if(load){
        return(<div></div>)
    }

    if(error){
        return(<div className="fail">К сожалению такого поста нет :’(</div>)
    }
    console.log(post);
    return(
        <div>
            <p className="abouAuthor">{post.author} {formatingDate(post.time)}</p>
        </div>
    );
}

export default ViewPost;