// pages/wifi/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  start:function(){
    wx.request({
      url: 'http://10.10.10.1:8000/config-write-uap',
      method: 'POST',
      data:
        {
          'PASSWORD': "88888888",
          'SSID': "mxchip-offices",
          'IDENTIFIER': 1221684807,
          'DHCP': true
        },
      complete: function (res) {
        console.log(res)
      }

    })
  },
  onLoad: function (options) {
    wx.startLocalServiceDiscovery({
      // 当前手机所连的局域网下有一个 _http._tcp. 类型的服务
      serviceType: '_easylink._tcp.',
      success: function(res){
        console.log(res);
      },
      fail: function(res){
        console.log(res);
      }
    })
    wx.onLocalServiceFound(res => {
      console.log(res);
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})