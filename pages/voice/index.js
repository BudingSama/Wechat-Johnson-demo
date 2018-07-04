// pages/voice/index.js
const recorderManager = wx.getRecorderManager()
let Path = null;
let innerAudioContext = null;
recorderManager.onStart(() => {
  console.log('recorder start')
  wx.showToast({
    title: '正在录音',
    image: '/sources/voice.png',
    duration: 10000
  })
})
recorderManager.onPause(() => {
  console.log('recorder pause')
})
recorderManager.onStop((res) => {
  console.log('recorder stop', res)
  const { tempFilePath } = res
  Path = tempFilePath;
  wx.showToast({
    title: '录音完成',
    icon: 'success',
    duration: 1000
  })
})
recorderManager.onFrameRecorded((res) => {
  const { frameBuffer } = res
  console.log('frameBuffer.byteLength', frameBuffer.byteLength)
})

const options = {
  duration: 10000,
  sampleRate: 44100,
  numberOfChannels: 1,
  encodeBitRate: 192000,
  format: 'aac',
  frameSize: 50
}
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
  },
  startFn:function () {
    recorderManager.start(options)
  },
  stopFn: function () {
    recorderManager.stop()
  },
  playFn: function () {
    if (Path) {
      innerAudioContext = wx.createInnerAudioContext()
      innerAudioContext.autoplay = true
      innerAudioContext.src = Path
      innerAudioContext.onPlay(() => {
        wx.showToast({
          title: '正在播放',
          image: '/sources/voice.png',
          duration: 10000
        })
      })
      innerAudioContext.onEnded(()=> {
        wx.showToast({
          title: '播放完成',
          icon: 'success',
          duration: 1000
        })
      })
      innerAudioContext.onError((res) => {
        console.log(res.errMsg)
        console.log(res.errCode)
      })
    }
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