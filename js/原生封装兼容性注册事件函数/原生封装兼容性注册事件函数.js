function addEvent(element,type,callback){
    if(element.addEventListener){
        element.addEventListener(type,callback,false);
    }else if(element.attachEvent){
        element.attachEvent("on"+type,callback);
    }else {
        if(element["on"+type] == null){
            element["on"+type] = callback;
        }else {
            var oldFun = element["on"+type];
            element["on"+type] = function(){
                oldFun();
                callback();
            }
        }
    }
}