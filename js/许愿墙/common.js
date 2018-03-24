/**
 * Created by bobo on 2017/9/8.
 */
/**
 * 封装了一个兼容版本的获取标签间文本内容的函数
 * @param ele
 * @returns {*}
 */
function getText(ele){
  // 能力检测  就是要看当前的浏览器是否支持此对象的属性或是方法
  if(typeof ele.innerText == 'string'){  // 一般是放boolean类型的值，或是关系表达式或是逻辑表达式
    return  ele.innerText;
  }else {
    return  ele.textContent;
  }
}
/**
 * 封装了一个兼容性的设置标签间文本内容的函数
 * @param ele
 * @param value
 */
function  setText(ele,value){
  // 能力检测
  if(typeof ele.innerText=='string'){
    ele.innerText = value;
  }else {
    ele.textContent = value;
  }
}
var zs = {
  name:'zs',
  age:20,
  sex:'男',
  sayHi:function (){

  },
  sayHello:function (){

  },
  playGame:function (){

  }
}
var  Txt = {
  // 属性就是变量，属性也可以存储任意的数据类型
  setText:function (ele,value){
    // 能力检测
    if(typeof ele.innerText=='string'){
      ele.innerText = value;
    }else {
      ele.textContent = value;
    }
  },
  getText:function (ele){
    // 能力检测  就是要看当前的浏览器是否支持此对象的属性或是方法
    if(typeof ele.innerText == 'string'){  // 一般是放boolean类型的值，或是关系表达式或是逻辑表达式
      return  ele.innerText;
    }else {
      return  ele.textContent;
    }
  }

};

var ele = {
    getNextElement:function (ele){
      //能力检测：就是要看当前的浏览器是否支持此对象 的属性或是方法
      if(ele&&ele.nextElementSibling){  // 高级浏览器支持的方式，只会获取下一个标签节点
        return ele.nextElementSibling;
      }else { // 低版本浏览器支持的方式  IE8及之前的浏览器
        ele = ele.nextSibling;
        while(ele&&ele.nodeType!=1){
          ele = ele.nextSibling;
        }
        return  ele;
      }
    },
    getPrevElement:function (ele){
      // 能力检测
      if(ele&&ele.previousElementSibling) { // 高级浏览器支持的方式
        return  ele.previousElementSibling;
      }else { // 低版本的浏览器
        ele = ele.previousSibling;
        while(ele&&ele.nodeType!=1){ // ele此对象，后面的意思是这个节点不是标签节点
          ele = ele.previousSibling;
        }
        return ele;
      }
    },
    getFirstElement:function (ele){
      // 能力检测：
      if(ele&&ele.firstElementChild){ // 高级浏览器支持的方式
        return ele.firstElementChild;
      }else {  //IE8这样的低级浏览器支持的方式
        ele = ele.firstChild;
        while(ele&&ele.nodeType!=1){ // nodeType只有等于1才是标签节点，不等于1就一直找
          ele = ele.nextSibling;
        }
        return ele;
      }
    },
    getLastElement:function (ele){
      // 能力检测
      if(ele&&ele.lastElementChild){
        return ele.lastElementChild;
      }else {
        ele = ele.lastChild;
        while(ele&&ele.nodeType!=1){
          ele =  ele.previousSibling;
        }
        return ele;
      }
    }
  }

function $$(id){
  return document.getElementById(id);
}

function  turnAll(source,target){
  var source = $$(source);
  var target = $$(target);
  var options = source.children;
  for(var i=0;i<options.length;i++){
    target.appendChild(options[i]);
    i--;
  }
}

function turnSelect(source,target){
  var source = $$(source);
  var target = $$(target);
  var options = source.children;
  for(var i=0;i<options.length;i++){
    if(options[i].selected){
      target.appendChild(options[i]);
      i--;
    }
  }
}