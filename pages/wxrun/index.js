
const WXBizDataCrypt = require('../../utils/WXBizDataCrypt.js');
const app = getApp()
// pages/wxrun/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animationData: {},
    source: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this;
    wx.getWeRunData({
      success(res) {
        var pc = new WXBizDataCrypt(app.globalData.AppId, app.globalData.session_key)
        var data = pc.decryptData(res.encryptedData, res.iv)
        _this.setData({
          source: data.stepInfoList
        });
        console.log('解密后 data: ', data)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '微信运动'
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */

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