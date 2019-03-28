import React from 'react';
import { Result, List, Button, Modal, WhiteSpace } from 'antd-mobile';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom'
import browserCookie from 'browser-cookies';
import {logoutSubmit} from '../../redux/user.redux';

@connect(
  state => state.user,
  {logoutSubmit}
)
class User extends React.Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
  }

  logout() {
    const alert = Modal.alert;
    alert('退出', '确认退出吗???', [
      { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
      { text: '确定', onPress: () => {
        this.props.logoutSubmit()
        browserCookie.erase('userid')
      }},
    ]);
    console.log('eeeeeeee')
  }
  render() {
    const props = this.props
    const Item = List.Item;
    const Brief = Item.Brief;
    return props.user?(
      <div>
        <Result
            img={props.avator?<img src={require(`../../images/${props.avator}.png`)} alt="" />:null}
            title={props.user}
            message={props.type === 'boss'?props.company:props.title}
          />
          <WhiteSpace />
          <List  renderHeader={() => '简介'}>
            <Item multipleLine>
              {
                props.desc.split('\n').map(v =>  <Brief key={v}>{v}</Brief>)
              }
              {
                props.type === 'boss'? <Brief>薪资：{props.money}</Brief>: null
              }
            </Item>
          </List>
          <WhiteSpace />
          <Button type="primary" style={{zIndex: 11}} onClick={this.logout}>退出</Button>
      </div>
    ):< Redirect to={this.props.redirectTo} />
  }
}

export default User;