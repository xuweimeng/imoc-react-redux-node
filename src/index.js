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
import reducers from './reducer';
import './index.css'

const store =  createStore(reducers,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension? window.devToolsExtension():f=>f
    )
)

// console.log(store.getState())
function Boss() {
    return<h2>boss</h2>
}

ReactDOM.render(
    <Provider  store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute></AuthRoute>
                 <Switch>
                     <Route path ="/boss" component={Boss}></Route>
                    <Route exact path="/login" component={Login}></Route>
                    <Route path="/register" component={Register}></Route>
                </Switch>
                
            </div>
        </BrowserRouter>
        
    </Provider>, 
    document.getElementById('root'));


