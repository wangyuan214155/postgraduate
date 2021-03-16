const request = require("/utils/url");
const { loginApi } = require("/utils/api");
App({
  onLaunch: function () {

    // 登录
    wx.login({
      success: res => {
        // console.log(res,'登录信息')
        let data = {
          'code': res.code
        }
        return request._get(loginApi.isLogin, data)
          .then(res => {
            //  console.log(res,33333)
            if (res.success) {
              let result = res.result;
              if (result.student_id) {
                this.globalData.userId = result.student_id;
                this.globalData.openId = result.openid;
                this.globalData.isLogin = true;

              } else {
                this.globalData.userId = '';
                this.globalData.openId = result;
                this.globalData.isLogin = false;
                wx.showModal({
                  title: '提示',
                  content: '您还未登录，请先登录哦',
                  showCancel: false,
                  success(res) {
                    if (res.confirm) {
                      // console.log('用户点击确定')
                      wx.switchTab({
                        url: '/pages/personal/personal',
                      });
                    }
                  }
                })
              }

            }
          })
          .catch(err => {
            console.log(err, 4444)

          })
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        // console.log(res.authSetting,44444);

        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // console.log( this.globalData.userInfo,5555)

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    wx.getSystemInfo({
      success: res => {
        console.log(res, 333)
        const { system, windowHeight,windowWidth} = res;
        // 获取可使用窗口宽度
        let clientHeight = windowHeight;
        // 获取可使用窗口高度
        let clientWidth = windowWidth
        // 算出比例
        let ratio = 750 / clientWidth;
        // 算出高度(单位rpx)
        let height =  Math.floor(clientHeight * ratio);
        // this.globalData.screenHeight = Math.floor(windowHeight*2);

        this.globalData.screenHeight = height;
        console.log(Math.floor(windowHeight*2),555,height)

        if (system.indexOf('Android') >= 0) {
          this.globalData.system = 'android'

        } else {
          this.globalData.system = 'ios'

        }
      }

    })
  },
  globalData: {
    userInfo: null,
    openId: '',
    userId: '',//用户id
    isLogin: false,
    system: 'ios',
    screenHeight: 0
  }
})