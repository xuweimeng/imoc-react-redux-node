import React from 'react';
import { connect } from 'react-redux';
import { getUserList } from '../../redux/chartuser.redux';
import UserCard from '../userCard';

@connect(
  state => state.chartuser,
  {getUserList}
)
class Boss extends React.Component {
  componentDidMount() {
    this.props.getUserList('boss')
  }
  render() {
    return  <UserCard userList={this.props.userList}></UserCard>
  }
}

export default Boss;