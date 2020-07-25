const express = require('express')
const util = require('util')
const mysql = require('./connect_mysql').connection

let app = express()

//引入静态文件
app.use('/static', express.static('static'))

let port = 8888
let host = '127.0.0.1'
let server = app.listen(port, function() {
    // console.log(util.inspect(server, true))
    // console.log(server)
    // var host = server.address().address
    // var port = server.address().port
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})


app.get('/users', function(req, res) {

    mysql.query('select * from wp_users', function(err, results, fields) {
        if (err) throw err
            //console.log(results)
        res.send(results)
    })

})

app.get('/', function(req, res) {
    // console.log(req.app)
    // console.log(req.baseUrl)
    // console.log(req.cookies)
    // console.log(req.body)
    // console.log(req.hostname)
    // console.log(req)
    // console.log(req.path) // /
    // console.log(req.route)
    // console.log(req.get())
    // console.log(req.params) //{}
    // console.log(req.originalUrl) // /?type=1&dn=5
    // console.log(req.query) //{ type: '1', dn: '5' }
    let logo = '/static/img/video15.570731c.jpg'



    res.send('Hello World<img src=' + logo + ' />' + Math.random(100) * 100);
})


app.get('/hello', (req, res) => {

    res.sendFile(__dirname + "/" + "hello.js");
})