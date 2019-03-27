import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { loadData } from '../../redux/user.redux'
import { connect } from 'react-redux'

@withRouter
@connect(
	null,
	{loadData}
)
class AuthRoute extends React.Component {
	componentWillMount() {
		const publicList = ['/login', '/register'];
		// console.log(this.props)
		/**
		 * 如果是登陆、或注册页面，无需跳转
		 */
		const pathname = this.props.location.pathname
		if(publicList.indexOf(pathname)> -1) {
			return null
		}
		axios.get('/user/info').then(res => {
			if(res.status === 200) {
				if(res.data.code === 0) {
					// 有登录信息
          this.props.loadData(res.data.data)
				} else {
					this.props.history.push('/login')
				}
			}
		})
		
	}
	render() {
		return (
			<div></div>
		)
	}


}
export default withRouter(AuthRoute);