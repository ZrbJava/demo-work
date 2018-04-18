/**
 * 功能：匀速动画
 * @param element
 * @param target
 * @param step
 */
function animate(element,target,step){
  clearInterval(element.timer)
  element.timer = setInterval(function(){
    var currentLeft = element.offsetLeft;
    currentLeft += target<=currentLeft?-step:step;
    element.style.left = currentLeft + "px";
    if(Math.abs(target-currentLeft)<=step){
      clearInterval(element.timer);
      element.style.left = target + "px";////如果currentLeft超过目标位置时，强制将其赋值为目标位置
    }
  },20)
}
/**
 * 动能：缓慢动画
 * @param element
 * @param obj
 */
function slowAnimate(element,obj){
  clearInterval(element.timer)
  element.timer = setInterval(function(){
    var flag = true;//假设法，只有一个条件没有达到，就继续执行定时器
    for(attr in obj){
      var target = obj[attr];
      var current = getStyle(element,attr);
      current = parseInt(current);
      console.log(current);
      var step = (target-current)/10;
      step = target<=current?Math.floor(step):Math.ceil(step);
      current+=step;
      element.style[attr] = current + "px";
      if(target!=current){
        flag = false;
      }
    }
    //当所有条件都满足的时候的清除定时器
    if(flag){
      clearInterval(element.timer);
    }
  },20)
}

/*
 * 功能：解决css样式对象的兼容问题部分
 * @param element
 * @param attr
 * @returns {*}
 */
function getStyle(element,attr) {
  if(window.getComputedStyle){
    return current = window.getComputedStyle(element,null)[attr];
    //ie9以上及各大主流浏览器支持此属性
  }else{
    return current = element.currentStyle[attr];//ie9一下支持
  }
}
