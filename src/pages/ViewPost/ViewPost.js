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

    const postLoad = useCallback(async() =>{
        try{
            const data = await request(`/post/${postId}`, 'GET', null, {});
            setPost(data);
            console.log(data);
        }
        catch(e){
            console.log("error");
        }
    }, [postId, request]);

    useEffect(() =>{
        postLoad();
    }, [postLoad]);

    const formatingDate = (time) =>{
        const myDate = new Date(time);
        return (myDate.getDate() + '/' + (myDate.getMonth() + 1) + '/' + myDate.getFullYear());
    };

    const formatingHour = (time) =>{
        const myDate = new Date(time);
        return (myDate.getHours() + ':' + myDate.getMinutes() + "");
    };

    

    if(load){
        return(<div></div>)
    }

    if(error || post == null){
        return(<div className="fail post">К сожалению такого поста нет <span>:’(</span></div>)
    }
    console.log(post);
    return(
        <div className="post">
            <div className="upper">
                <span className="abouAuthor">{post.authorName}</span>
                <span className="date">{formatingHour(post.time)}</span>
                <span className="hour">{formatingDate(post.time)}</span>
            </div>
            <div className="tags">
                <span>{post.tags.map(tag => '#' + tag + " ")}</span>
            </div>
            <div className="title">
                <span>{post.title}</span>
            </div>
            <div className="text">
                <p>{post.text}</p>
            </div>
        </div>
    );
}

export default ViewPost;