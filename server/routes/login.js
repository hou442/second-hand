//新用户登录存储信息
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

require('../models/model');
const userModel = mongoose.model('userModel');

router.get('/',(req,res) => {
    let user = JSON.parse(req.query.user);
    let that = this;
    userModel.find({userId:user.userId},(err,docs) => {
        if (docs) res.send('欢迎老用户');
        else{
            let userInsert = new userModel({
                userId:user.userId,
                userName:user.username,
                userAvr:user.userAvr,
                city:user.city
            });
            userInsert.save(error => {
                if(error) res.send(error);
                else {
                    console.log("用户信息已载入");
                    res.json("用户信息已载入");
                }
            })
        }
    })    
});

module.exports = router;

