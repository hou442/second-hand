<template>
    <div class="container">
        <div class="header">
            <swiper indicator-dots = true class="imgList">
                <swiper-item v-for="(item,index) in goods.fileList" :key="index">
                    <img :src="item.url" alt="" :data-previewurl="item">
                </swiper-item>
            </swiper>
            <p class="title">{{goods.title}}</p>
            <span class="price">￥{{goods.price}}</span>
            <span v-show="if_favor" class="favor" @click="handle_favor">收藏
                <van-icon name="like" class="favor_icon"/>
            </span>
            <span v-show="!if_favor" class="favor" @click="handle_favor">收藏
                <van-icon name="like-o" class="favor_icon"/>
            </span>
            <van-divider contentPosition="center">商品描述</van-divider>
            <p class="desc">{{goods.description}}</p>
        </div>
        <div class="user">
            <img :src="goods.userAvr" class="img_avr">
            <span class="name">{{goods.userName}}</span>
            <span class="usercity">{{goods.city}}</span>
        </div>
        <Comment :goods="goods" :cmtList="cmtList" @freshCmt="getComments"></Comment>
    </div>
</template>

<script>
import Comment from '../../components/comment'
export default {
    name:"goods",
    data () {
        return {
            goods:null,
            cmtList:[],
            if_favor:false
        }
    },
    components: {
        Comment
    },
    // computed: {
    //     if_favor(){
    //         return wx.getStorageSync(this.goods._id);
    //     }  
    // },
    onLoad(options){
        this.goods = JSON.parse(options.goods);
        console.log(this.goods);
        this.getComments();
        this.if_favor = wx.getStorageSync(this.goods._id);
    },
    methods: {
        getComments(){
            this.$https.request({
                url:this.$interfaces.comment + 'getCmt/',
                method:"get",
                data:{goodId:this.goods._id}
            })
            .then(res => {
                console.log(res);
                this.cmtList = res;
            })
            .catch(err => {
                console.log(err);
            })
        },
        handle_favor(){
            let tmp = wx.getStorageSync(this.goods._id);
            if(tmp){
                wx.setStorageSync(this.goods._id,false);
            }else{
                wx.setStorageSync(this.goods._id,true)
            }
            this.if_favor = wx.getStorageSync(this.goods._id);
        }
    }
}
</script>

<style>
Page{
    background-color: #f3f3f3;
}
.container{
    margin-left: 2.5vw;
    margin-right: 2.5vw;
    position: relative;
}
.header{
    background-color: #ffffff;
    margin-bottom: 10px;
    border-radius: 3%;
    height: 80vh;
}
.imgList{
    height: 50vh;
    width: 100%;
    margin-bottom: 0.2rem;
}
.imgList img{
    width: 100%;
    height: 100%;
}
.price{
    font-size: 1.5em;
    color: red;
    font-weight: 700;
}
.favor{
    position:absolute;
    right: 0;
    font-size: 1.2em;
    font-weight: 700;
}
.favor_icon{
    font-size: 16px;
}
.title{
    font-weight: 700;
    font-size: 1.4em;
}
.desc{
    font-size: 1.2em;
    margin-left: 5px;
    font-weight: 600;
}
.user{
    width: 100%;
    background-color: #ffffff;
    position: relative;;
    border-radius: 3%;
    height: 10vh;
    display: flex;
    align-items: center;
}
.user .img_avr{
    width: 8vh;
    height: 8vh;
    border-radius: 10%;
    position: absolute;
    left:10px;
}
.user .name{
    font-size: 1.2em;
    font-weight: 700;
    position: absolute;
    left: 70px;
    margin-left: 5px;
}
.user .usercity{
    font-size: 1em;
    position: absolute;
    right: 10px;
    font-weight: 700;
}
</style>