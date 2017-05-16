

console.log("广西壮族自治区政府采购中心-预公示");
let cheerio = require('cheerio');
let http = require('http');
let iconv = require('iconv-lite');



let url = 'http://www.gxgp.gov.cn/ygswz/index.htm';

let pagenum = 84;

function getUrl(url){
  return new Promise(function(resolve,reject){

    var titles = [];
    // console.log(url);

    http.get(url, function(sres) {
      var chunks = [];
      sres.on('data', function(chunk) {
        chunks.push(chunk);
      });
    sres.on('end', function() {

      //由于咱们发现此网页的编码格式为gb2312，所以需要对其进行转码，否则乱码
      //依据：“<meta http-equiv="Content-Type" content="text/html; charset=gb2312">”
      var html = iconv.decode(Buffer.concat(chunks), 'gb2312');
      var $ = cheerio.load(html, {decodeEntities: false});

      let href = $('a').each(function(idx,element){
        let $element = $(element);
        // console.log($element.attr('href'));
      });
      let $page = $('.pg-3');
      // console.log($page);
      $page.find('a').each(function(idx,element){
        let $element = $(element);
        // console.log($element.attr('href'));
      });

      $('div.c1-bline').each(function (idx, element) {
        var $element = $(element);

        // console.log($element.find('.f-right').text());
        titles.push({
          // title: $element.text()
          title:$element.find('.f-left a').attr('title'),
          time:$element.find('.f-right').text(),
          href:$element.find('.f-left a').attr('href')
        })

      })
      resolve(titles);
      // console.log(titles);
      // return titles;
    });

  });

  });

};


  let pageurls = [];
  for (var i = 0; i < pagenum; i++) {
    let pageurl = 'http://www.gxgp.gov.cn/ygswz/index_'+(i+1)+'.htm';
    // console.log(pageurl);
    pageurls.push(pageurl);
  };

  let titles = [];
  for (url of pageurls) {
    // console.log(url);
    // getUrl(titles);
    var promise = getUrl(url);
    promise.then(function(value){
      titles = [...titles,...value];
      console.log(titles.length);
    },function(err){
      console.log(err);
    });
    // sleep(1000);
  };

  // console.log('haha'+titles);
