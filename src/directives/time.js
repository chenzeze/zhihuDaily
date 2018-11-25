var Time = {
  // 获取当前时间戳
  getUnix() {
    var date = new Date();
    return date.getTime();
  },
  // 获取今天0点0分0秒的时间戳
  getTodayUnix() {
    var date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date.getTime();
  },
  // 获取今年1月1日0点0分0秒的时间戳
  getYearUnix() {
    var date = new Date();
    date.setMonth(0);
    date.setDate(1);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date.getTime();
  },
  // 获取标准年月日
  getLastDate(time) {
    var date = new Date(time);
    var month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    return date.getFullYear() + '-' + month + '-' + day;
  },
  // 转换时间
  getFormatTime(timestamp) {
    var now = this.getUnix();
    var today = this.getTodayUnix();
    var year = this.getYearUnix();
    var timer = (now - timestamp) / 1000;
    var tip = '';
    // 小于1s
    if (timer <= 0) {
      tip = '刚刚';
      //小于1分钟
    } else if (Math.floor(timer / 60) <= 0) {
      tip = '刚刚'
      //小于1小时
    } else if (timer < 3600) {
      tip = Math.floor(timer / 60) + '分钟前';
      //小于1天
    } else if (timer >= 3600 && (timestamp - today) >= 0) {
      tip = Math.floor(timer / 3600) + '小时前';
    } else if (timer / 86400 <= 31) {
      tip = Math.ceil(timer / 86400) + '天前';
    } else {
      tip = this.getLastDate(timestamp);
    }
    return tip;
  }
}
// 自定义指令 v-time
export default {
  bind: function (el, binding) {
    el.innerHTML = Time.getFormatTime(binding.value * 1000);
    el._timeout_ = setInterval(function () {
      el.innerHTML = Time.getFormatTime(binding.value * 1000);
    }, 60000);
  },
  unbind: function (el) {
    clearInterval(el._timeout_);
    delete el._timeout_;
  }
}
