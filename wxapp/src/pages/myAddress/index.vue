<template>
    <div class="container">
        <van-nav-bar
        title="我的收货地址"
        left-text="返回"
        left-arrow
        @clickLeft="onClickLeft"
        />
        <div class="address">
            <div class="user">
                <span class="name">收货人：小明同学</span>
                <span class="phone">15625033000</span>
                <p class="location">收货地址：广东省广州市广东财经大学</p>
            </div>
            <van-icon class="check_icon" name="weapp-nav"/>
        </div>
        <div class="address">
            <div class="user">
                <span class="name">收货人：小明同学</span>
                <span class="phone">15625033000</span>
                <p class="location">收货地址：广东省广州市广东财经大学</p>
            </div>
            <van-icon class="check_icon" name="weapp-nav"/>
        </div>
        <div class="address">
            <div class="user">
                <span class="name">收货人：小明同学</span>
                <span class="phone">15625033000</span>
                <p class="location">收货地址：广东省广州市广东财经大学</p>
            </div>
            <van-icon class="check_icon" name="weapp-nav"/>
        </div>
    </div>
</template>

<script>
export default {
    name:"myAddress",
    data () {
        return {
            
        }
    },
    methods:{
        onClickLeft() {
            wx.navigateBack();
        }
    }
}
</script>

<style>
page{
  background:#f3f3f3;
}
.van-nav-bar .van-icon{
    color: 	#808080;
}
.van-nav-bar__text{
    color: 	#808080 !important;
}
.address{
    border-bottom: 0.5px solid	#DCDCDC;
    background-color: #fff;
    /* font-size: 16px; */
    color: 	#808080;
    height: 80px;
    width: 100%;
}
.address .user{
    width: 80%;
    display: inline-block;
}
.address .user span{
    display: inline-block;
    font-size: 18px;
    margin:10px 0 10px 10px;
}
.address .user .phone{
    float:right;
}
.address .user .location{
    margin:0 0 0 10px;
}
.address .check_icon{
    font-size: 25px;
    margin-left:30px;
    /* padding-top:-20px;  */
}
</style>