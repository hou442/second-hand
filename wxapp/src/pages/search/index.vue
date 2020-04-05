<template>
  <div>
    <van-search
    :label="city"
    placeholder="请输入搜索关键词"
    use-action-slot
    @change="handle_input"
    >
    <view slot="action" @click="handle_search">搜索</view>
    </van-search>
    <div class="cardList" v-show="goodsList">
        <Card v-for="(item,index) in goodsList" :key="index"
        :goods="item" @showDetail="showDetail(item)"></Card>
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
            inputVal:"",
            goodsList:[]
        }
    },
    components: {
        Card
    },
    methods: {
        handle_input(e){
            this.inputVal = e.mp.detail;
        },
        handle_search(){
            this.$https.request({
                url:this.$interfaces.getGoods + 'search/',
                method:'get',
                data:{title:this.inputVal}
            })
            .then(res => {
                if(res.length == 0){
                    Toast.fail('没有找到商品')
                }else{
                    this.goodsList = res;
                }
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