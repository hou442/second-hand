const express = require('express');
// const mongoose = require('mongoose');
const router = express.Router();

require('../models/model');
// const Update = mongoose.model('update');

router.get('/',(req,res) => {
    res.send('This is test');
});

// router.get('/123',(req,res) => {
//     Test.find({name:'hhb'})
//         .then(test => {
//             res.send(test);
//         })
// })


module.exports = router;