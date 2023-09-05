const db = require('../db/index');
exports.getGongde = (req, res) => {
    // 定义SQL语句，查询用户名是否被占用
    const selectSqlStr = 'select * from muyu_users where id=?'
    db.query(selectSqlStr, [req.auth.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('获取功德数据失败')
        res.send({
            status: 200,
            msg: "获取功德数据成功",
            data: {
                total_gongde: results[0].total_gongde
            }
        })
    })
}
exports.postGongde = (req, res) => {
    const updateSqlStr = `update muyu_users set total_gongde=? where id=?`
    db.query(updateSqlStr, [req.body.total_gongde, req.auth.id], (err, results) => {
        if (err) return res.cc(err)
        console.log(results);
        if (results.affectedRows !== 1) return res.cc('上传功德数据失败')
        res.send({
            status: 200,
            msg: "更新功德数据成功",
            data: null
        })
    })
}
exports.getSettings = (req, res) => {
    const selectSqlStr =`select globalStaticSettings from muyu_users where id=?`
    db.query(selectSqlStr, [req.auth.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('获取全局设置数据失败')
        console.log(results);
        res.send({
            status: 200,
            msg: "获取全局设置数据成功",
            data: JSON.parse(results[0].globalStaticSettings)
        })
    })
}
exports.postSettings = (req, res) => {
    const updateSqlStr = `update muyu_users set globalStaticSettings=? where id=?`
    const globalStaticSettings = JSON.stringify(req.body)
    db.query(updateSqlStr, [globalStaticSettings, req.auth.id], (err, results) => {
        if (err) return res.cc(err)
        console.log(globalStaticSettings);
        if (results.affectedRows !== 1) return res.cc('上传全局设置数据失败')
        res.send({
            status: 200,
            msg: "更新全局设置数据成功",
            data: null
        })
    })
}