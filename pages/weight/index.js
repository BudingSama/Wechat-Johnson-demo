import * as echarts from '../../utils/ec-canvas/echarts';

const app = getApp();

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  const option = {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{


          // 0% 处的颜色   
          offset: 0, color: 'rgb(226,118,139)'
        },
        {

          // 100% 处的颜色
          offset: 1, color: 'white'
        }], false)
      }
    }]
  };

  chart.setOption(option);
  return chart;
}

Page({
  onShareAppMessage: function (res) {
    return {
      title: 'xxxx',
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
      title: '体重曲线'
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
