import React from 'react';
import { Card, WingBlank, WhiteSpace } from 'antd-mobile';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'

@withRouter
class UserCard extends React.Component {

  static propTypes = {
    userList: PropTypes.array.isRequired
  }
  handleClick(v) {
    this.props.history.push(`/chat/${v._id}`)
    console.log('222')
  }
  render() {
    return(
      <div>
        {
          this.props.userList.map(item =>(
            item.avator?(<WingBlank key={item._id}>
              <Card
                key={item._id}
                onClick={() => this.handleClick(item)}
              >
                <Card.Header
                  title={item.user}
                  thumb={require(`../../images/${item.avator}.png`)}
                  extra={<span>{item.title}</span>}
                />
                <Card.Body>
                  {item.desc.split('\n').map(v =>(
                    <p key={v}>{v}</p>
                  ))}
                </Card.Body>
                {item.company?( <Card.Footer content={item.company} extra={item.money} />):null}
              </Card>
              <WhiteSpace size="lg" />
            </WingBlank>):null
          ))
        }
      </div>
    )
  }
}

export default UserCard;