<template>
    <transition name="move">
        <div class="container">
            <swiper indicator-dots = true class="imgList">
                <swiper-item v-for="(item,index) in goods.fileList" :key="index">
                <img :src="item.url" alt="">
                </swiper-item>
            </swiper>

        </div>
    </transition>

</template>

<script>
export default {
    name:"goods",
    props:{
        goods:Object
    },
    onLoad(){
        console.log(this.goods);
    }
}
</script>

<style>
.container{
    /* margin-top: 10px; */
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 100;
}
.imgList{
  /* width: 100%; */
  margin-left: 10px;
  margin-right: 10px;
  height: 140px;
  margin-bottom: 0.2rem;
}
.move-enter-active,
.move-leave-active {
  transition: all 0.25s ease-in;
  transform: translate(0, -500px);
}

.move-enter,
.move-leave-to {
  transform: translate(0, 500px);
}
</style>