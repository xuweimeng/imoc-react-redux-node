import React from 'react'
import Logo from '../../component/logo'
import { WingBlank, WhiteSpace, List, InputItem, Button } from 'antd-mobile'
import { createForm } from 'rc-form';

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.register = this.register.bind(this)
        this.state={
            type: 'money'
        }
    }

    // 去注册
    register() {
        this.props.history.push('/register')
    }

    render() {
        const { getFieldProps } = this.props.form;
        // const { type } = this.state
        return (
            <div>
                <Logo />
                <WingBlank>
                    <List>
                        <InputItem {
                            ...getFieldProps('autofocus')
                        } 
                        placeholoder = '请输入用户名'
                        clear
                        onBlur = {(v)=>{console.log('onBlur', v)}}>
                            用户名
                        </InputItem>
                        <WhiteSpace />
                        <InputItem
                            {...getFieldProps('password')}
                            type="password"
                            placeholder="请输入密码"
                            onBlur = {(v)=>{console.log('password', v)}}
                        >密码</InputItem>
                    </List>
                    <WhiteSpace />
                    <Button type="primary">登录</Button>
                    <WhiteSpace />
                    <Button type="primary" onClick={this.register}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}
Login = createForm()(Login);
export default Login