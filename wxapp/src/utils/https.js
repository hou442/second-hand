const https = {
    request(options = {}){
        const {url,method,data} = options;
    
        wx.showLoading({
            title:"加载中..."
        });

        return new Promise((resolve,reject) => {
            wx.request({
                url,
                method,
                data,
                success:(res) => {
                    wx.hideLoading();
                    //判断网络
                    if(res.statusCode == 404){
                        reject();
                        return false;
                    }
                    if(res.statusCode != 200){
                        wx.showToast({
                            title:"网络出错，请稍后再试",
                            icon:"none"
                        });
                        return false;
                    }
                    //成功返回数据
                    resolve(res.data);
                },
                fail:(error) => {
                    wx.hideLoading();
                    reject(error);
                },
                complete:() => {
                    wx.hideLoading();
                }
            })
        })
    }
    
}

export default https;