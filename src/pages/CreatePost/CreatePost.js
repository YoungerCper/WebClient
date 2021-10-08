import React, { useState, useContext } from 'react';
import useHttp from '../../hooks/http.hook';
import { AuthContext } from '../../context/auth.context';
import './CreatePost.css';

function CreatePost(){
    const auth = useContext(AuthContext);
    const {load, request, error} = useHttp();

    const [values, setValues] = useState({title: "",
                                        tags: "",
                                        text: "",
                                        userId: auth.userId});

    const addPost = async () =>{
        const data = await request('/post/create', 'POST', {...values});

        if(error != null){
            alert(error.message);
        }
        else{
            console.log(data);
        }
    };

    const changeValues = (title, tags, text) =>{
        if(title != null){
            setValues({title: title,
                    tags: values.tags,
                    text: values.text,
                    userId: auth.userId});
        }
        if(tags != null){
            setValues({title: values.title,
                    tags: tags,
                    text: values.text,
                    userId: auth.userId});
        }
        if(text != null){
            setValues({title: values.title,
                    tags: values.tags,
                    text: text,
                    userId: auth.userId});
        }
    };

    return(
        <div className="createBox">
            <div className="inputTitleBox">
                <input type="text" className="inputS" placeholder="Название" value={values.title} onChange={e => changeValues(e.target.value, null, null)}/>
            </div>
            <div className="inputTagsBox">
                <input type="text" className="inputS" placeholder="Список тегов(через запятую, без пробела)" value={values.tags} onChange={e => changeValues(null, e.target.value, null)}/>
            </div>
            <div className="inputTextBox">
                <textarea type="text" className="areaS" placeholder="Ваш текс" value={values.text} onChange={e => changeValues( null, null, e.target.value)}/>
            </div>
            <div className="buttonBox">
                <button className="createButton" onClick={addPost}>опубликовать</button>
            </div>
        </div>
    );
}

export default CreatePost;