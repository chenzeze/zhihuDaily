var express = require('express');
var request = require('request');

var app = express();
var themes = require('./static/mock/themes.json');

app.get('/themes', function (req, res) {
  res.send(themes).end();
});

// 使用node中转
// 过往消息
app.get('/news/before/:dateStr', function (req, res) {
  var dateStr = req.params.dateStr;
  var options = {
    method: "GET",
    url: "http://news-at.zhihu.com/api/4/news/before/" + dateStr
  };
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    res.json(JSON.parse(body))
  });
  //   var dateStr = req.params.dateStr;
  //   var data = recommendlist.filter(item => {
  //     if (item.date === dateStr) {
  //       return item;
  //     }
  //   })
  //   res.send(data).end();
})

//新闻对应短评论查看
app.get('/story/:id/short-comments', function (req, res) {
  var id = req.params.id;
  var options = {
    method: "GET",
    url: "https://news-at.zhihu.com/api/4/story/" + id + "/short-comments"
  };
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    res.json(JSON.parse(body))
  });
  2
})

//消息内容获取
app.get('/news/:id', function (req, res) {
  var id = req.params.id;
  var options = {
    method: "GET",
    url: "https://news-at.zhihu.com/api/4/news/" + id
  };
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    res.json(JSON.parse(body))
  });
})

//解决知乎图片访问限制问题
app.get('/img', function (req, res) {
  var url = req.query.url;
  var options = {
    method: "GET",
    url: url,
    headers: {
      "Referer": 'https://daily.zhihu.com'
    }
  };
  req.pipe(request(options)).pipe(res);
})

app.listen(8010);
