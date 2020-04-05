//发布留言
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

require('../models/model');
const commentModel = mongoose.model('commentModel');

router.get('/postCmt',(req,res) => {
    console.log(req.query.cmt);  
    let cmt = JSON.parse(req.query.cmt);
    var cmtInsert = new commentModel({
        goodId:cmt.goodId,
        userId:cmt.userId,
        userAvr:cmt.userAvr,
        userName:cmt.userName,
        content:cmt.content
    });
    cmtInsert.save(error => {
        // if (error) res.status(500).json({ error: 1 });
        if(error) res.send(error);
        else {
            console.log("留言已载入");
            res.json("留言已载入");
        }
    })
})

router.get('/getCmt',(req,res) => {
    commentModel.find({goodId:req.query.goodId})
                .then(goods => {
                    res.send(goods);
                })
                .catch(err => {
                    res.send(err)
                })
});

module.exports = router;
