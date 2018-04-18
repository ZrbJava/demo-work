var fs = require("fs");

function getList(path,callback){
    var count =0;//标记当前获取到了的详细信息的资源的数量
    // 1.获取指定目录下的所有目录和文件
    fs.readdir(path,(err,files) => {
        if(err) callback(err);
        else{
            // files:获取当前目录下所有的文件夹和文件名称
            // __dirname + files[i]:就是当前资源的全路径，我们可以通过全路径获取当前资源对象，进而获取资源对象的相关属性
            var allFiles = []; //存储所有文件
            var allDirs = [];//所有文件夹
           files.forEach(function(fileName,index){
                var path = __dirname+"/"+fileName;
                // 获取指定路径的资源的详细属性
                // console.log(__dirname+"\\"+files[i]);
                fs.stat(path,(err,stats) => {
                    if(err) callback(err);
                    else{
                        // 每次读取获取到一个文件或文件夹对象
                        var sigerFile = {};
                        sigerFile.fileName = fileName;
                        sigerFile.size = stats.size; //大小
                        sigerFile.mtime = stats.mtime; //最后的修改日期
                        // isFile:如果是文件，返回true,否则返回false
                        sigerFile.isFile = stats.isFile();
                        // 将生成的文件对象添加到数组
                        if(sigerFile.isFile){
                            allFiles.push(sigerFile);
                        }else{
                            allDirs.push(sigerFile);
                        }
                        count ++;
                        // 添加判断，判断文件读取是否已经全部完成
                        if(count == files.length){
                            // 实现排序,并不需要重新覆盖原始的数组
                            allDirs.sort(comByName);
                            allFiles.sort(comByName);
                            // 拼接两个数组，将文件夹的数据旋转在数组的前面  concat有返回值，返回拼接之后的数组，
                            allDirs = allDirs.concat(allFiles);
                            // 调用模板进行页面结构的渲染
                            callback(null,allDirs);
                        }
                    }
                });
           });
        }
    })
}

function comByName(x,y){
    if(x.fileName < y.fileName){
        return -1;
    }
    return 1;
    // return x.fileName > y.fileName;
}

function comBySize(x,y){
    if(x.size > y.size) {
        return 1;
    }
    return -1;
}

// 暴露外部使用
module.exports = getList;