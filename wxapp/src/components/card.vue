<template>
  <div class="card" @click="handle_show(goods)">
    <img :src="goods.fileList[0].url" class="good_img">
    <p class="title">{{goods.title}}</p>
    <p class="price">￥{{goods.price}}</p>
    <div class="userInfo">
      <img  src="https://wx.qlogo.cn/mmopen/vi_32/y13qWXqWF6bJca4SEwgB4qfJicuvqORxD3hSOcuYFKHAyXyWcsxcXvWSpYxZ3DLM4GV3F2BsdrYZibiaGlEmTvBjg/132" class="avr_img">
      <span class="username">{{goods.userName}}</span>
      <span class="city">{{goods.city}}</span>
    </div>
  </div>
</template>

<script>
export default {
    props:{
      goods:Array
    },
    data () {
      return {
        
      }
    },
    methods: {
      handle_show(goods){
        this.$emit("showDetail",goods);
      }
    }
}
</script>

<style>
.card{
  width: 46vw;
  height: 48vh;
  background-color: 	#ffffff;
  margin: 10px 10px 0 0;
  position: relative;
  float: left;
  border-radius:5%; 
}
.card .good_img{
  width: 100%;
  height: 60%;
}
.title{
   text-align: left;
   font-weight: 700;
   margin-left: 8px;
   font-size: 1em;
}
.price{
  color: red;
  margin-left: 5px;
  font-size: 1.125em;
}
.userInfo{
  color: #272323;
  margin-left: 8px;
  font-size: 1em;
  font-weight: 400;
}
.avr_img{
  width: 8vw;
  height: 8vw;
  border-radius: 20%;
  position: absolute;
  bottom: 12px;
}
.username{
  position: absolute;
  /* top: 6px; */
  bottom: 18px;
  left: 40px;
}
.city{
  position: absolute;
  right: 5px;
  /* top: 6px; */
  bottom: 18px;
}
</style>
