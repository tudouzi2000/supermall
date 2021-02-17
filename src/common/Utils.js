 /* 防抖操作：防止refresh在短时间内多次刷新*/
export function  debounce(func,delay){
  let timer = null;
  return function(){
  if(timer) clearTimeout(timer)
  timer = setTimeout(() => {
      func.apply(this);
  }, delay);
  }
}

/* 封装一个日期函数 */
export function formatDate(date, fmt) {
  // 1.获取年份  y+ 表示匹配1个或多个y  y*表示0个或者多个y y?表示0个或者1个y
  if (/(y+)/.test(fmt)) {
       /* RegExp这个对象会在我们调用了正则表达式的方法后, 自动将最近一次的结果保存在里面, */
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  // 
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
 
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};
// 00 + 输入的数字 再截取掉输入的长度 
function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};

