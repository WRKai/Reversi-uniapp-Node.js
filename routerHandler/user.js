const db = require('../db/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecretKey, expiresIn } = require('../config');
exports.register = (req, res) => {
    const userinfo = req.body
    // 定义SQL语句，查询用户名是否被占用
    const selectSqlStr = 'select * from muyu_users where username=?'
    db.query(selectSqlStr, [userinfo.username], (err, results) => {
        if (err) return res.cc(err)
        if (results.length > 0) return res.cc('用户名被占用')
        // 到这里，用户名可用
        // 调用bcrypt进行加密
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        const insertSqlStr = 'insert into muyu_users set ?'
        db.query(insertSqlStr, { username: userinfo.username, password: userinfo.password }, (err, results) => {
            if (err) return res.cc(err)
            // 判断影响行数？
            if (results.affectedRows !== 1) res.cc('注册失败, 请稍后再试')
            // 到这里就真的成功了
            res.send({ status: 200, msg: '注册成功!', data: { username: userinfo.username, password: '<HIDE>' } })
        })
    })
}
exports.login = (req, res) => {
    const userinfo = req.body
    const selectSqlStr = `select * from muyu_users where username=?`
    db.query(selectSqlStr, [userinfo.username], (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('登录失败: 用户名不存在')
        // 到达这里就是用户存在
        // .compareSync(需要被比较验证的密码，数据库中的正确密码)
        const pwCmpRes = bcrypt.compareSync(userinfo.password, results[0].password)
        if (!pwCmpRes) return res.cc('登录失败: 用户名或密码错误')
        // 剔除敏感信息
        const userdataPublic = { ...results[0], password: '<HIDE>' }
        //生成token
        const token = jwt.sign(userdataPublic, jwtSecretKey, { expiresIn })
        res.send({
            status: 200,
            msg: '登录成功！',
            data: {
                ...userdataPublic,
                token: `Bearer ${token}`
            }
        })
    })
}