//七牛云拿token
const express = require('express');
const router = express.Router();
const qiniu = require("qiniu");

router.get('/',(req,res) => {
    //客户端调用接口，生成token
    let accessKey = '36yPcyEv_qEt0oJWTPJfg0sZQUNsMLC8GPETJD-t';
    let secretKey = 'ZCtUO7SlcVo-3IIUOpWnvtyvI41HKC_kDds3ukRi';
    let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    let options = {
      scope: 'images442' //七牛资源目录
    };
    let putPolicy = new qiniu.rs.PutPolicy(options);
    let uploadToken = putPolicy.uploadToken(mac);
    // console.log(uploadToken);
    res.send(uploadToken);
    //把uploadToken返回给客户端
});



module.exports = router;
