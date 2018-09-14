// pages/bluetooth/index.js
function ab2hex(buffer) {
  var hexArr = Array.prototype.map.call(
    new Uint8Array(buffer),
    function (bit) {
      return ('00' + bit.toString(16)).slice(-2)
    }
  )
  return hexArr.join('');
}
let deviceId = null;
let serviceId = null;
let characteristicId = null;
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
        //5CAC0174-5096-ECDF-9ABA-8B8484F167B2
        //开始搜索蓝牙设备
        wx.startBluetoothDevicesDiscovery({
          // services: ['FFF0'],
          success: function (res) {
            wx.onBluetoothDeviceFound(function (devices) {
              deviceId = devices.devices[0].deviceId;
              // if (devices.devices[0].name == 'EW-TM-7C01' || devices.devices[0].name == 'FindMe'){
              if (devices.devices[0].name!='未知设备'){
                console.log(123)
                wx.createBLEConnection({
                  // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接 
                  deviceId: devices.devices[0].deviceId,
                  success: function (res) {
                    wx.getBLEDeviceServices({
                      // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接 
                      deviceId: devices.devices[0].deviceId,
                      success: function (res) {
                        console.log('device services:', res.services)
                        serviceId = res.services[0].uuid;
                        wx.getBLEDeviceCharacteristics({
                          // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接
                          deviceId: devices.devices[0].deviceId,
                          // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取
                          serviceId: res.services[0].uuid,
                          success: function (res) {
                            console.log('device getBLEDeviceCharacteristics:', res.characteristics)
                            characteristicId = res.characteristics[0].uuid;
                            console.log(characteristicId);
                            wx.notifyBLECharacteristicValueChange({
                              state: true, // 启用 notify 功能
                              // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接  
                              deviceId,
                              // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取
                              serviceId,
                              // 这里的 characteristicId 需要在上面的 getBLEDeviceCharacteristics 接口中获取
                              characteristicId,
                              success: function (res) {
                                console.log('notifyBLECharacteristicValueChange success', res.errMsg)
                                wx.onBLECharacteristicValueChange(function (characteristic) {
                              console.log('characteristic value comed:', characteristic)
                            })
                              },
                              fail:function(res){
                                console.log(res)
                              }
                            })
                            // // 必须在这里的回调才能获取
                            // wx.onBLECharacteristicValueChange(function (characteristic) {
                            //   console.log('characteristic value comed:', characteristic)
                            // })
                            // wx.readBLECharacteristicValue({
                            //   // 这里的 deviceId 需要已经通过 createBLEConnection 与对应设备建立链接  [**new**]
                            //   deviceId,
                            //   // 这里的 serviceId 需要在上面的 getBLEDeviceServices 接口中获取
                            //   serviceId,
                            //   // 这里的 characteristicId 需要在上面的 getBLEDeviceCharacteristics 接口中获取
                            //   characteristicId,
                            //   success: function (res) {
                            //     console.log('readBLECharacteristicValue:', res.errCode)
                            //   }
                            // })
                            wx.writeBLECharacteristicValue({
                              deviceId,
                              serviceId,
                              characteristicId,
                              value: hexStringToArrayBuffer("test"),
                              success: function (res) {
                                console.log(buf);
                              },
                              fail(res) {
                                console.log(res);
                              }
                            })
                            function hexStringToArrayBuffer(str) {
                              if (!str) {
                                return new ArrayBuffer(0);
                              }
                              var buffer = new ArrayBuffer(str.length);
                              let dataView = new DataView(buffer)
                              let ind = 0;
                              for (var i = 0, len = str.length; i < len; i += 2) {
                                let code = parseInt(str.substr(i, 2), 16)
                                dataView.setUint8(ind, code)
                                ind++
                              }
                              return buffer;
                            }
                          }
                        })
                      }
                    })
                  }
                })
              }
            })
            wx.getBluetoothDevices({
              success: function (res) {
                // console.log(res)
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