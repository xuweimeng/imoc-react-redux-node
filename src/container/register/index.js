import React from 'react'
import { Redirect } from 'react-router-dom'
import Logo from '../../component/logo'
import { WingBlank, WhiteSpace, List, InputItem, Button, Radio, } from 'antd-mobile';
import { connect } from 'react-redux';
import { register } from  '../../redux/user.redux';
import ImoocForm from '../../component/imoocForm';

const RadioItem = Radio.RadioItem;
@connect(
    state => state.user,
    {register}
)
@ImoocForm
class Register extends React.Component {

    constructor(props) {
        super(props)
        this.handleRegister = this.handleRegister.bind(this)
    }
    componentDidMount() {
        console.log('22')
        this.props.handleChange('type', 'genius')
    }
    handleRegister() {
        this.props.register(this.props.state)
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
                        <InputItem onChange = {v => this.props.handleChange('user', v)}>
                            用户名
                        </InputItem>
                        <WhiteSpace />
                        <InputItem type="password" onChange = {v => this.props.handleChange('pwd', v)}>
                            密码
                        </InputItem>
                        <WhiteSpace />
                        <InputItem type="password" onChange = {v => this.props.handleChange('repeatPwd', v)}>
                            确认密码
                        </InputItem>

                    </List>

                    <List>
                        {
                            radioData.map(i => (
                                <RadioItem key={i.value} checked={this.props.state.type === i.value} onChange = { () => this.props.handleChange('type', i.value)}>
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