const AppId = 'wx84a42ece25ad6ca7';
const SECRET = 'c5f041f802be2ec7e64ee881e0715385'
const session_key = 'RkBcmh0LOZxPgGaSMg5QkQ=='
const WXBizDataCrypt = require('../../utils/WXBizDataCrypt.js');
// pages/wxrun/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    animationData: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getWeRunData({
      success(res) {
        var pc = new WXBizDataCrypt(AppId, session_key)
        var data = pc.decryptData(res.encryptedData, res.iv)
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