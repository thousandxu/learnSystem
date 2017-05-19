
/**
 * Module dependencies.
 */

var express = require('express'), 
      routes = require('./routes'),
      http = require('http'),
      https = require('https'),
      fs = require('fs');
var bodyParser = require('body-parser');
var session = require('express-session');
// var app = module.exports = express.createServer();
var app = express();
var domain = require('domain');
var d = domain.create();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('../app'));

// app.use(express.methodOverride()); //connect内建的中间件,协助处理POST请求,伪装PUT,DELETE和其他HTTP方法
app.use(express.static(__dirname + '/public'));  //connect内建的中间件,将根目录下的public文件夹作为存放静态文件的目录
app.use(session({secret:"test",saveUninitialized:true,resave:true}));

d.on('error', function(err) {
      console.error(err.stack);
      // mailSender.sendErrorMail(err);
});
app.use(function (req, res, next) {
        var url = req.originalUrl;
        console.log(url);
        //判断是否是静态资源
        if(req.path.indexOf('.css')>-1||req.path.indexOf('.js')>-1||req.path.indexOf('.html')>-1){
               next();
               return;  
        }
        if (url!='/SysUser/Syslogin'&&url!='/SysUser/Sysregister'&&url!='/SysUser/SyscheckAndUpdate'&&url!='/SysUser/Syslogout'&&url!='/SysUser/SendCode'&&url!='/SysUser/changeStatus'&&url!='/login.html'&&typeof(req.session.username) == "undefined"){
               res.status(401).json({errorMessage:"Not Authentication"});
               return;
        } else {
               next();
        }
});
// Enter this domain
d.run(function() {
        var httpServer = http.createServer(app);
        // var httpsServer = https.createServer(credentials, app);

        httpServer.listen(9898,function(){
          console.log('start web ');
        });
        // Routes
        var userRouter = require("./routes/user.js");
        var courseRouter = require("./routes/course.js");
        var bbsRouter = require("./routes/bbs.js");

        // app.get('/', routes.index);   //路由控制器,当用户访问默认路径 / 时,由routes下的index.js文件处理
        app.use('/user', userRouter); 
        app.use('/course', courseRouter); 
        app.use('/bbs', bbsRouter); 
        //exception handler
        app.use(function(err, req, res, next) {
          console.error(err);
        });
});
