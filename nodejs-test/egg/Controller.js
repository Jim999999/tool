/**
 *
 * 注意两点：
 * 1.引入egg模块的Controller
 * 2.module.exports 暴露出来
 * 3.this 可解构 config, app, ctx, service, model , helper , logger等
 *
 */

'use strict';

const Controller = require('egg').Controller;
const os = require('os')

class HomeController extends Controller {
    // controller 有两种写法，类的写法通过 this.ctx，方法的写法直接通过 ctx 入参。

    async index() {

        const { ctx } = this;

        //请求发送之前，会触发一个 request 事件，允许对请求做拦截。    
        this.app.httpclient.on('request', req => {
            //console.log(' emit request..')
            req.url //请求 url
            req.ctx //是发起这次请求的当前上下文

            // 可以在这里设置一些 trace headers，方便全链路跟踪
        });

        //app.curl(url , options) === app.httpClient.request(url,options) 
        const result = await ctx.curl('http://www.tianqiapi.com/api?version=v9&appid=23035354&appsecret=8YvlPNrz', {
            headers: {
                "token": 'xxxxxxxxxxx'
            },
            //在请求正式发送之前，会尝试调用 beforeRequest 钩子，允许我们在这里对请求参数做最后一次修改
            beforeRequest: options => {
                // 可以设置全局请求 id，方便日志跟踪 
                //options.headers['x-request-id'] = uuid.v1();
            },
            method: "GET",
            contentType: 'json', //设置请求数据格式，默认是 undefined，HttpClient 会自动根据 data 和 content 参数自动设置。 
            data: {
                type: 1
            },
            dataType: 'json' //设置响应数据格式，默认不对响应数据做任何处理，直接返回原始的 buffer 格式数据。 支持 text 和 json 两种格式。
        })

        //请求结束之后会触发一个 response 事件，这样外部就可以订阅这个事件打印日志。
        this.app.httpclient.on('response', result => {
            //console.log('emit response..')
            result.res.status
            result.ctx //是发起这次请求的当前上下文
            result.req //对应的 req 对象，即 request 事件里面那个 req
        });

        ctx.body = result
            //ctx.body = 'hi, egg egg';
    }


    // test
    async show() {
        //console.log(os.cpus().length) //cpu核数
        // ctx 从当前对象this中解构出来
        const { app, ctx } = this;
        // console.log(ctx.query.name)
        // console.log(ctx.query) //{ name: 'xuxu' }
        // console.log(ctx.queries) //{ name: [ 'xuxu' ] }
        // console.log(ctx.querystring) //name=xuxu
        // console.log(this.config)
        // console.log(this)
        // console.log(app.config.env) //local
        // console.log(app.config.appMiddleware)
        // console.log(app.config.gzip.threshold)
        const formater_string = ctx.helper.formatUser('hihi..'); // 自定义助手函数

        ctx.body = 'show testing..' + formater_string;
    }


    async user() {
        const { app, ctx } = this;
        // let id = JSON.stringify(ctx.query);
        const id = ctx.params.id || 0;
        const name = ctx.params.name || 'hello';
        // console.log(ctx.params)

        let createRules = {
                id: {
                    //type: 'int'
                    type: 'number', // 年龄范围0-120
                    min: 0,
                    max: 120
                },
                name: { type: 'string' },
            }
            // 校验参数
            //ctx.validate(createRules);


        const user = await ctx.service.home.findUser();
        ctx.body = user;

        // ctx.body = 'Get the params : id=' + id + ', name= ' + name
    }


    async findOne() {
        //获取扩展extend/request的属性
        //console.log(this.ctx.request.foo)
        //设置扩展extend/response的属性 
        //this.ctx.response.foo = 'hahahaha' //此时，在头部响应中就有 x-response-foo: hahahaha 

        //设置 cookie , 默认的配置下，Cookie 是加签不加密的，浏览器可以看到明文，js 不能访问，不能被客户端（手工）篡改。
        //ctx.cookies.set(key, value, options)
        //this.ctx.cookies.set('name-age', 'namemmmm..')

        // Cookie 在浏览器端不能被修改，不能看到明文：
        // this.ctx.cookies.set('name-age', 'hhhh', {
        //     httpOnly: true, // 默认就是 true
        //     encrypt: true, // 加密传输
        // })

        //设置 session ， 在 Cookie 的基础上封装了 Session 
        //this.ctx.session.userId = 23
        //设置 session 属性时需要避免
        // 不要以 _ 开头    --> 该字段会在下一次请求时丢失
        // 不能为 isNew    --> 为内部关键字, 不应该去更改

        //await this.ctx.app.runSchedule('test_console'); //手动触发定时器
        let id = parseInt(this.ctx.params.id) || 1
        let user = await this.ctx.model.User.findByPk(id) //model下的模型名称User用大写标识
        this.ctx.body = user ? user : {}
    }


    async addUser() {
        const { app, ctx } = this;

        //const post = JSON.stringify(ctx.request.body);
        // ctx.body = 'addUser ok , data :' + post;
        const result = await ctx.service.home.addUser()
        ctx.body = result;
    }


    async findCar() {

        const { ctx } = this;


        const car = await ctx.service.car.findCar();
        ctx.body = car;
    }


    //login
    async login() {

        // 调用 rotateCsrfSecret 刷新用户的 CSRF token
        this.ctx.rotateCsrfSecret();

        this.ctx.body = { success: true };
    }

}

// 别忘了暴露出去
module.exports = HomeController;

