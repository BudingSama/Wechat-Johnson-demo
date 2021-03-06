//app.js
App({
  onLaunch: function () {
    const _this = this;
    this.deviceInfo = this.promise.getDeviceInfo();
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          // console.log('code:'+res.code);
          wx.request({
            url: `http://192.168.3.90:8899/user/openid/?code=${res.code}`,
            success:function (data) {
              _this.globalData.openid = data.data.data.openid;
              _this.globalData.session_key = data.data.data.session_key;
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
    // 获取用户信息
    wx.getSetting({
      success: res => {
        // console.log(res);
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
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
  },
  promise: {
    getDeviceInfo: function () {//获取设备信息
      let promise = new Promise((resolve, reject) => {
        wx.getSystemInfo({
          success: function (res) {
            resolve(res)
          },
          fail: function () {
            reject()
          }
        })
      })
      return promise
    }
  },
  globalData: {
    userInfo: null,
    openid:null,
    session_key:null,
    AppId:'wx84a42ece25ad6ca7',
    SECRET: 'c5f041f802be2ec7e64ee881e0715385'
  },
  getGid: (function () {//全局唯一id
    let id = 0
    return function () {
      id++
      return id
    }
  })()
})