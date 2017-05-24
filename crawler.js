let Crawler = require("crawler");

let XLSX = require("xlsx");

// var redis = require('redis'),
//   RDS_PORT = 6379,
//   RDS_HOST = '192.168.1.200',
//   RDS_OPTS = {},
//   client = redis.createClient(RDS_PORT, RDS_HOST, RDS_OPTS);

global.url = [];
global.data1 = [];

// client.on('ready', function(err) {
//   console.log('ready');
//
// })

var indexCrawler = new Crawler({
  rateLimit: 1000,
  callback: function(error, res, done) {
    if (error) {
      console.log(error);
    } else {

      var $ = res.$;
      $("div.c1-bline").each(function(idx, element) {
        var $e = $(element);
        var href = $e.find('.f-left a').attr('href')
        // console.log($e.find('.f-left a').attr('title'));
        // console.log(href);
        global.url.push(href);
      });

      console.log(res.request.uri.href + " done");
    }

    done();
  }
});

var pageCrawler = new Crawler({

  rateLimit: 1000,

  callback: function(error, res, done) {
    if (error) {
      console.log(error);
    } else {
      var $ = res.$;
      // console.log(res.statusCode);
      console.log($(".ctitle").text());
      var ctitleinfo = $(".ctitleinfo").text();

      let regs = /\d\d\d\d-\d\d-\d\d \d\d:\d\d:\d\d/g;
      var datetime = ctitleinfo.match(regs);

      global.data1.push({

        名称: $(".ctitle").text(),
        时间: datetime[0],
        内容: $(".pbox").text(),
        // 附件: $(".pbox a").text(),
        // 附件链接: $(".pbox a").attr('href')
        附件: $(".pbox ul li a").text(),
        附件链接: $(".pbox ul li a").attr('href')
      });



    }

    done()
  }
});

// c.queue("http://www.gxgp.gov.cn/ygswz/index.htm");

pageCrawler.on('drain', function() {
  var ws = XLSX.utils.json_to_sheet(global.data1);
  var wb = {
    SheetNames: ['mySheet'],
    Sheets: {
      'mySheet': ws
    }
  }
  XLSX.writeFile(wb, 'nodejstest/output.xlsx');
});

indexCrawler.on('drain', function() {
  console.log('index done!')
  // console.log(global.url);
  pageCrawler.queue(global.url);
});





let pageurls = [];
var pagenum = 7;
for (var i = 0; i < pagenum; i++) {
  let pageurl = 'http://www.gxgp.gov.cn/zbgkzb/index_' + (i + 1) + '.htm';
  // console.log(pageurl);
  pageurls.push(pageurl);

};

indexCrawler.queue(pageurls);


// c.queue(pageurl);
