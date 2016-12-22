
/**
 * Module dependencies.
 */

var express = require('express'), 
      routes = require('./routes');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');  //设置views文件夹为存放视图文件的目录，即存放模板文件的地方， __dirname为全局变量，存储当前正在执行的脚本所在的目录
  // app.set('view engine', 'jade');   //设置视图模板引擎为jade
  app.use(express.bodyParser());  //解析请求体，支持application/json、application/x-www-form-urlencoded和multipart/form-data
  /* 
    等同于:
    app.use(express.json());
    app.use(express.urlencoded()); 
    app.use(express.multipart()); 
  */
 /*
   app.use(express.favicon())  connect中间件，使用默认的favicon图标
   app.use(express.favicon(_dirname + '/pulic/images/favicon.ico'))  自定义图标放在/public/images文件夹下
  */
  app.use(express.methodOverride()); //connect内建的中间件,协助处理POST请求,伪装PUT,DELETE和其他HTTP方法
  app.use(app.router);  //调用路由解析规则
  app.use(express.static(__dirname + '/public'));  //connect内建的中间件,将根目录下的public文件夹作为存放静态文件的目录
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);   //路由控制器,当用户访问默认路径 / 时,由routes下的index.js文件处理

app.listen(3000, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
