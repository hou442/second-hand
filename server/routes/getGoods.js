const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
var ObjectID = require('mongodb').ObjectID;

require('../models/model');
const goodModel = mongoose.model('goodModel');

//首页商品
router.get('/',(req,res) => {
    goodModel.find({})
             .sort({_id:-1})
             .then(goods => {
                res.send(goods);
             })
             .catch(err => {
                res.send(err)
             })
})

//分类商品
router.get('/sort',(req,res) => {
   // console.log(req.query);
   let title = req.query.title;
   goodModel.find({sort:title})
            .then(goods => {
                res.send(goods);
            })
            .catch(err => {
                res.send(err)
            })
})

//我的收藏
router.get('/favor',(req,res) => {
   // console.log(req.query);
   let goodId = req.query.goodId;
   goodModel.find({_id:new ObjectID(goodId)})
            .then(goods => {
                res.send(goods);
            })
            .catch(err => {
                res.send(err)
            })
})

// 搜索商品
router.get('/search',(req,res) => {
   console.log(req.query);
   let content = req.query.title;
   let str = eval('/' + content + '/');
   goodModel.find({"title":{ "$regex":str }})
            .then(goods => {
               console.log(goods);
               res.send(goods);
            })
            .catch(err => {
               res.send(err)
            })
})

//我的发布
router.get('/myPosts',(req,res) => {
   let userId = req.query.userId;
   goodModel.find({userId:userId})
            .then(goods => {
               res.send(goods);
            })
            .catch(err => {
               res.send(err)
            })
})

module.exports = router;
