let Crawler = require("crawler");

var c = new Crawler({
  maxConnections : 10,

  callback : function(error,res,done) {
    if(error){
      console.log(error);
    }else{
      var $ = res.$;
      // console.log(res.statusCode);
      console.log($("title").text());
      console.log(res.request.uri + "done");
    }

    done();
  }
});

c.queue("http://www.gxgp.gov.cn/ygswz/index.htm");

let pageurls = [];
var pagenum = 84
for (var i = 0; i < pagenum; i++) {
  let pageurl = 'http://www.gxgp.gov.cn/ygswz/index_'+(i+1)+'.htm';
  // console.log(pageurl);
  pageurls.push(pageurl);

};

c.queue(pageurls);
