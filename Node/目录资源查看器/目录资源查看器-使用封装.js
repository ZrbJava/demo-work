var http = require("http");
var fs = require("fs");
var template = require("art-template");

// 引入自定义模块
var getList = require("./getDirectoryList.js");

var server = http.createServer();
server.listen(3003,() => {
    console.log("http://127.0.0.1:3003");
});
server.on("request",(req,res) => {
    var url = req.url;
    getList(__dirname,(err,data) => {
        var html = template(__dirname + "/views/manager.html",{"list":data});
        res.end(html);
    })
});