import React from 'react';
import App from './App'
import {  Route, Link, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { loginOut } from './Auth.redux'

function Erying() {
    return (
        <div>二营</div>
    )
}

function Qibinglian() {
    return (
        <div>骑兵连</div>
    )
}
@connect(
    state=>state.login,
   { loginOut}
)
class Dashboard extends React.Component {
    // constructor(props) {
    //     super(props)
    // }
   
    render() {
        console.log(this.props)
        const RedirectToLogin = <Redirect to="/login"></Redirect>
        const app = (
            <div>
                 <h2>Dashboard</h2>
                 {this.props.isAuth?<button onClick={this.props.loginOut}>注销</button>:null}
                 <ul>
                    <li>
                        <Link to="/dashboard">一营</Link>
                    </li>
                    <li>
                        <Link to="/dashboard/erying">二营</Link>
                    </li>
                    <li>
                        <Link to="/dashboard/qibinglian">骑兵连</Link>
                    </li>
                </ul>
                <Switch>
                    <Route exact path="/dashboard" component={App}></Route>
                    <Route path="/dashboard/erying" component={Erying}></Route>
                    <Route path="/dashboard/qibinglian" component={Qibinglian}></Route>
                </Switch>
            </div>
        )
        return (
            <div>
             
               {
                   this.props.isAuth?app:RedirectToLogin
               }
            </div>
        )
    }
}

export default Dashboard