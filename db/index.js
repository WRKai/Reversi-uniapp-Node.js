const mysql = require('mysql');
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '7788908',
    database: 'node_related'
})
setInterval(() => {
    db.query(`update rooms_info set status=0, spStatus=0, latestMsg=null,initNumber=null where status=4`, (err, results) => {
        if (err) console.log(err)
        if (results.affectedRows) console.log(results)
    })
    db.query(`update rooms_info set status=4 where status=3`, (err, results) => {
        if (err) console.log(err)
        if (results.affectedRows) console.log(results)
    })
}, 60000);
module.exports = db