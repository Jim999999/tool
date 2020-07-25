const http = require('http')
    // const chalk = require('chalk')
const mysql = require('mysql')
const app = require('express')
const events = require('events')
const fs = require('fs')
const zlib = require('zlib') //压缩库
const router = require('./router')


const hostname = '127.0.0.1'
const port = 8888

//实例化 , on 函数用于绑定事件函数，emit 属性用于触发一个事件
const eventEmitter = new events.EventEmitter();

//监听器（listener函数）
const connect = function(arg1, arg2) {
    console.log('connect to source ，recevice : ' + arg1 + ',' + arg2)

    //eventEmitter.emit('data_query', arg1, arg2);
    eventEmitter.emit('data_query');
}

//on监听绑定
eventEmitter.on('connected', connect);

eventEmitter.addListener('connected', function() { //为指定事件添加一个监听器到监听器数组的尾部 ， 同 on
    console.log('addListener add.')
});

// eventEmitter.on('connected', connect);//同个事件可以绑定两次
eventEmitter.on('data_query', function(arg1, arg2) {
    console.log('query data')
})

//返回指定事件的监听器数组。
// let funs = eventEmitter.listeners('connected');
// console.log(funs)

//触发
// eventEmitter.emit('error', 'error happen');
//eventEmitter.emit('connected', 'argment参数-1', 'argment参数-2');


//buffer（node内置类）为了处理二进制数据而加载
// const buf = new Buffer.from('runoob', 'ascii')
// console.log(buf.toString('hex')) //转为16进制
// console.log(buf.toString('base64')) //转为base64
// console.log(buf.toString('utf8')) //转为utf-8 ，默认

//fs库是node内置的，直接require即可
// const data = fs.readFileSync('index.php');
// console.log(data.toString())

// readStream = fs.createReadStream('index.php')
// readStream.pipe(fs.createWriteStream('out.php')) //自动创建 out.php


//链式 pipe管道控制流
//压缩文件
// fs.createReadStream('-index.html')
//     .pipe(zlib.createGzip()) 
//     .pipe(fs.createWriteStream('-index.html.rar'))
// console.log('完成压缩')

//解压文件
// fs.createReadStream('-index.html.rar')
//     .pipe(zlib.createGunzip())
//     .pipe(fs.createWriteStream('index.rar.html'))
// console.log('完成解压')

//作为exports属性和方法暴露处理
// const hello = require('./hello')
// console.log(hello.hello())

//作为module.exports 对象
// const hello = require('./hello')
// console.log(hello.name)


// 当前脚本的绝对路径, 如果在模块中，返回的值是模块文件的路径。
// console.log(__filename)
// 当前执行脚本所在的目录
// console.log(__dirname)


//定时器
// setTimeout(function() {
//     console.log('setTimeout只执行一次')
// }, 2000)

// setInterval(function() {
//     console.log('setInterval间隔2s不间断执行一次')
// }, 2000)

// console.log('当前目录: ' + process.cwd());
// 输出内存使用情况
// console.log(process.memoryUsage());


// var util = require('util');

// function Base() {
//     this.name = 'base';
//     this.base = 1991;
//     this.sayHello = function() {
//         console.log('Hello ' + this.name);
//     };
// }
// //showName方法作为Base方法（原型继承）
// Base.prototype.showName = function() {
//     console.log(this.name);
// };

// var objBase = new Base();
// objBase.showName(); //base
// objBase.sayHello(); //Hello base
// console.log(objBase); //Base { name: 'base', base: 1991, sayHello: [Function] }


// function Sub() {
//     this.name = 'sub';
// }

// //Sub继承Base
// util.inherits(Sub, Base);

// var objSub = new Sub();
// objSub.showName(); //sub
// console.log(objSub); //Sub { name: 'sub' } ,注意 Sub 仅仅继承了Base 在原型中定义的函数（ showName ），而构造函数内部创造的 base 属 性和 sayHello 函数都没有被 Sub 继承。


//文件系统
//异步
// fs.readFile('./-index.html', function(err, data) {
//     if (err) return console.error(err)
//     console.log('异步读取:'+data.toString())
// })

//同步
// let data = fs.readFileSync('./-index.html')
// console.log('同步读取:' + data.toString())

// open file
// fs.open('./write.txt', 'w+', function(err, fd) {

//     console.log('open ok.' + fd)
// })


