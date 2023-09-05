const db = require('../db/index');
exports.postSearch = (req, res) => {
    const selectSqlStr = 'select * from rooms_info where room_number=? and status=1'
    db.query(selectSqlStr, [req.body.room_number], (err, results) => {
        if (err) return res.cc(err)
        if (results.length === 1) {
            db.query(`update rooms_info set status=2 where room_number=?`, [req.body.room_number], (err, results) => {
                if (err) return res.cc(err)
                if (results.affectedRows !== 1) return res.cc('创建房间失败!')
                res.send({
                    status: 200,
                    msg: "房间已找到!",
                    data: {
                        isWaiting: false
                    }
                })
            })
        }
        else if (results.length === 0) {
            const selectSqlStr2 = `select * from rooms_info where room_number=? and status=0`
            db.query(selectSqlStr2, [req.body.room_number], (err, results) => {
                if (err) return res.cc(err)
                if (results.length === 1) {
                    const updateSqlStr = `update rooms_info set status=1 where room_number=?`
                    db.query(updateSqlStr, [req.body.room_number], (err, results) => {
                        if (err) return res.cc(err)
                        res.send({
                            status: 200,
                            msg: '创建房间成功!',
                            data: {
                                isWaiting: true
                            }
                        })
                    })
                }
                else if (results.length === 0) {
                    db.query(`select * from rooms_info where room_number=? and (status=2 or status=3 or status=4)`, [req.body.room_number], (err, results) => {
                        if (err) return res.cc(err)
                        if (results.length === 1) {
                            return res.send({
                                status: 400,
                                msg: '房间号被占用',
                                data: {
                                    room_number: req.body.room_number
                                }
                            })
                        }
                        const insetSqlStr = `insert into rooms_info set ?`
                        db.query(insetSqlStr, [{ room_number: req.body.room_number, status: 1 }], (err, results) => {
                            if (err) return res.cc(err)
                            res.send({
                                status: 200,
                                msg: '创建房间成功!',
                                data: {
                                    isWaiting: true
                                }
                            })
                        })
                    })
                }
            })
        }
    })
}
exports.postConfirmPair = (req, res) => {
    const selectSqlStr = `select * from rooms_info where room_number=?`
    db.query(selectSqlStr, [req.body.room_number], (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('失败')
        res.send({
            status: 200,
            msg: '获取最新房间数据成功',
            data: {
                isWaiting: results[0].status === 2 ? false : true
            }
        })
    })
}
exports.postCancelSearch = (req, res) => {
    const updateSqlStr = `update rooms_info set status=0 where room_number=? and status=1`
    db.query(updateSqlStr, [req.body.room_number], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('失败')
        res.send({
            status: 200,
            msg: '取消成功',
            data: {
                room_number: req.body.room_number
            }
        })
    })
}
exports.postInit = (req, res) => {
    const updateSqlStr = `update rooms_info set initNumber=? where room_number=? and status=2`
    db.query(updateSqlStr, [req.body.initNumber, req.body.room_number], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('失败')
        res.send({
            status: 200,
            msg: '上传初始先手数据成功',
            data: {
                room_number: req.body.room_number,
                initNumber: req.body.initNumber
            }
        })
    })
}
exports.getInit = (req, res) => {
    const selectSqlStr = `select * from rooms_info where room_number=? and status=2`
    db.query(selectSqlStr, [req.body.room_number], (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('失败')
        res.send({
            status: 200,
            msg: '获得初始先手数据成功',
            data: {
                initNumber: results[0].initNumber
            }
        })
    })
}
exports.postLatestGaming = (req, res) => {
    const updateSqlStr = `update rooms_info set latestMsg=? where room_number=?`
    const JSON_latestMsg = JSON.stringify(req.body.latestMsg)
    db.query(updateSqlStr, [JSON_latestMsg, req.body.room_number], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) res.cc('失败')
        res.send({
            status: 200,
            msg: '上传执棋数据成功',
            data: {
                room_number: req.body.room_number
            }
        })
    })
}
exports.postLatestGaming = (req, res) => {
    const updateSqlStr = `update rooms_info set latestMsg=? where room_number=?`
    const JSON_latestMsg = JSON.stringify(req.body.latestMsg)
    db.query(updateSqlStr, [JSON_latestMsg, req.body.room_number], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) res.cc('失败')
        res.send({
            status: 200,
            msg: '上传执棋数据成功',
            data: {
                room_number: req.body.room_number,
                latestMsg: req.body.latestMsg
            }
        })
    })
}
exports.getLatestGaming = (req, res) => {
    const selectSqlStr = `select * from rooms_info where room_number=?`
    db.query(selectSqlStr, [req.body.room_number], (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) res.cc('失败')
        res.send({
            status: 200,
            msg: '获取执棋数据成功',
            data: {
                latestMsg: JSON.parse(results[0].latestMsg)
            }
        })
    })
}
exports.getSpStatus = (req, res) => {
    const selectSqlStr = `select * from rooms_info where room_number=?`
    db.query(selectSqlStr, [req.body.room_number], (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) res.cc('失败')
        res.send({
            status: 200,
            msg: '获取spStatus数据成功',
            data: {
                spStatus: results[0].spStatus
            }
        })
    })
}
exports.postSpStatus = (req, res) => {
    const updateSqlStr = `update rooms_info set spStatus=1 where room_number=?`
    db.query(updateSqlStr, [req.body.room_number], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) res.cc('失败')
        console.log(results);
        res.send({
            status: 200,
            msg: '更新spStatus数据成功',
            data: null
        })
    })
}
exports.postEndGame=(req,res)=>{
    const updateSqlStr = `update rooms_info set status=3 where room_number=?`
    db.query(updateSqlStr, [req.body.room_number], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1){
            return res.send({
                status: 200,
                msg: '更新roomStatus数据失败, 或许已经成功?',
                data: null
            })
        }
        res.send({
            status: 200,
            msg: '更新roomStatus数据成功',
            data: null
        })
    })
}