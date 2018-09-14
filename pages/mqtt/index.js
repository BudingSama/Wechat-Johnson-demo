var { Client, Message } = require('paho-mqtt-min.js');
// pages/mqtt/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  client:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  doConnect: function () {
    var that = this;
    if (that.data.client && that.data.client.isConnected()) {
      wx.showToast({
        title: '不要重复连接'
      })
      return
    }
    var client = new Client('wss://www.mengmeitong.com/mqtt', that.randomString());

    client.connect({
      useSSL: true,
      cleanSession: true,
      keepAliveInterval: 30,
      onSuccess: function () {
        wx.showToast({
          title: '连接成功'
        })
        that.data.client = client
        client.onMessageArrived = function (msg) {
          console.log(msg.payloadString);
          if (typeof that.data.onMessageArrived === 'function') {
            return that.data.onMessageArrived(msg)
          }
        }

        client.onConnectionLost = function (responseObject) {
          if (typeof that.data.onConnectionLost === 'function') {
            return that.data.onConnectionLost(responseObject)
          }
          if (responseObject.errorCode !== 0) {
            console.log("onConnectionLost:" + responseObject.errorMessage);
          }
        }
      }
    });
  },
  randomString: function (len) {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = $chars.length;
    var pwd = '';
    for (let i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  },
  subscribe: function (filter, subscribeOptions) {
    // 订阅
    var client = this.data.client;
    if (client && client.isConnected()) {
      wx.showToast({
        title: '订阅成功'
      })
      return client.subscribe(filter, subscribeOptions);
    }
    wx.showToast({
      title: '订阅失败',
      icon: 'success',
      duration: 2000
    })
  },
  publish: function (topic, message, qos = 0, retained = false) {
    // 发布
    var client = this.data.client;
    if (client && client.isConnected()) {
      var message = new Message(message);
      message.destinationName = topic;
      message.qos = qos;
      message.retained = retained;
      wx.showToast({
        title: '发布成功'
      })
      return client.send(message);
    }
    wx.showToast({
      title: '发送失败',
      icon: 'success',
      duration: 2000
    })
  },
  doSubscribe: function () {
    this.subscribe('mqtt/topic', {
      qos: 1
    })
  },
  doPublish: function () {
    this.publish('mqtt/topic', '123123', 1, false)
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