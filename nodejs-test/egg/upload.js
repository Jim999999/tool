const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path')

class UploadController extends Controller {


    async show() {
        //this.ctx.redirect('http://www.baidu.com')   // config.default.js  里设置 securty的 domainWhiteList

        //console.log(__dirname)       //  F:\phpstudy\PHPTutorial\WWW\eggjs\app\controller
        //console.log(__filename)      //  F:\phpstudy\PHPTutorial\WWW\eggjs\app\controller\upload.js
        //console.log(process.cwd())   //  F:\phpstudy\PHPTutorial\WWW\eggjs
        //console.log(path.resolve(__dirname)) //F:\phpstudy\PHPTutorial\WWW\eggjs\app\controller
        await this.ctx.render('upload')
    }


    async submit() {

        //console.log(this.ctx.request.files[0])
        let file = this.ctx.request.files[0]
        let dir = 'app/public/egg-mutipart-test/'
        let name = dir + path.basename(file.filename)
        try {
            fs.exists(dir, function(err) {
                if (!err) {
                    //console.log("文件不存在")
                    fs.mkdir(dir, function() {
                        console.log('文件创建成功')
                    })
                }
            })
            await fs.readFile(file.filepath, function(err, data) {
                fs.writeFile(name, data, function(erro, d) {
                    if (erro) this.ctx.throw('upload writeFile fail .' + erro)
                    console.log('upload ok')
                })
            })
        } catch (error) {
            this.ctx.throw('upload fail.')
        } finally {
            //删除临时文件
            await fs.unlink(file.filepath, err => {
                if (err) {
                    this.ctx.throw('unlink tmpfile failed.')
                }
            });
        }

        //对于多个文件，借助 ctx.request.files 属性进行遍历，然后分别进行处理

        this.ctx.body = 'ok';
    }


}


module.exports = UploadController;