const url = require('url')
const util = require('util')


exports.router = function(request) {

    //console.log(__filename)
    console.log('router:' + request.url)
    console.log(util.inspect(url.parse(request.url, true)))
}