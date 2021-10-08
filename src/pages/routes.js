import React from 'react';
import Posts from '../pages/Posts/Posts';
import ViewPost from '../pages/ViewPost/ViewPost';
import HelloPage from '../pages/HelloPage/HelloPage';
import CreatePost from '../pages/CreatePost/CreatePost';
import Profile from '../pages/Profile/Profile';
import {Switch, Route, Redirect} from 'react-router-dom';

export const useRoutes = isAuth => {
    
    if(isAuth){
        return(
            <Switch>

                <Route path='/posts' exact>
                    <Posts/>
                </Route>

                <Route path='/posts/:id'>
                    <ViewPost/>
                </Route>

                <Route path='/create' exact>
                    <CreatePost/>
                </Route>

                <Route path='/profile' exact>
                    <Profile/>
                </Route>

                <Redirect to='/posts' exact/>
            </Switch>
        );
    }
    return(
        <Switch>
            <Route path='/' exact>
                <HelloPage/>
            </Route>
            <Redirect to='/' exact/>
        </Switch>
    );
    
};