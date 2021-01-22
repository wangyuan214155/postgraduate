/**
 * GET请求封装
 */
function _get(url, data = {},options={}) {
  return request(url, data, "GET",options);
}

/**
 * POST请求封装
 */
function _post(url, data = {},options={}) {
  return request(url, data, "POST",options);
}

function request(url, data = {}, method = "GET",options={}) {
  //默认值get
  //options.header 表示请求头类型，默认是JSON类型，如果需要切换form类型，请求里传入form即可（workon旧版本请求可能需要此项）
  //options.loadingHidden 表示是否显示请求加载动画，默认需要显示，如果不需要显示，loadingHidden字段传true即可
  if(!options.loadingHidden){
    wx.showLoading({
      mask:true
    });
  }
  return new Promise(function (resolve, reject) {
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        // from表单类型
        "content-type": options.header==='form'?"application/x-www-form-urlencoded":"application/json;charset=UTF-8",
        //  json类型
        // "content-Type": "application/json;charset=UTF-8"
      },
      success: function (res) {
        console.log(res)
        wx.hideLoading();
        if (res.data.errors.length == 0) {
          //请求正常200
          resolve(res.data);
        } else {
          //请求失败
          // console.log(res,3333)
          wx.showToast({
            title: "请求失败：" + res.data.errors[0].error_msg,
            icon: "none",
            duration: 2000,
          });
        }
      },
      fail: function (err) {
        wx.hideLoading();
        reject("服务器连接异常，请检查网络再试");
      },
    });
  });
}
function fetchCode() {
    return new Promise((resolve, reject) => {
      wx.login({
        timeout: 10000,
        success(res) {
          let code = res.code
          if (code) {
            resolve(code) // 将code信息抽出
          } else {
            wx.showToast({
              title: "请求失败：" + res.errMsg,
              icon: "none",
              duration: 2000,
            });
            reject(new Error(res.errMsg))
          }
        },
        fail() {
          Toast.fail('网络错误');          
          reject(new Error('网络错误'));
        },
      })
    })

}


module.exports = {
  _get,
  _post,
  fetchCode
}
