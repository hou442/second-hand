<template>
  <div>
    <van-nav-bar title="我发布的"/>
    <div class="cardList">
        <Card v-for="(item,index) in goodsList" :key="index"
        :goods="item" @showDetail="showDetail(item)">
        </Card>
    </div>
    <van-toast id="van-toast" />
  </div>
</template>

<script>
import Card from '../../components/card'
import Toast from '../../../dist/wx/static/vant/toast/toast';
export default {
    data () {
        return {
            goodsList:[]
        }
    },
    components: {
        Card
    },
    onShow(){
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
            this.$https.request({
                url:this.$interfaces.getGoods + 'myPosts/',
                method:"get",
                data:{userId : this.$store.getters.openId}
            })
            .then(res => {
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