import React from 'react';
import { connect } from 'react-redux';
import { getMsgList, sendMsg, recvMsg  } from '../../redux/chat.redux'
import { List, InputItem, NavBar, Icon } from 'antd-mobile';
import io from 'socket.io-client';
const socket = io('ws://localhost:9093');

@connect(
  state => state,
  {getMsgList, sendMsg, recvMsg}
)
class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      msg: []
    }
  }
  componentDidMount() {
    if(!this.props.chat.chatmsg.length) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
  }
  handleSubmit() {
   
    const from = this.props.user._id
    const to = this.props.match.params.user
    const msg = this.state.text
    this.props.sendMsg({from, to, msg})
    this.setState({text: ''})
  }
  render() {
    const userid = this.props.match.params.user
    const Item = List.Item
    const users = this.props.chat.users
    if(!users[userid]) {
      return null
    }
    return (
      <div className="chat-page">
        <NavBar
          icon={<Icon type="left" />}
          onLeftClick={() => {
            this.props.history.goBack()
          }}
        >
          {users[userid].name}
        </NavBar>
        {this.props.chat.chatmsg.map(item => {
          const avator = require(`../../images/${users[item.from].avator}.png`)
          return item.from === userid?(
            <List  key={item._id}>
              <Item 
                thumb={avator}
              >
                对方发来的：{item.content}
              </Item>
            </List>
          ):(
            <List  key={item._id}>
              <Item 
                // extra={'avator'} 
                extra={<img src={avator} alt="" />} 
                className="chat-me">
                我发来的：{item.content}
              </Item>
            </List>
          )})
        }
        <div className="stick-footer">
          <List>
            <InputItem
              placeholder="请输入"
              value={this.state.text}
              extra={<span>发送</span>}
              onChange={v => {
                this.setState({text: v})
              }}
              onExtraClick={() => this.handleSubmit()}
            >
            
            </InputItem>
          </List>
        </div>
      </div>
    )
  }
}

export default Chat