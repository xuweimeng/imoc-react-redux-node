import axios from 'axios';
import { getRedirectPath } from '../util';
const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'

const initState = {
  isAuth: false,
  msg: '',
  user: '',
  pwd: '',
  type: '',
  redirectTo: ''
}

// reducer 
export function user(state = initState, action) {
  switch(action.type) {
    case REGISTER_SUCCESS: 
      return {
        ...state, msg: '',redirectTo: getRedirectPath(action.payload), isAuth: true, ...action.payload
      }
    case LOGIN_SUCCESS: 
      return {
        ...state, msg: '',redirectTo: getRedirectPath(action.payload), isAuth: true, ...action.payload
      }
    case LOAD_DATA: 
      return {
        ...state, ...action.payload
      }
    case ERROR_MSG:
      return {
        ...state, isAuth: false, msg: action.msg
      }
    default:
      return state
  }
}

function registerSuccess(data) {
  return {
    type: REGISTER_SUCCESS,
    payload: data
  }
}

function loginSuccess(data) {
  return {
    type: LOGIN_SUCCESS,
    payload:data
  }
}

function errorMsg(msg) {
  return {
    type: 'ERROR_MSG',
    msg
  }
}
export function loadData(userinfo) {
  return {
    type: LOAD_DATA,
    payload: userinfo
  }
}
// export function userinfo() {
//   return dispatch => {
//     axios.post('/user/info').then(res => {
// 			if(res.status === 200) {
// 				if(res.data.code === 0) {
// 					// 有登录信息
// 				} else {
//           this.props.loadData(res.data.data)
// 					this.props.history.push('/login')
// 				}
// 			}
// 		})
//   }
// }

export function login({user, pwd}) {
  if(!user || !pwd) {
    return errorMsg('用户名或者密码不能为空！')
  }
  return dispatch => {
    axios.post('/user/login', {user, pwd})
    .then(res => {
      if(res.status === 200 && res.data.code ===0) {
        dispatch(loginSuccess(res.data.data))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
    .catch(err => {
      console.log('err',err)
    })
  }
}

export function register({user, pwd, repeatPwd, type}) {
  // console.log({user, pwd, repeatPwd, type})
  if(!user || !pwd || !type) {
    return errorMsg('用户名密码不能为空！')
  }
  if(pwd !== repeatPwd) {
    return errorMsg('两次密码必须相同')
  }
  return dispatch => {
    axios.post('/user/register', {user, pwd, type})
    .then(res => {
      if(res.status === 200 && res.data.code ===0) {
        dispatch(registerSuccess({user, pwd, type}))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
    .catch(err => {
      console.log('err',err)
    })
  }
}