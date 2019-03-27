import React from 'react'
import { Redirect } from 'react-router-dom'
import Logo from '../../component/logo'
import { WingBlank, WhiteSpace, List, InputItem, Button, Radio, } from 'antd-mobile';
import { connect } from 'react-redux';
import { register } from  '../../redux/user.redux';

const RadioItem = Radio.RadioItem;
@connect(
    state => state.user,
    {register}
)
class Register extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            type: 'boss', // 注册身份
            user: '',
            pwd: '',
            repeatPwd: ''
        }
        this.handleRegister = this.handleRegister.bind(this)
    }

    handleChange(key, value) {
        this.setState({
            [key]: value
        })
    }
    
    handleRegister() {
        // console.log(this.props)
        this.props.register(this.state)
    }

    render() {
        const radioData = [
            { value: 'genius', label: 'genius' },
            { value: 'boss', label: 'boss' }
        ]
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
                        <WhiteSpace />
                        <InputItem type="password" onChange = {v => this.handleChange('repeatPwd', v)}>
                            确认密码
                        </InputItem>

                    </List>

                    <List>
                        {
                            radioData.map(i => (
                                <RadioItem key={i.value} checked={this.state.type === i.value} onChange = { () => this.handleChange('type', i.value)}>
                                    {i.label}
                                </RadioItem>
                            ))
                        }
                    </List>
                    <WhiteSpace />
                    <WhiteSpace />
                    <Button type="primary" onClick={this.handleRegister}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Register