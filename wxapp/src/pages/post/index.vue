<template>
  <div class="container">
    <van-nav-bar title="发布商品"/>
    <van-notice-bar
    mode="closeable"
    left-icon="../../../static/images/volume.png"
    text="请勿发布需资质准入或属于闲猪违规类的商品信息，否则系统将会自动下架"
    />
    <div class="firstPart">
        <van-cell-group>
            <van-field
                clearable
                label="标题"
                maxlength=22
                left-icon="info"
                placeholder="请输入商品标题"
                custom-style="font-size:20px;"
                @change="title_change"
            />
            <van-field
                style="margin-top:10px;"
                label="描述"
                left-icon="column"
                type="textarea"
                placeholder="请简要地描述一下你的商品"
                maxlength=140
                fixed=true
                input-class="tx-inputclass"
                custom-style="font-size:20px;"
                @change="desc_change"
            >
            </van-field>
        </van-cell-group>  
        <van-uploader :file-list="fileList" @afterRead="afterRead"  @delete="del_img"
        max-count=4
        />  
    </div>
    <div class="secondPart">
        <van-cell-group>
            <van-field
                label="价格(RMB)"
                type="number"
                left-icon="gold-coin"
                placeholder="请输入价格"
                input-align="right"
                custom-style="font-size:18px;"
                @change="price_change"
            />
        </van-cell-group>
        <van-field
            :value="sort"
            label="分类"
            left-icon="bars"
            placeholder="请选择商品分类"
            @click="showSort"
            input-align="right"
            icon="arrow"
            custom-style="font-size:18px;"
        />
        <van-popup
        :show="show_sort"
        position="bottom"
        custom-style="height: 40%"
        >
            <van-picker
            show-toolbar
            title="商品分类"
            :columns="columns"
            @cancel="onCancel"
            @confirm="onConfirm"
            />
        </van-popup>
    </div>
    <van-toast id="van-toast" />
    <van-button type="primary" color="#ffd543" 
    size="large" block
    @click="handle_post"
    class="btn_post">发布</van-button>
  </div>
</template>

<script>
const qiniuUploader = require("../../utils/qiniuUploader");
import Toast from '../../../static/vant/toast/toast';
export default {
    data () {
        return {
            token:'',
            filePath:'',
            fileList:[],
            title:"",
            description:"",
            price:'￥',
            sort:"",
            // sort:['书籍','鞋装','零食','运动健身','美妆护肤','其他']
            show_sort: false,
            columns:['书籍','鞋装','电子数码','运动健身','美妆护肤','其他']
        }
    },
    onLoad(){
        //检查是否登录
        let user = this.$store.getters.user;
        if(!user){
            Toast.fail('请先登录');
            setTimeout(() => {
                wx.switchTab({url:'../mine/main'});
            },2000);
            return false;
        }
    },
    methods: {
        title_change(event){
            this.title = event.mp.detail;
        },
        desc_change(event){
            this.description = event.mp.detail;
        },
        price_change(event){
            this.price = event.mp.detail;
        },
        showSort(){
            this.show_sort = true;
        },
        onConfirm(event){
            const val =  event.target.value;
            this.sort = val;
            this.show_sort = false;
        },
        onCancel() {
            this.show_sort = false;
        },
        del_img(event){
            let imgIndex = event.mp.detail.index;
            console.log(imgIndex);
            this.fileList.splice(imgIndex,1);
            console.log(this.fileList);
        },
        afterRead(e){
            this.filePath = e.mp.detail.file.path;
            this.getToken();
        },
        //从服务器获得token
        getToken(){
            this.$https.request({
                url:this.$interfaces.getToken,
                method:"get"
            })
            .then(res => {
                console.log(res);
                this.token = res;
                console.log('111');
                this.uploadImgToQiniu();  // token 后台获取
            })
        },
        uploadImgToQiniu(){
            console.log(this.filePath);
            // data.append('key', new Date().getTime()  + "_" + file.file.name);
            qiniuUploader.upload(this.filePath, (res) => {
                console.log(res);
                console.log('file url is: ' + res.fileUrl);
                let obj = {};
                obj['url'] = 'http://' + res.fileUrl;
                this.fileList.push(obj);
                console.log(this.fileList);
                }, (error) => {
                console.log('error: ' + error);
                }, {
                region: 'SCN',
                domain: 'q78lktmu8.bkt.clouddn.com', // // bucket 域名，下载资源时用到。如果设置，会在 success callback 的 res 参数加上可以直接使用的 ImageURL 字段。否则需要自己拼接
                uptoken: this.token, // 由其他程序生成七牛 uptoken
                }, (res) => {
                    console.log('上传进度', res.progress)
                    console.log('已经上传的数据长度', res.totalBytesSent)
                    console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
                }, () => {
                // 取消上传
                }, () => {
                // `before` 上传前执行的操作
                }, (err) => {
                // `complete` 上传接受后执行的操作(无论成功还是失败都执行)
                });
        },
        handle_post(){
            // if(this.title.length < 13){
            //     Toast.fail('标题字数不能少于13');
            //     return false;
            // };
            if(!this.title || !this.description || !this.price || !this.sort){
                Toast.fail('请填写完整信息');
                return false;
            };
            if(this.fileList.length === 0){
                Toast.fail('请上传图片');
                return false;
            };
            let user = this.$store.getters.user;
            let postGood = {
                userId:this.$store.getters.openId,
                userName:user.nickName,
                title:this.title,
                price:this.price,
                city:user.city,
                description:this.description,
                fileList:this.fileList,
                sort:this.sort,
                userAvr:user.avatarUrl
            };
            console.log(postGood);
            this.$https.request({
                url:this.$interfaces.postGood,
                data:{ good:postGood },
                method:'get'
            })
            .then(res => {
                console.log(res);
                Toast.success('发布成功');
                setTimeout(() => {
                    wx.navigateBack();
                     //清空图片、分类
                    this.fileList.length = 0;
                    this.sort = "";
                },1500)
                
            })
            .catch(err => {
                console.log(err);
                Toast.fail('发布失败');
            })
        }
    }
}
</script>

<style>
Page{
    background:	#f3f3f3;
}
.van-icon{
    font-size: 20px !important;
    margin-right: 5px;
}
.firstPart .secondPart{
    margin-top: 15px;
}
.btn_post{
    position: fixed;
    bottom: 0;
    width: 100%;
}
.tx-inputclass{
    min-height: 190px !important;
}
</style>