const express = require('express');
const app = express();
const mongoose = require('mongoose');

// 设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
 });

 var server = app.listen(3000,function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
})

mongoose.connect("mongodb://localhost/wxserver",{ useUnifiedTopology: true,useNewUrlParser:true })
        .then(() => {
           console.log("MongoDB connected");  
        })
        .catch(err => {
           console.log(err);   
        })

app.use('/update', require('./routes/update'));
app.use('/getOpenid', require('./routes/getOpenid'));
app.use('/getToken', require('./routes/getToken'));
app.use('/postGood', require('./routes/postGood'));
app.use('/getGoods', require('./routes/getGoods'));
// app.use('/getSort', require('./routes/getSort'));
app.use('/comment', require('./routes/comment'));
app.use('/login', require('./routes/login'));
