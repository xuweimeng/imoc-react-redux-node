import React from 'react';
import { Redirect } from 'react-router-dom'
import { NavBar, InputItem, TextareaItem, WhiteSpace, Button } from 'antd-mobile';
import AvatorSelector from '../../component/avator-selector';
import { update } from '../../redux/user.redux'
import { connect } from 'react-redux'

@connect(
  state => state.user,
  {update}
)
class BossInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      money: '',
      company: '',
      desc: ''
    }
  }

  handleChange(key, value) {
    this.setState({
      [key]: value
    })
  }
  render() {
    const path = this.props.location.pathname
    const redirect = this.props.redirectTo
    return (
      <div>
        {redirect && redirect!==path?< Redirect to={this.props.redirectTo} />:null}
        <NavBar mode="dark">Boss信息完善</NavBar>
        <WhiteSpace />
        <WhiteSpace />
        <AvatorSelector selectAvator={(imgname => {
          this.setState({
            avator: imgname
          })
        })}></AvatorSelector>
        <WhiteSpace />
        <WhiteSpace />
        <InputItem onChange = {v => this.handleChange('title', v)}>
            招聘职位:
        </InputItem>
        {/* <WhiteSpace /> */}
        <InputItem onChange = {v => this.handleChange('company', v)}>
            公司名称:
        </InputItem>
        {/* <WhiteSpace /> */}
        <InputItem onChange = {v => this.handleChange('money', v)}>
            薪资范围:
        </InputItem>
        {/* <WhiteSpace /> */}
        <TextareaItem 
          title="职位要求:"
          rows={3}
          onChange = {v => this.handleChange('desc', v)}>
        </TextareaItem>
        {/* <WhiteSpace /> */}
        
        <WhiteSpace />
        <Button type="primary"
          onClick = {() => {
            this.props.update(this.state)
          }}
        >保存</Button>
      </div>
    )
  }
}

export default BossInfo;