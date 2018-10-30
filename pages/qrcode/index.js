import QR from "../../utils/init-qrcode.js";
Page({
  data: {
    // qrcode
    text: 'http://baidu.com',
    qrcode: '',
    imgPath: '/pages/qrcode/IMG_3280.jpg',
  },
  onLoad: function () {
    var that = this;
    let qrcodeSize = that.getQRCodeSize()
    setTimeout(function () {
      that.createQRCode(that.data.text, qrcodeSize);
    }, 1000)
  },

  getQRCodeSize: function () {
    var size = 0; try {
      var res = wx.getSystemInfoSync();
      var scale = 750 / 278; //不同屏幕下QRcode的适配比例；设计稿是750宽
      var width = res.windowWidth / scale;
      size = width;

    } catch (e) {
      // Do something when catch error
      // console.log("获取设备信息失败"+e);
    }
    return size;
  },
  createQRCode: function (text, size) {
    let that = this;
    let _img = QR.createQrCodeImg(text, {
      size: parseInt(size)
    })
    that.setData({
      'qrcode': _img
    })
    let screenWidth;
    wx.getSystemInfo({
      success: function (res) {
        screenWidth = res.screenWidth / 750
      }
    })
    const ctx = wx.createCanvasContext('shareCanvas');
    setTimeout(function () {
      ctx.drawImage(that.data.imgPath, 0 * screenWidth, 400 * screenWidth, 450 * screenWidth, 450 * screenWidth);
      ctx.drawImage(that.data.qrcode, 0 * screenWidth, 100 * screenWidth, 180 * screenWidth, 180 * screenWidth);
      ctx.draw();
    }, 1000)
  },
  shareFn: function () {
    const _this = this;
    wx.canvasToTempFilePath({
      canvasId: 'shareCanvas',
      success: function (res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            console.log(res);
            wx.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 1000,
            })
            setTimeout(function () {
              _this.setData({ shareBol: false });
            }, 1500)
          },
          fail: function (res) {
            console.log(res);
            if (res.errMsg == 'saveImageToPhotosAlbum:fail auth deny') {
              wx.openSetting({
                success: function (res) {
                  console.log(res)
                }
              })
            }
          }
        })
      }
    })
  }
})