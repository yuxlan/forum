// 开启服务 生产环境下

process.env.NODE_ENV = process.env.NODE_ENV||'development';

var path = require('path');
var express = require('express');
var favicon = require('serve-favicon');

var app = express();
var port =  process.env.PORT||5000;

app.use(express.static(path.join(__dirname)));

app.use(favicon(path.join(__dirname,'public','favicon.jpg')));
app.set('views',path.join(__dirname,'public'));
app.set('view engine','ejs');


app.get('*',function(req,res,next){
    res.sendFile(path.join(__dirname,'index.html'));
});


app.listen(port,function(err){
    if(err){
        console.log(err)
    }
    console.log('listening on http://localhost:%s/ and in %s',port,process.env.NODE_ENV);
})



