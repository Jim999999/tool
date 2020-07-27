const Koa = require('koa2') //引入Koa2类
const router = require('koa-router')() //require('koa-router')返回的是函数
const bodyParser = require('koa-bodyparser')
const fs = require('fs')
const views = require('koa-views')
const session = require('koa-session')


const app = new Koa()
const port = 3000


/**
 * 注意
 * 1.在use内的异步函数体内 await next() 调用下一个中间件；
 * 2.use koa-bodyparser 务必写在 use router之前
 */


//use bodyParser 应在use router之前
app.use(bodyParser()) //koa-bodyparser必须在router之前被注册到app对象上


// 模板的后缀名是.html
// app.use(views('views', {
//     map: {html: 'ejs'} 
// }));

//配置模板引擎
app.use(views('views', {
    extension: 'ejs'
}))


//配置session
app.keys = ['some secret hurr']; /**cookie的签名 默认*/
const CONFIG = {
    /** 默认 */
    key: 'koa:sess',
    /**  cookie的过期时间 */
    maxAge: 10000,
    /** 默认 可以重写过期时间 */
    overwrite: true,
    /**  true表示只有服务器端可以获取 cookie */
    httpOnly: true,
    /** 默认 签名 */
    signed: true,
    /** 在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false） */
    rolling: true,
    /** 当用户进行浏览器操作时刷新 cookie 过期时间 */
    renew: false,

};
app.use(session(CONFIG, app));



//引入router
app.use(router.routes())


app.use(async(ctx, next) => {
    ctx.response.type = 'text/html';
    //ctx.response.body = 'Hello, koa2! ' + Math.round(Math.random(100) * 100, 2);

    console.log('我是一个中间件')

    await next() //用use 调用中间件时，调用下一个 middleware 函数

})


router.get('/', async(ctx, next) => {

    //设置session
    ctx.session.userinfo = '张三';
    //获取session
    //console.log(ctx.session.userinfo);

    //当前目录下所有的js文件
    let files = fs.readdirSync('./')
    let jsfiles = files.filter((f) => {
        return f.endsWith('.js')
    })

    //console.log(jsfiles)

    await ctx.render('index', {
        title: 'hello word index'
    });
    //ctx.response.body = 'index'
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

    let name = ctx.request.body.u_name || '' //提示 u_name undefined 时，注意 koa-bodyparser有无use引用，并且是在router之前被引用
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