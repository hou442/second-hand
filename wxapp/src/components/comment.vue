<template>
  <div class="comment">
      <p class="cmt_title">留言
          <span>({{cmt_num}})</span>
      </p>
      <van-divider />
      <div class="cmt_post">
        <img src="../../static/images/avr.jpeg" class="cmt_avr">
        <van-search class="cmt_input" placeholder="咨询了解，请输入你的留言" 
        left-icon="" 
        use-action-slot
        background="#ffd543"
        @change="handle_input">
        <!-- <van-button class="cmt_btn" round type="info">发布</van-button> -->
            <view slot="action" @click="postCmt">发布</view>
        </van-search>
      </div>
      <div class="cmt_list" v-for="(item,index) in cmtList" :key="index">
        <img :src="item.userAvr" class="cmt_avr">
        <p class="cmt_username">{{item.userName}}</p>
        <span class="cmt_content">{{item.content}}</span>
        <span class="cmt_time">{{item.createAt}}</span>
        <van-divider />
      </div>
      <van-toast id="van-toast" />
  </div>
</template>

<script>
import Toast from '../../dist/wx/static/vant/toast/toast';
export default {
    data () {
        return {
            content:"",
            cmtList:[]
        }
    },
    props: {
        goods:Object,
        cmtList:[]
    },
    computed: {
        cmt_num(){
            return this.cmtList.length;
        }  
    },
    methods: {
        handle_input(event){
            this.content = event.mp.detail;
        },
        postCmt(){
            //检查是否登录
            let user = this.$store.getters.user;
            if(!user){
                Toast.fail('请先登录');
                setTimeout(() => {
                    wx.switchTab({url:'../mine/main'});
                },2000);
            }else{
                console.log(user);
                let cmt = {
                    goodId:this.goods._id,
                    userId:this.$store.getters.openId,
                    userAvr:user.avatarUrl,
                    userName:user.nickName,
                    content:this.content
                }
                this.$https.request({
                    url:this.$interfaces.comment + 'postCmt/',
                    data:{cmt:cmt}
                })
                .then(res => {
                    console.log(res);
                    Toast.success('留言成功');
                    this.$emit('freshCmt');
                })
                .catch(err => {
                    console.log(err);
                    Toast.fail('留言失败')
                })
            }
        }
    }
}
</script>

<style>
.comment{
    background-color: #ffffff;
    width: 100%;
    margin-top: 10px;
    border-radius: 3%;
    height:100%;
}
.cmt_title{
    font-weight: 600;
    font-size: 1.2em;
    height: 3vh;
    margin-left: 10px;
    padding-top: 10px;
}
.cmt_post{
    margin-bottom: 10px;
    overflow: hidden;
}
.cmt_avr{
    width: 12vw;
    height: 12vw;
    border-radius: 10%;
    margin-left: 10px;
    float: left;
}
.cmt_input{
    float: left;
    /* display: inline-block; */
    height: 12vw;
    width: 78vw;
}
.cmt_list{
    margin-top: 10px;
    display: block;
}
.cmt_list img{
    margin-right: 5px;
}
.cmt_username{
    font-weight: 700;
    margin-bottom: 10px;
}
.cmt_content{
    font-size: 1.2em;
    margin-bottom: 10px;
}
.cmt_time{
    color: gray;
    font-weight: 300;
    float:right;
    margin-right: 5px;
}
</style>