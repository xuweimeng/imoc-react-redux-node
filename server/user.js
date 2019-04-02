const express = require('express');
const utility = require('utility');
const Router = express.Router();
const model = require('./model');
const User = model.getModel('user');
const Chat = model.getModel('chat');
const _filter = {'pwd': 0, '_v': 0}; // 屏蔽密码和版本号
//  Chat.remove({}, function(e, d) {
//     })
Router.get('/list', function(req, res) {
    const {type} = req.query
    // User.remove({}, function(e, d) {
    //     if(e) {
    //         console.log('清除数据出错了')
    //     }
    //     console.log(d)
    // })
    User.find({type}, function(err, doc) {
        return res.json({code: 0, data:doc})
    })
})

Router.get('/getmsglist', function(req, res) {
    const user = req.cookies.userid
    User.find({}, function(e, userdoc) {
        let users={}
        userdoc.forEach(v =>{
            users[v._id] = {name: v.user, avator: v.avator}
        })
        Chat.find({'$or':[{from: user},{to:user}]}, function(err, doc) {
            if(!err) {
                return res.json({code: 0, msgs: doc, users: users})
            }
        })
    })
})

Router.post('/update', function(req, res) {
    const userid = req.cookies.userid
    if(!userid) {
        return res.json({code: 1})
    }
    const body = req.body
    User.findByIdAndUpdate(userid,body, function(e, d) {
        const data = Object.assign({}, {
            user: d.user,
            type: d.type
        }, body)
        return res.json({code:0, data})
    })
})
Router.post('/login', function(req, res) {
    const {user, pwd} = req.body
    User.findOne({user, pwd: md5Pwd(pwd)}, _filter, function(e, d) {
        if(e) {
            return res.json({code: 1, msg: '用户名不存在或密码错误！'})
        }
        res.cookie('userid', d._id)
        return res.json({code: 0, data: d})
    })
})

Router.post('/register', function(req, res) {
    const {user, pwd, type} = req.body
    User.findOne({user}, function(err, doc) {
        if(doc){
            return res.json({code:1, msg: "用户名已存在"})
        }
        const userModel = new User({user, pwd: md5Pwd(pwd), type})
        userModel.save(function(e, d) {
            if(e) {
                return res.json({code: 1, msg: "后端出错了"})
            }
            const {user, type, _id} = d
            res.cookie('userid', _id)
            return res.json({code: 0, data: {user, type, _id} ,msg: "注册成功"})
        })
    })
})

Router.get('/info', function(req, res) {
    const userid = req.cookies.userid
    if(!userid) {
        return res.json({code: 1})
    }
    User.findOne({_id: userid},_filter, function(e, d) {
        if(e) {
            return res.json({code:1, msg: '后端出错了'})
        }
        if(d) {
            return res.json({code: 0, data: d})
        }
    })
})

function md5Pwd(pwd) {
    const salt = 'xuweimeng_is_a_boy@fromHenan123&&&'
    return utility.md5(utility.md5(pwd+salt))
}

module.exports = Router