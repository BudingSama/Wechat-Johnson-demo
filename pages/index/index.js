//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bluetoothFn: () => {
    wx.navigateTo({
      url: '/pages/bluetooth/index',
    })
  },
  wxrunFn: () => {
    wx.navigateTo({
      url: '/pages/wxrun/index',
    })
  },
  weightFn: () => {
    wx.navigateTo({
      url: '/pages/weight/index',
    })
  },
  weightFn2: () => {
    wx.navigateTo({
      url: '/pages/weight2/index',
    })
  },
  voiceFn: () => {
    wx.navigateTo({
      url: '/pages/voice/index',
    })
  },
  sportFn: () => {
    wx.navigateTo({
      url: '/pages/sport/index',
    })
  },
  photoFn: () => {
    wx.navigateTo({
      url: '/pages/photo/index',
    })
  },
  fingerFn: () => {
    wx.navigateTo({
      url: '/pages/finger/index',
    })
  },
  pageFn: () => {
    wx.navigateTo({
      url: '/pages/page/index',
    })
  },
  shakeFn: () => {
    wx.navigateTo({
      url: '/pages/shake/index',
    })
  },
  locationFn: () => {
    wx.navigateTo({
      url: '/pages/location/index',
    })
  },
  chooseFn: () => {
    wx.navigateTo({
      url: '/pages/choose/index',
    })
  },
  pickerFn: () => {
    wx.navigateTo({
      url: '/pages/picker/index',
    })
  },
  takephotoFn:()=>{
    wx.navigateTo({
      url: '/pages/photoshow/index',
    })
  },
  wifiFn:()=>{
    wx.navigateTo({
      url: '/pages/wifi/index',
    })
  },
  mqttFn:()=>{
    wx.navigateTo({
      url: '/pages/mqtt/index',
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    if (e.detail.errMsg == "getUserInfo:ok") {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }
  }
})
