import * as echarts from '../../utils/ec-canvas/echarts';

const app = getApp();

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  var option = {
    title: {
      text: '运动能力'
    },
    tooltip: {},
    radar: {
      // shape: 'circle',
      name: {
        textStyle: {
          color: '#fff',
          backgroundColor: '#999',
          borderRadius: 3,
          padding: [3, 5]
        }
      },
      indicator: [
        { name: '长跑', max: 6500 },
        { name: '引体向上', max: 16000 },
        { name: '游泳', max: 30000 },
        { name: '短跑', max: 38000 },
        { name: '仰卧起坐', max: 52000 },
        { name: '俯卧撑', max: 25000 }
      ]
    },
    series: [{
      type: 'radar',
      // areaStyle: {normal: {}},
      data: [
        {
          value: [4300, 10000, 28000, 35000, 50000, 19000],
          name: 'sport'
        }
      ]
    }]
  };

  chart.setOption(option);
  return chart;
}

Page({
  onShareAppMessage: function (res) {
    return {
      title: 'xxxxx',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    animationData: {},
    ec: {
      onInit: initChart
    }
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '运动能力'
    })
  },
  onShow: function () {
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })

    this.animation = animation

    setTimeout(function () {
      animation.translate(300).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 300)
  },
});
