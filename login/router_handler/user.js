const express = require('express')
const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')

exports.regUser = (req, res) => {
    const userinfo = req.body
    console.log(userinfo)
    //判断用户名是否被占用
    const sql = 'select * from ev_users where username=?'
    db.query(sql, [userinfo.username], (err, result) => {
        if (err) {
            return res.cc(err)
        }
        if (result.length > 0) {
            return res.cc('用户名被占用，请更换其他用户名')
        }
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        const sql = 'insert into ev_users set ?'
        db.query(sql, userinfo, (err, result) => {
            if (err) {
                return res.cc(err)
            }
            if (result.affectedRows != 1) {
                return res.cc('注册用户失败，请重试')
            }
            res.send({
                status: 0,
                message: '注册成功'
            })
        })
    })
}

exports.login = (req, res) => {
    const userinfo = req.body
    const sql = 'select * from ev_users where username = ?'
    db.query(sql, userinfo.username, (err, result) => {
        if (err) {
            return res.cc(err)
        }
        if (result.length !== 1) {
            return res.cc('登录失败')
        }

        const compareResult = bcrypt.compareSync(userinfo.password, result[0].password)
        if (!compareResult) {
            return res.cc('登录失败！')
        }
        const user = { ...result[0], password: '', user_pic: '' }
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
            expiresIn: '10h', // token 有效期为 10 个小时
        })
        res.send({
            status: 0,
            message: '登录成功！',
            // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
            token: 'Bearer ' + tokenStr,
        })
    })
}