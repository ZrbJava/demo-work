// 1.创建http
var http = require("http");
// 引入读取文件核心模块
var fs = require("fs");

// 2.创建服务器
var server = http.createServer();
// 3.添加监听
server.listen("3001",() => {
    console.log("http://127.0.0.1:3001");
});
// 3.绑定事件
server.on("request",(req,res) => {
    // 4.获取当前url
    var url = req.url;
    console.log(url);
    
    // res.writeHeader(200,{
    //     // 返回的仅仅是文本值，如果包含标签，不会进行解析
    //     // text/html:会对返回值中的dom结构进行解析
    //     'Content-Type':'text/html;charset=utf-8'
    // });
    // 5.判断请求进行处理--路由+业务逻辑处理
    // fs读取资源的目录是相对于当前运行node的文件
    // __dirname:获取当前node服务器的根目录
    // 建议使用fs操作文件的时候可以考虑使用__dirname进行路径的拼接

    // 最终结论：在node中很少会写类似../的路径。
    fs.readFile(__dirname + url,(err,data) => {
        if(err) res.end("err");
        else if(url == "/css/index.css"){
            res.writeHeader(200,{
                // 返回的仅仅是文本值，如果包含标签，不会进行解析
                // text/html:会对返回值中的dom结构进行解析
                'Content-Type':'text/css;charset=utf-8'
            });
            res.end(data);
        }else{
            res.writeHeader(200,{
                // 返回的仅仅是文本值，如果包含标签，不会进行解析
                // text/html:会对返回值中的dom结构进行解析
                'Content-Type':'text/html;charset=utf-8'
            });
            res.end(data);
        }
    });
});