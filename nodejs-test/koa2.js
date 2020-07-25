const Koa = require('koa2')
const router = require('koa-router')() //require('koa-router')返回的是函数
const bodyParser = require('koa-bodyparser')
const fs = require('fs')
const app = new Koa()
const port = 3000


/**
 * 注意
 * 1.在use内的异步函数体内 await next() 调用下一个中间件；
 * 2.use koa-bodyparser 务必写在 use router之前
 */


//use bodyParser 应在use router之前
app.use(bodyParser())

//引入router
app.use(router.routes())


app.use(async(ctx, next) => {

    await next() //用use 调用中间件时，调用下一个函数
    ctx.response.type = 'text/html';
    // ctx.response.body = 'Hello, koa2! ' + Math.round(Math.random(100) * 100, 2);


})

router.get('/', function(ctx, next) {

    //当前目录下所有的js文件
    let files = fs.readdirSync('./')
    let jsfiles = files.filter((f) => {
        return f.endsWith('.js')
    })
    console.log(jsfiles)


    ctx.response.body = 'index'
})



router.get('/hello/:name', async(ctx, next) => {

    let name = ctx.params.name

    ctx.response.body = 'hello ' + name ? name : 'world'

})



router.get('/addUser', async(ctx, next) => {

    ctx.response.body = `<form action="/saveUser" method="post">
    <p>Name: <input name="u_name" value="koa"></p>
    <p>Password: <input name="password" type="password"></p>
    <p><input type="submit" value="Submit"></p>
</form>`;
})

router.post('/saveUser', async(ctx, next) => {

    let name = ctx.request.body.u_name || ''
    let password = ctx.request.body.password || ''
    console.log('addUser ：' + name)

    let tip = `welcome ${name}`
    if (name != 'koa' || password != '12345') {
        tip = 'login fail ~'
    }

    ctx.response.body = tip
})


router.get('/:id', async(ctx, next) => {
    let id = ctx.params.id ? ctx.params.id : 100

    ctx.response.body = "Get the param : " + id
})






app.listen(port)
console.log('run on http://127.0.0.1:' + port)