import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { NavBar } from 'antd-mobile';
import NavLinkBar from '../navLink';
import Boss from '../boss';
import Genius from '../genius';
import User from '../user';
import { getMsgList, recvMsg } from '../../redux/chat.redux'

function Msg() {
  return (
    <h2>Msg</h2>
  )
}

@connect(
  state => state,
  { getMsgList, recvMsg }
)
class Dashboard extends React.Component {
  // constructor(props) {
  //   super(props)
  // }
  componentDidMount() {
    this.props.getMsgList()
    this.props.recvMsg()
  }
  render() {
    const {pathname} = this.props.location
    const user = this.props.user
    const navList = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'genius',
        title: '牛人列表',
        component: Genius,
        hide: user.type === 'genius'
      },
      {
        path: '/genius',
        text: 'boss',
        icon: 'boss',
        title: 'boss列表',
        component: Boss,
        hide: user.type === 'boss'
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg,
      },
      {
        path: '/me',
        text: '我的',
        icon: 'me',
        title: '个人中心',
        component: User,
      }
    ]
    return (
      <div>
        <NavBar className="fixed-header" mode="dark" >{navList.find(item => item.path===pathname).title}</NavBar>
        <div className="page-content">
          <Switch>
            {navList.map(item => (
              <Route key={item.path} path={item.path} component={item.component}></Route>
            ))}
          </Switch>
        </div>
        <NavLinkBar data={navList}></NavLinkBar>
      </div>
    )
  }
}

export default Dashboard;