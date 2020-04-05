<template>
  <div class="container">
    <div class="header">
      <div v-if="!user">
        <van-button type="info" size="large"
        custom-style="width:200px;"
        open-type="getUserInfo" @getuserinfo="getUserInfo">立即登录</van-button>
      </div>
      <div v-else>
        <img :src="user.avatarUrl" alt="">
        <div class="info">
          <p>{{user.nickName}}</p>
          <p>{{user.city}}</p>
        </div>
      </div>
    </div>
    <div class="main">
      <van-cell title="我要发布" icon="bars" is-link @click="showMine" />
      <van-cell title="我的发布" icon="bars" is-link @click="show_myPosts" />
      <van-cell title="我的收藏" icon="like" is-link @click="showPopup" />
      <van-cell title="我的收货地址" icon="location" is-link @click="showAddress" />
      <van-cell title="关于我们" icon="weapp-nav" is-link @click="showPopup" />
      <van-popup
        :show="show"
        close-icon-position="top-left"
        @close="onClose"
        custom-style="height: 70%;width: 70%"
      >
      <h3>关于我们</h3>
      <h4>©️copy right by cc</h4>
      <h4>2020/01/27</h4>
      </van-popup>
    </div>
    
  </div>
</template>

<script>

export default {
  components: {

  },
  data () {
    return {
      show:false
    }
  },
  computed: {
    user(){
      return this.$store.getters.user;
    }
  },
  methods: {
    getUserInfo(e){
      if(e.mp.detail.userInfo){
        console.log(e.mp.detail.userInfo); 
        //存储到vuex
        // this.$store.dispatch("setIsAuthenticated",true);
        this.$store.dispatch("setUser",e.mp.detail.userInfo)
        //获取code
        this.getCode();
      }
    },
    getCode(){
      wx.login({
        success: res => {
          console.log(res);
          console.log('login');
          this.getOpenid(res.code);
        }
      })
    },
    getOpenid(code){
      const appid = "wx7895e9a08d4a5caa";
      const secret = "0801b6a140a0a59305643d052994b5b5";

      this.$https.request({
        url:this.$interfaces.getOpenid,
        method:"get",
        data:{ code: code }
      })
      .then(res => {
        console.log(res.openid);
        console.log('openid');
        //将openid存储到vuex
        this.$store.dispatch("setOpenId",res.openid)
        //存储到数据库
        let user = this.$store.getters.user;
        let newUser = {
          userId:res.openid,
          username:user.nickName,
          userAvr:user.avatarUrl,
          city:user.city
        }
        this.$https.request({
          url:this.$interfaces.login,
          method:"get",
          data:{user:newUser}
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        })
      })
      .catch(err => console.log(err));   
    },
    showPopup(){
      this.show = true;
    },
    onClose() {
      this.show = false;
    },
    showMine(){
      wx.navigateTo({
        url:"../post/main"
      })
    },
    showAddress(){
      wx.navigateTo({
        url:"../myAddress/main"
      })
    },
    show_myPosts(){
      wx.navigateTo({
        url:"../myPosts/main"
      })
    }
  }
}
</script>

<style scoped>
.container{
  width: 100%;
  height: 100%;
}
.header{
  background: #ffd543;
  height: 160px;
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
}
.header img{
  height: 80px;
  width: 80px;
  border-radius: 10%; 
  margin-top: 20px;
}
.header .info{
  text-align: center;
}
.header .info p{
  font-size: 16px;
  font-weight: 600;
}
.main .van-cell{
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 10px;
  color: rgb(44, 41, 41);
}
.van-icon{
  margin-right: 4px;
}

</style>
