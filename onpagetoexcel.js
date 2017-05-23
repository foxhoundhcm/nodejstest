let XLSX = require("xlsx");

let Crawler = require("crawler");

global.data1 = [];
// let dateRegex = new RegExp("^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$");
// let regs = /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/g;
let regs = /\d\d\d\d-\d\d-\d\d \d\d:\d\d:\d\d/g
var c = new Crawler({
  // maxConnections : 10,
  rateLimit: 1000,

  callback: function(error, res, done) {
    if (error) {
      console.log(error);
    } else {
      var $ = res.$;
      // console.log(res.statusCode);
      console.log($(".ctitle").text());
      var ctitleinfo = $(".ctitleinfo").text();

      var datetime = ctitleinfo.match(regs);
      // console.log(ctitleinfo);
      // console.log(datetime[0]);
      // console.log($(".pbox").text());
      // console.log($(".pbox a").text());
      // console.log($(".pbox a").attr('href'));
      // var data = [];
      // global.data1.push({
      //   title: $(".ctitle").text(),
      //   time: datetime,
      //   // context: $(".pbox").text(),
      //   att: $(".pbox a").text(),
      //   atthref: $(".pbox a").attr('href')
      // });
      global.data1.push({
        序号: '1',
        名称: $(".ctitle").text(),
        时间: datetime[0],
        内容: $(".pbox").text(),
        附件: $(".pbox a").text(),
        附件链接: $(".pbox a").attr('href')
      });


      // var wb = json_to_sheet(global.data1);
      var ws = XLSX.utils.json_to_sheet(global.data1);
      var wb = {
        SheetNames: ['mySheet'],
        Sheets: {
          'mySheet': ws
        }
      }

      XLSX.writeFile(wb, 'nodejstest/output.xlsx');

    }

    done()
  }
});

data = c.queue("http://www.gxgp.gov.cn/ygswz/16268.htm");
