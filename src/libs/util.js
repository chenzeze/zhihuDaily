var Util = {};
// 获取今天的时间戳
Util.getTodayTime = function () {
  const date = new Date();
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date.getTime();
}

// 获取前一天的日期
Util.prevDay = function (timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
  const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
  return year + "" + month + "" + day;
}

// 解决知乎的图片防盗链
// 把知乎的url替换成这个图片代理网站的url，这样图片就可以显示了。
Util.replaceUrl = function (srcUrl) {
  return srcUrl.replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p')
}
export default Util;
