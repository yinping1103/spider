var http = require('http');
var fs = require('fs');//fs模块用于对系统文件及目录进行读写操作,分为同步读写和异步读写
var cheerio = require('cheerio')//抓取页面模块

//向地址发出get请求，会自动调用req.end()函数,返回的数据在回调函数中使用。
http.get("http://www.ss.pku.edu.cn/index.php/newscenter/news",function(res){
	var html = '';
	var news = [];
	res.setEncoding('utf-8');//使用utf-8进行解码
	//var chunks=[];
	res.on('data',function(chunk){//当data事件发生时，调用回调函数，获得请求服务器返回的数据
 		html += chunk;//html是该网页的源代码
	//效果等于chunks.push(chunk);
	});

    res.on('end',function(){//当end事件发生时，调用回掉函数
    // console.log(html);
    	var $ = cheerio.load(html);//用cheerio模块加载html页面
    
    	$('#info-list-ul li').each(function(index,item){//获取#info-list-ul下的li并且对其中的每一项进行遍历
	    	var news_item = {
	      	title:$('.info-title',this).text(),//显示类为.info-title的文字内容
	      	title:$('.time',this).text(),///显示类为.time的文字内容
	      	link:'http://www.ss.pku.edu.cn'+ $('a',this).attr('href'),主页网址加上a中属性为href的内容
	    	};

	  	news.push(news_item);//将每一个news_item放入news对象中
	    });

    	console.log(news);//输出news内容
  	});

}).on('error',function(err){
  console.log(err);//如果发生错误则打印错误
});

