// pages/bluetooth/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    deviceList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this;
    wx.openBluetoothAdapter({
      success: function (res) {
        console.log('connect success')
        //获取本机蓝牙适配器状态
        wx.getBluetoothAdapterState({
          success: function (res) {
            console.log(res)
          }
        })
        //开始搜索蓝牙设备
        wx.startBluetoothDevicesDiscovery({
          success: function (res) {
            function ab2hex(buffer) {
              var hexArr = Array.prototype.map.call(
                new Uint8Array(buffer),
                function (bit) {
                  return ('00' + bit.toString(16)).slice(-2)
                }
              )
              return hexArr.join('');
            }
            wx.getBluetoothDevices({
              success: function (res) {
                console.log(res)
                _this.setData({
                  deviceList: res.devices,
                })
              }
            })
          },
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '蓝牙列表'
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