<template>
  <div class="container">
    <van-nav-bar title="我的收藏"/>
    <div class="cardList">
        <Card v-for="(item,index) in goodsList" :key="index"
        :goods="item" @showDetail="showDetail(item)">
        </Card>
    </div>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
import Card from '../../components/card';
import Toast from '../../../dist/wx/static/vant/toast/toast';
export default {
  components: {
      Card
  },
  data () {
    return {
      myFavor:[],
      goodsList:[]
    }
  },
  methods: {
  },
  onShow(){
    //判断登录状态
    //检查是否登录
    let user = this.$store.getters.user;
    if(!user){
        Toast.fail('请先登录');
        setTimeout(() => {
            wx.switchTab({url:'../mine/main'});
        },2000);
        return false;
    }
    this.getData();
  },
  methods: {
    getData(){
      this.myFavor = [];
      this.goodsList = [];
      console.log(this.goodsList);
      
      var that = this;
      try {
        const res = wx.getStorageInfoSync()
        let allKeys = res.keys;
        allKeys.forEach(item => {
          if(wx.getStorageSync(item)){
            that.myFavor.push(item);
          }
        })
        // console.log(this.myFavor);
        this.myFavor.forEach(item => {
          this.$https.request({
                url:this.$interfaces.getGoods + '/favor',
                method:"get",
                data:{goodId:item}
            })
            .then(res => {
              // console.log(res);
              this.goodsList.push(res[0]);
              // console.log(this.goodsList);
            })
            .catch(err => {
                console.log(err);
            })
        })
        } catch (e) {
          console.log(e);
        }
    },
    showDetail(goods){
      var obj = JSON.stringify(goods) //myObj：本js文件中的对象
      wx.navigateTo({
        url: '../goods/main?goods=' + obj
      })
    }  
  }
}
</script>

<style>
Page{
    background-color:	#f3f3f3;
}
.cardList{
    margin-left: 10px;
}
</style>
