const express = require('express');
// const mongoose = require('mongoose');
const router = express.Router();
const request = require('request');

require('../models/model');

// 获取openid
router.get('/', function (req, res, next) {
    // let code = req.query.code;
    var appId = 'wx7895e9a08d4a5caa'; // 换成自己的APPID
    var secret = '4ea432cc8f71b192586847caecfb4812'; // 换成自己的secret
    var params = req.query.code;
    var url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + secret + '&js_code=' + params + '&grant_type=authorization_code';
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // console.log(body) 
        }
        res.send(body);
    })
    // res.send('hello');
    // request.get({
    //   url: 'https://api.weixin.qq.com/sns/jscode2session',
    //   json: true,
    //   data: {
    //     grant_type: 'authorization_code',
    //     appid: 'wx7895e9a08d4a5caa',
    //     secret: '0801b6a140a0a59305643d052994b5b5',
    //     js_code: code
    //   }
    // }, (err, response, data) => {
    //   if (response.statusCode === 200) {
    //     console.log("[openid]", data.openid)
    //     console.log("[session_key]", data.session_key)
  
    //     //TODO: 生成一个唯一字符串sessionid作为键，将openid和session_key作为值，存入redis，超时时间设置为2小时
    //     //伪代码: redisStore.set(sessionid, openid + session_key, 7200)
  
    //     res.json({ sessionid: sessionid })
    //   } else {
    //     console.log("[error]", err)
    //     res.json(err)
    //   }
    // })
  })

module.exports = router;
