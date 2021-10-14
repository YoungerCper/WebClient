import React from 'react';
import './PostCard.css';

function PostCard(props){

    const formatingDate = (time) =>{
        const myDate = new Date(time);
        return (myDate.getDate() + '/' + (myDate.getMonth() + 1) + '/' + myDate.getFullYear() + ' '
                + myDate.getHours() + ':' + myDate.getMinutes() + "");
    };

    return(
        <div className="postCard">
            <div className="date">
                <p>{formatingDate(props.post.time).split(" ")[0]}</p>
                <p>{formatingDate(props.post.time).split(" ")[1]}</p>
            </div>
            <div className="mainData">
                <p className="title">{props.post.title}</p>
                <p className="tags">{props.post.tags.map(tag => '#' + tag)}</p>
            </div>
            <div className="text">
                {props.post.text.substr(0, 100)}
            </div>
            <div className="author">
                {props.post.authorName}
            </div>
        </div>
    );
}

export default PostCard;