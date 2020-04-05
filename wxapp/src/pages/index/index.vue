<template>
  <div class="container">
    <!-- 搜索框 -->
    <div class="header">
      <van-search
        :label="city"
        placeholder="请输入搜索关键词"
        use-action-slot
        @click="toSearch"
      >
        <view slot="action" @click="handle_search">搜索</view>
      </van-search>
      <!-- 轮播图 -->
      <swiper 
      indicator-dots = true
      autoplay = true
      duration = "1000"
      class="imgList">
        <swiper-item>
          <img src="../../../static/images/swiper/1.jpeg" alt="">
        </swiper-item>
        <swiper-item>
          <img src="../../../static/images/swiper/2.jpg" alt="">
        </swiper-item>
        <swiper-item>
          <img src="../../../static/images/swiper/3.jpg" alt="">
        </swiper-item>
        <swiper-item>
          <img src="../../../static/images/swiper/4.jpg" alt="">
        </swiper-item>
      </swiper>
      <!-- 分类 -->
      <van-grid gutter="10" 
      class="classification"
      clickable=true
      column-num=3>
        <van-grid-item v-for="(sort,index) in gridBar" :key="index" :icon="sort.icon" :text="sort.text"
        @click="handle_bar(sort)"/>
      </van-grid>
    </div>
    <!-- 商品列 -->
    <div class="goodsList">
      <!-- <Goods v-for="(item,index) in goodsList" :key="index"
      :goods="item.goods"></Goods> -->
      <Card v-for="(item,index) in goodsList" :key="index" 
      :goods="item" @showDetail="showDetail(item)"
      >
      </Card>
    </div>
    <!-- <Goods :goods="selectGood" v-if="show_detail"></Goods> -->
    
  </div>
</template>

<script>
import QQMapWX from '../../utils/qqmap-wx-jssdk';
import Card from '../../components/card';
export default {
  components: {
    Card
  },

  data () {
    return {
      city:'当前城市',
      inputVal:'',//输入框内容
      gridBar:[
        {icon:"../../../static/images/sort/book.png",text:"书籍"},
        {icon:"../../../static/images/sort/shoes.png",text:"鞋装"},
        {icon:"../../../static/images/sort/computer.png",text:"电子数码"},
        {icon:"../../../static/images/sort/sport.png",text:"运动健身"},
        {icon:"../../../static/images/sort/makeup.png",text:"美妆护肤"},
        {icon:"../../../static/images/sort/other.png",text:"其他"}
      ],
      goodsList:[]//商品列表
    }
  },
  onLoad(){  
    // this.getUserLocation();
    // 实例化API核心类
    this.qqmapsdk = new QQMapWX({
        key: '2JHBZ-JELC4-G3LU2-DMXLZ-YR6DV-N5BSG'
    });
    //获取当前城市
    this.getCity();
  },
  onShow(){
    // 获取商品列表
    this.getGoods();
  },
  methods: {
    getCity(){
      wx.getSetting({
      success: res => {
        console.log('666');
        console.log(res.authSetting);
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
            // console.log('sucess1');
            wx.showModal({
              title: '请求授权当前位置',
              content: '需要获取您的地理位置，请确认授权',
              success: function (res) {
                if (res.cancel) {
                  wx.showToast({
                    title: '拒绝授权',
                    icon: 'none',
                    duration: 1000
                  })
                } else if (res.confirm) {
                  wx.openSetting({
                    success: function (dataAu) {
                      if (dataAu.authSetting["scope.userLocation"] == true) {
                        wx.showToast({
                          title: '授权成功',
                          icon: 'success',
                          duration: 1000
                        })
                        //再次授权，调用wx.getLocation的API
                        
                      } else {
                        wx.showToast({
                          title: '授权失败',
                          icon: 'none',
                          duration: 1000
                        })
                      }
                    }
                  })
                }
              }
            })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
            // console.log('sucess2');
            this.getLocation();
        }
        else {
          //调用wx.getLocation的API
            // console.log('sucess3');
            this.getLocation();
        }
      }
    })
    },
    getLocation(){
      wx.getLocation({
        type: 'wgs84',
        success: res => {
          console.log(JSON.stringify(res))
          var latitude = res.latitude
          var longitude = res.longitude
          var speed = res.speed
          var accuracy = res.accuracy;
          this.getLocal(latitude, longitude)
        },
        fail: function (res) {
          console.log('fail' + JSON.stringify(res))
        }
      })
    },
    // 获取当前地理位置
    getLocal(latitude, longitude) {
        // let vm = this;
        this.qqmapsdk.reverseGeocoder({
          location: {
            latitude: latitude,
            longitude: longitude
          },
          success: res => {
            // console.log("1");
            // console.log(JSON.stringify(res));
            let province = res.result.ad_info.province
            // let city = res.result.ad_info.city
            this.city = res.result.ad_info.city;
            // this.setData({
            //   province: province,
            //   city: city,
            //   latitude: latitude,
            //   longitude: longitude
            // })
    
          },
          fail: function (res) {
            // console.log("2");
            console.log(res);
          },
          complete: function (res) {
            // console.log("3");
            console.log(res);
          }
        });
    },
    getGoods(){
      this.$https.request({
        url:this.$interfaces.getGoods,
        method:'get'
      })
      .then(res => {
        console.log('goods:');
        console.log(res);
        this.goodsList = res;
      })
      .catch(err => {
        console.log(err);
      })
    },
    showDetail(goods){
      var obj = JSON.stringify(goods) //myObj：本js文件中的对象
      wx.navigateTo({
        url: '../goods/main?goods=' + obj
      })
    },
    handle_bar(sort){
      let text = sort.text;
      let url = "../sort/main?title=" + text;
      wx.navigateTo({url});
    },
    toSearch(){
      wx.navigateTo({
        url:'../search/main'
      })
    }
  }
}
</script>

<style>
page{
  background:	#f3f3f3;
}
.container{
  overflow:auto;
}
.header{
  background-color: #fff;
  padding-bottom: 0.2rem;
  margin-top: -0.2rem;
}
.imgList{
  /* width: 100%; */
  margin-left: 10px;
  margin-right: 10px;
  height: 140px;
  margin-bottom: 0.2rem;
}
.imgList swiper-item img{
  width:100%;
  height: 100%; 
}
.classification van-grid-item .van-grid-item__content{
  background:	#f3f3f3;
  height: 90px;
}
.classification van-grid-item .van-grid-item__icon{
  font-size: 40px;
  /* margin-top: -10px 0; */
}
.classification van-grid-item .van-grid-item__text{
  /* color: rgb(243, 243, 97); */
  margin-top: -10px;
  font-size:16px;
  font-weight: 800;
}
.goodsList{
  margin-left: 10px;
}
</style>
