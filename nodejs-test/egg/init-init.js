安装
mkdir egg-test  && cd egg-test
npm init egg --type=simple
npm install 或 npm i

启动 
npm run dev

配置模板引擎
npm install egg-view-nunjucks -S

//改 config/plugin.js
 nunjucks: {
        enable: true,
        package: 'egg-view-nunjucks'
    }

//改 config/config.default.js
//设置默认模板引擎
    config.view = {
        defaultViewEngine: 'nunjucks',
        mapping: {
            '.html': 'nunjucks',
        },
    }
注意：是 config 目录，不是 app/config!

ctx.request.query.id 和 ctx.query.id 是等价的，ctx.response.body= 和 ctx.body= 是等价的。而获取 POST 的 body 应该使用 ctx.request.body，而不是 ctx.body。

路径
__dirname 　　 表示当前文件所在的目录的绝对路径
__filename 　　表示当前文件的绝对路径
module.filename ==== __filename 等价
process.cwd() 　　 返回运行当前脚本的工作目录的路径，一般情况下不变，在process.chdir()后，或者shelljs.cd切换目录后会发生变化
process.chdir() 　 改变工作目录
https://www.cnblogs.com/mengff/p/9753867.html

context简写为ctx 上下文
middleware , extend/request|reponse 中 this 就是 ctx，例如 this.cookies.get('foo')。
controller 中有两种写法，类的写法通过 this.ctx，方法的写法直接通过 ctx 入参。
helper，service 中的 this 指向 helper，service 对象本身，使用 this.ctx 访问 context 对象，例如 this.ctx.cookies.get('foo')。

使用 logger 模块
// controller
this.logger.debug('current user: %j', this.user);
// service
this.ctx.logger.debug('debug info from service');
// app/init.js
app.logger.debug('app init');
https://eggjs.org/zh-cn/core/logger.html


npx（node自带或者npm install -g npx）
作用：解决调用项目内部安装的模块问题 。原理很简单，就是运行的时候，会到node_modules/.bin路径和环境变量$PATH里面，检查命令是否存在。
http://www.ruanyifeng.com/blog/2019/02/npx.html

mocha测试库
http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html



egg.js手册
https://eggjs.org/zh-cn/intro/quickstart.html

egg-socket.io
Socket.IO 是一个基于 Node.js 的实时应用程序框架，在即时通讯、通知与消息推送，实时分析等场景中有较为广泛的应用。
支持 websocket、polling 两种数据传输方式以兼容浏览器不支持 WebSocket 场景下的通信需求。
egg框架提供了 egg-socket.io 插件，增加了以下开发规约：
namespace: 通过配置的方式定义 namespace（命名空间）
middleware: 对每一次 socket 连接的建立/断开、每一次消息/数据传递进行预处理
controller: 响应 socket.io 的 event 事件
router: 统一了 socket.io 的 event 与 框架路由的处理配置方式。

https://github.com/eggjs/egg-socket.io
https://socket.io/get-started/chat/
https://socket.io/docs/client-api/
https://www.cnblogs.com/edwardloveyou/p/10625152.html
https://www.axihe.com/edu/egg/tutorials/socketio.html
https://www.cnblogs.com/lxxhome/p/5980615.html
https://www.cnblogs.com/-lzx/p/4860268.html