// 文件属性信息
// fs.stat('./-index.html', function(err, stats) { //参数 stats 是 fs.Stats 对象
//     //console.log(stats)
//     console.log(stats.isFile()) //是否file
// })

// 文件writer
// fs.writeFile('./writer.txt', "tttttggggg\n", { flag: 'a+' }, function(err) {

//     // fs.readFile('./writer.txt', function(err, data) {
//     //     console.log('读取到:' + data.toString())
//     // })
// })

//文件read
// const buff = new Buffer.alloc(1024)
// fs.open('./-index.html', function(err, fd) {

//     fs.read(fd, buff, 0, buff.length, 0, function(err, bytes) {
//         if (err) return console.log(err)
//         if (bytes) {
//             console.log(buff.slice(0, bytes).toString())
//         }
//     })

//     fs.close(fd, function(err) {
//         if (err) return console.log(err)
//         console.log("文件关闭成功！");
//     })
// })

//文件内容ftruncate  -- 权限问题
// let buf = new Buffer.alloc(1024);
// fs.open('./-index.html', function(err, fd) {
//     if (err) return console.log(err)

//     fs.ftruncate(fd, 10, function(err) {
//         if (err) return console.log(err)

//         console.log('读截取的文本:')
//         fs.read(fd, buf, 0, buf.length, 0, function(err, bytes) {
//             if (err) return console.log(err)
//             if (bytes > 0) {
//                 console.log(buf.slice(0, bytes).toString());
//             }
//         })
//     })

//     fs.close(fd, function(err) {
//         if (err) return console.log(err)
//     })
//     console.log("文件关闭");
// })

// file 删除 - delete
// fs.unlink('./writer.txt', function(er) {
//     if (er) return console.log(er)
//     console.log("文件删除成功！");
// })


//创建目录
// fs.mkdir('./test', function(err) {
//     console.log('创建成功')
// })

//查看目录
// fs.readdir('./', function(err, files) {
//     // console.log(files)
//     files.forEach((file, index) => {
//         console.log(file)
//     })
// })

//删除目录
// fs.rmdir('test', function(err) {
//     console.log('ok')
// })

//获取系统参数
//const os = require('os')
// console.log(os.networkInterfaces()) //网络接口列表
// CPU 的字节序
// console.log('endianness : ' + os.endianness());
// // 操作系统名
// console.log('type : ' + os.type());
// // 操作系统名
// console.log('platform : ' + os.platform());
// // 系统内存总量
// console.log('total memory : ' + os.totalmem() + " bytes.");
// // 操作系统空闲内存量
// console.log('free memory : ' + os.freemem() + " bytes.");


//路径
const path = require('path')

// console.log(path.join('/tmp', 'hh.js')) // \tmp\hh.js

/**
 path.resolve([from ...], to)
 从后向前，若字符以 / 开头，不会拼接到前面的路径(因为拼接到此已经是一个绝对路径)；
 若以 ../ 开头，拼接前面的路径，且不含最后一节路径；
 若以 ./ 开头 或者没有符号 则拼接前面路径；
 需要注意的是：如果在处理完所有给定的 path 片段之后还未生成绝对路径，则再加上当前工作目录。
 如：
 path.resolve('/foo/bar', './baz');       //返回: '/foo/bar/baz'
 path.resolve('/foo/bar', '/tmp/file/');  //返回: '/tmp/file'
**/

// const file = '/tmp/dhe/ts.php';
// console.log(path.dirname(file)) //返回 /tmp/dhe
// console.log(path.basename(file)) //返回 ts.php
// console.log(path.extname(file)) //返回 .php
// console.log(path.parse(file)) //返回 { root: '/', dir: '/tmp/dhe', base: 'ts.php', ext: '.php', name: 'ts' }

//底层的网络通信的小工具 ( 创建 tcp socket等)
//const net = require('net')


const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain;charset=utf-8')

    //引入router
    router.router(req)

    // let arr = [{
    //     'key': '你xxxgg' + Math.round(Math.random(100) * 100, 2),
    //     'key2': '你xxxxeew',
    // }];
    // let str = JSON.stringify(arr);
    let obj = {
        name: 'xxxx',
        age: 23,
        addr: 'guangzhou',
        class: 'No.1',
    };
    str = JSON.stringify(obj);
    res.end(str);
})

server.listen(port, hostname, () => {
    console.log(`服务器运行 http://${hostname}:${port}/`)
})