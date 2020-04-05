var moment = require('moment');
var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/goods', { useNewUrlParser: true });
var Model = {};

//用户信息表
var userSchema = new mongoose.Schema({
    userId:{ type:String, require:true },
    username:String,
    userAvr:String,
    city:String,
});
Model.userModel = mongoose.model('userModel', userSchema);

//商品信息表
var goodSchema = new mongoose.Schema({
    userId:{ type:String, require:true },
    // goodId:{ type:String, require:true },
    userName:String,
    userAvr:String,
    title:String,
    price:Number,
    city:String,
    description:String,
    fileList:Array,
    sort:String,
    createTime: {
        type: String,
        default: () => moment(new Date()).format('YYYY-MM-DD')
    },
    favor: {type:Number,default:0}
});
Model.goodModel = mongoose.model('goodModel',goodSchema);

//商品评论表
var commentSchema = new mongoose.Schema({
    goodId: { type: mongoose.Schema.ObjectId, ref: 'goodModel' },
    userId: String,
    userAvr: String,
    userName: String,
    cmtId: String,
    content: String,
    // createAt: { type: Date, default: Date.now }
    createAt: {
        type: String,
        default: () => moment(new Date()).format('YYYY-MM-DD')
    }
}, { versionKey: false });
Model.commentModel = mongoose.model('commentModel', commentSchema);

module.exports = Model;