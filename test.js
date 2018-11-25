var obj = {}
for (var i in arr) {
  obj[arr[i]] = true;
}
return Object.keys(obj);

var newArr = [];
for (var i in arr) {
  if (newArr.indexOf(arr[i]) === -1) {
    newArr.push(arr[i]);
  }
}
return newArr;

//深度克隆
function deepClone(oldObj, newObj) {
  for (var i in oldObj) {
    var prop = oldObj[i];

    if (prop === newObj) { //prop === oldObj
      continue;
    }

    if (typeof prop === 'object') {
      newObj[i] = (Array.isArray(prop)) ? [] : {};
      arguments.callee(prop, newObj[i])
    } else {
      newObj[i] = prop;
    }
  }
  return newObj;
}

var arr2 = deepClone(arr, []);
for (let i = 0; i < arr2.length; i++) {
  for (let j = i + 1; j < arr2.length; j++) {
    if (arr2[i] === arr2[j]) {
      arr2.splice(j, 1);
      j--;
    }
  }
}
return arr2;

function createxmlHttpRequest() {
  if (window.XMLHttpRequest) {
    return new XMLHttpRequest();
  } else {
    return new ActiveXObject('Microsoft.XMLHTTP');
  }
}
//元数据格式 data:{"user":"abc","pwd":"123"};
//目标数据格式 convertData(data):"user=abc&pwd=123"
function convertData(data) {
  if (typeof data === 'object') {
    var convertResult = "";
    for (var i in data) {
      convertResult += i + "=" + data[i] + "&";
    }
    // 去掉最后一个&
    convertResult.substring(0, convertResult.length - 1);
    return convertResult;
  } else {
    return data;
  }
}

// 原生ajax
function ajax() {
  var ajaxData = {
    type: arguments[0].type || 'GET',
    url: arguments[0].url || '',
    async: arguments[0].async || "true", //是否使用异步
    data: arguments[0].data || null, //发送数据
    dataType: arguments[0].dataType || 'text',
    contentType: arguments[0].contentType || 'application/x-www-form-urlencoded',
    beforeSend: arguments[0].beforeSend || function () {},
    success: arguments[0].success || function () {},
    error: arguments[0].error || function () {},
  }
  ajaxData.beforeSend();

  var xhr = createxmlHttpRequest();
  xhr.open(ajaxData.type, ajaxData.url, ajaxData.async);
  xhr.setRequestHeader('Content-Type', ajaxData.contentType);
  xhr.send(convertData(ajaxData.data));
  xhr.onReadyStateChange = function () {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        ajaxData.success(xhr.response);
      } else {
        ajax.error()
      }
    }
  }
}

//使用案例
ajax({
  type: "POST",
  url: 'ajax.php',
  dataType: 'json',
  data: {
    "val1": "abc",
    "val2": 123,
    "val3": "def"
  },
  beforeSend: function () {

  },
  success: function (msg) {
    console.log(msg);
  },
  error: function (msg) {
    console.log(msg);
  }
})
