// pages/finger/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '指纹识别'
    })
    wx.checkIsSupportSoterAuthentication({
      success(res) {
        console.log(res);
        if (res && res.supportMode.length > 0) {
          res.supportMode.map((ele)=>{
            if (ele == 'fingerPrint'){
              wx.startSoterAuthentication({
                requestAuthModes: ['fingerPrint'],
                challenge: '123456',
                authContent: '请用指纹解锁',
                success(res) {
                  wx.showToast({
                    title: '指纹验证成功',
                    duration: 1000,
                    icon: 'success'
                  })
                }
              })
              }
          });
        }
        // res.supportMode = [] 不具备任何被SOTER支持的生物识别方式
        // res.supportMode = ['fingerPrint'] 只支持指纹识别
        // res.supportMode = ['fingerPrint', 'facial'] 支持指纹识别和人脸识别
      }
    })
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