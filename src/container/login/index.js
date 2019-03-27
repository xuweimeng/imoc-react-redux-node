import React from 'react'
import { Redirect } from 'react-router-dom'
import Logo from '../../component/logo'
import { WingBlank, WhiteSpace, List, InputItem, Button } from 'antd-mobile'
import { createForm } from 'rc-form';
import { connect } from 'react-redux';
import {login} from '../../redux/user.redux'


@connect(
    state => state.user,
    {login}
)
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            user: '',
            pwd: ''
        }
        this.handleLogin = this.handleLogin.bind(this)
        this.register = this.register.bind(this)
    }

    // 去注册
    register() {
        this.props.history.push('/register')
    }

    handleChange(k, val) {
        this.setState({
            [k]: val
        })
    }

    handleLogin() {
       this.props.login(this.state)
    }

    render() {
        return (
            <div>
                {this.props.redirectTo?< Redirect to={this.props.redirectTo} />:null}
                <Logo />
                <WingBlank>
                    {this.props.msg?<p className="error-msg">{this.props.msg}</p>: null}
                    <List>
                        <InputItem onChange = {v => this.handleChange('user', v)}>
                            用户名
                        </InputItem>
                        <WhiteSpace />
                        <InputItem type="password" onChange = {v => this.handleChange('pwd', v)}>
                            密码
                        </InputItem>
                    </List>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.handleLogin}>登录</Button>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.register}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}
Login = createForm()(Login);
export default Login