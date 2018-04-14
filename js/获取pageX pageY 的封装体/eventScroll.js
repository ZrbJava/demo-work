
var eventScroll = {
    //获取页面page需要做兼容
    getPageX:function(e){
        return this.getEvent(e).pageX || (this.getClientX(e)+(window.pageXOffset||document.documentElement.scrollLeft || 0));
    },
    getPageY:function(e){
        return this.getEvent(e).pageY || (this.getClientY(e)+(window.pageYOffset||document.documentElement.scrollTop || 0));
    },
    //事件对象兼容处理
    getEvent:function(e){
      return   e || window.event;
    },
    //获取可视区的坐标
    getClientX:function(e){
        //eventScroll.getEvent.clientX
        return this.getEvent(e).clientX;
        e.clientX;
    },
    getClientY:function(e){
        return this.getEvent(e).clientY;
    }
}


