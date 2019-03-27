import axios from 'axios';
import { getRedirectPath } from '../util';
// const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
// const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const AUTH_SUCCESS = 'AUTH_SUCCESS'

const initState = {
  // isAuth: false,
  msg: '',
  user: '',
  pwd: '',
  type: '',
  redirectTo: ''
}

// reducer 
export function user(state = initState, action) {
  switch(action.type) {
    case AUTH_SUCCESS: 
      return {
        ...state, msg: '',redirectTo: getRedirectPath(action.payload), ...action.payload
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

function authSuccess(obj) {
  const {pwd, ...data} = obj
  return {
    type: AUTH_SUCCESS,
    payload: data
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
export function update(data) {
  return dispatch => {
    axios.post('/user/update', data)
    .then(res => {
      if(res.status === 200 && res.data.code ===0) {
        dispatch(authSuccess(res.data.data))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
    .catch(err => {
      console.log('err',err)
    })
  }
}
export function login({user, pwd}) {
  if(!user || !pwd) {
    return errorMsg('用户名或者密码不能为空！')
  }
  return dispatch => {
    axios.post('/user/login', {user, pwd})
    .then(res => {
      if(res.status === 200 && res.data.code ===0) {
        dispatch(authSuccess(res.data.data))
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
        dispatch(authSuccess({user, pwd, type}))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
    .catch(err => {
      console.log('err',err)
    })
  }
}