import React from 'react';
import { connect } from 'react-redux'
import {loginIn} from './Auth.redux'
import { Redirect } from 'react-router-dom'
import { Button, WhiteSpace, WingBlank } from 'antd-mobile';

@connect(
    state=>state.login,
    {loginIn}
)
class Login extends React.Component {

    render() {
        console.log(this.props)
        return (
            <div>
                {this.props.isAuth?<Redirect to="/dashboard" />:null}
                <h2>你没有权限，请登陆</h2>
                <button onClick={this.props.loginIn}>登陆</button>
                <Button type="primary" onClick={this.props.loginIn}>登陆</Button>
            </div>
        )
    }
}

export default Login