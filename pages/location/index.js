// pages/location/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  locate:{
    latitude: null,
    longitude: null,
    altitude: null,
  },
  nowlocation:{
    latitude: '未知',
    longitude: '未知',
    address: '未知',
  }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '当前位置'
    })
    const _this = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var altitude = res.altitude
        console.log(`经度${longitude}纬度${latitude}海拔${altitude}`)
        const locate = {
          latitude,
          longitude,
          altitude,
        };
        _this.setData({
          locate,
        });
      }
    })
  },
  chooseFn: function (){
    const _this = this;
    wx.chooseLocation({
      success: function(res) {
        console.log(res);
        const nowlocation = {
          address: res.address,
          longitude: res.longitude,
          altitude: res.altitude
        }
        _this.setData({
          nowlocation
        });
      }
    });
  },
  lookFn: function () {
    const _this = this;
    console.log(_this.data)
    wx.openLocation({
      latitude: _this.data.locate.latitude,
      longitude: _this.data.locate.longitude,
      scale: 14,
      success: function(res) {
        console.log(res);
      }
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