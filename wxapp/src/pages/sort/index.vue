<template>
  <div class="container">
    <van-nav-bar :title="title"/>
    <div class="cardList">
        <Card v-for="(item,index) in goodsList" :key="index"
        :goods="item" @showDetail="showDetail(item)">
        </Card>
    </div>  
  </div>
</template>

<script>
import Card from '../../components/card'
export default {
    data () {
        return {
            title:"",
            goodsList:[]
        }
    },
    components: {
        Card
    },
    onLoad(option){
        this.title = option.title;
        this.getData();
    },
    methods: {
        getData(){
            this.$https.request({
                url:this.$interfaces.getGoods + 'sort/',
                method:"get",
                data:{title:this.title}
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