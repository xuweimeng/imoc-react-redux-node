import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import './config.js'
import Login from './container/login'
import Register from './container/register'
import AuthRoute from './component/authroute'
import Dashboard from './component/dashboard'
import Chat from './component/chat'
import BossInfo from './container/bossinfo'
import GeniusInfo from './container/geniusinfo'
import reducers from './reducer';
import './index.css'

const store =  createStore(reducers,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension? window.devToolsExtension():f=>f
    )
)

ReactDOM.render(
    <Provider  store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                 <Switch>
                    <Route path ="/bossinfo" component={BossInfo}></Route>
                    <Route path ="/geniusinfo" component={GeniusInfo}></Route>
                    <Route exact path="/login" component={Login}></Route>
                    <Route path="/register" component={Register}></Route>
                    <Route path="/chat/:user" component={Chat}></Route>
                    <Route component={Dashboard}></Route>
                </Switch>
                
            </div>
        </BrowserRouter>
        
    </Provider>, 
    document.getElementById('root'));


