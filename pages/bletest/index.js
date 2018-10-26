// pages/bletest/index.js
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
      let _this = this
      //初始化蓝牙
      wx.openBluetoothAdapter({
        success: function (res) {
          console.log('初始化蓝牙成功')
          //检查蓝牙状态
          wx.getBluetoothAdapterState({
            success: function (res) {
              console.log('蓝牙可用')
              wx.startBluetoothDevicesDiscovery({
                success: function (res) {
                  console.log('正在搜索附近蓝牙设备')
                  wx.onBluetoothDeviceFound(function (res) {
                    console.log(res.devices[0])
                    if (res.devices[0].name == 'EW-MU-7C01') {
                      console.log('已找到蓝牙设备')
                      console.dir(res.devices[0])
                      _this.setData({
                        'deviceId': res.devices[0].deviceId
                      })
                      setTimeout(() => {
                        //连接低功耗蓝牙
                        console.log('设备id' + _this.data.deviceId)
                        wx.createBLEConnection({
                          deviceId: _this.data.deviceId,
                          success: function (res) {
                            console.log('连接蓝牙成功')
                            console.log(res)
                          },
                          fail: function (err) {
                            console.log('连接蓝牙失败')
                            console.log(err)
                          }
                        })
                      }, 500)
                    }
                  })

                  //搜索附近蓝牙

                }
              })
            }
          })
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