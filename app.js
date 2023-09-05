const express = require('express');
const app = express()
const cors = require('cors');
app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
    res.cc = function (err, status = 400) {
        // err可能是一个错误对象，或者一个错误字符串
        res.status(status)
        res.send({
            status,
            msg: err instanceof Error ? err.message : err,
            data: null
        })
    }
    next()
})
// // 导包token解析
// const expressjwt = require('express-jwt');
// const { jwtSecretKey } = require('./config');
// app.use('/sync-data',expressjwt.expressjwt({ secret: jwtSecretKey, algorithms: ["HS256"] }))
// // 静态资源挂载（网站本身）
app.use('/RC',express.static('./public/H5PR'))
// 路由
const roomRouter = require('./router/room');
app.use('/api', roomRouter)
// const syncDataRouter = require('./router/syncData');
// app.use('/sync-data', syncDataRouter)
// 全局错误中间件
app.use((err, req, res, next) => {
    console.log(err);
    // if (err?.name === 'UnauthorizedError') return res.cc('身份验证失败: 无效的token', 401)
    res.cc(err)
})
app.listen(8888, () => console.log("API server running at http://127.0.0.1"))