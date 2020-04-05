//发布商品
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

require('../models/model');
const goodModel = mongoose.model('goodModel');

router.get('/',(req,res) => {
    console.log(req.query.good);
    var good = JSON.parse(req.query.good);
    var goodInsert = new goodModel({
        userId:good.userId,
        userName:good.userName,
        title:good.title,
        price:good.price,
        city:good.city,
        description:good.description,
        fileList:good.fileList,
        sort:good.sort,
        userAvr:good.userAvr
    });
    goodInsert.save(error => {
        // if (error) res.status(500).json({ error: 1 });
        if(error) res.send(error);
        else {
            console.log("商品信息已载入");
            res.json("商品信息已载入");
        }
    })
})

module.exports = router;
