# Wechat-Johnson-demo
微信小程序功能demo

## # 蓝牙搜索设备列表
- 需设备已开启蓝牙<br>
- 自动检索附近存在的蓝牙设备
- 此方法较占用系统资源，调用后及时关闭
```
wx.startBluetoothDevicesDiscovery(OBJECT)

wx.stopBluetoothDevicesDiscovery(OBJECT)
```

## # 微信运动数据解码
- 采用[cryptoJs](https://github.com/gwjjeff/cryptojs)库Base64翻译
- 详情参考[微信官方加密规则](https://developers.weixin.qq.com/miniprogram/dev/api/signature.html)

```
const pc = new WXBizDataCrypt(app.globalData.AppId, app.globalData.session_key)
        var data = pc.decryptData(res.encryptedData, res.iv)
        _this.setData({
          source: data.stepInfoList
        });
        console.log('解密后 data: ', data)
```

## # 体重BMI指数曲线
- [echarts-for-weixin](https://github.com/ecomfe/echarts-for-weixin)
- [chartjs-wechat-mini-app](https://github.com/xiabingwu/chartjs-wechat-mini-app)

> 标准

```
const option = {
    xAxis: {},
    yAxis: {},
    series: [{}],
}
```
> 折线图

```
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
        offset: 0, color: 'rgb(226,118,139)'  },
       {
        
        // 100% 处的颜色
       offset: 1, color: 'white' 
      }], false)
        }
    }]
};
```
> 柱状图
```
option = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        position: 'top',
    },
    yAxis: {
        type: 'value',
        axisLabel:{
            show: false,
            
        },
    },
    series: [{
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        itemStyle: {
    //柱形图圆角，鼠标移上去效果，如果只是一个数字则说明四个参数全部设置为那么多
    emphasis: {
        barBorderRadius: 30
    },
    normal: {
        //柱形图圆角，初始化效果
        barBorderRadius:[50, 50, 0,0],
        label: {
            show: false,//是否展示
            textStyle: {
                fontWeight:'bolder',
                fontSize : '12',
                fontFamily : '微软雅黑',
            }
        },
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
    
    
         // 0% 处的颜色   
        offset: 0, color: 'rgb(203,12,51)'  },
       {
        
        // 100% 处的颜色
       offset: 1, color: 'rgb(226,118,139)' 
      }], false),
    }
},
    }]
};

```
> 雷达图

```
option = {
    title: {
    },
    backgroundColor:'black',
    tooltip: {},
    radar: {
        name: {
            textStyle: {
                color: '#fff',
                borderRadius: 3,
                padding: [3, 5]
           }
        },
        splitLine: {
            lineStyle: {
                color: 'white',
                width: 3
            }
        },
        axisLine:{
                lineStyle:{
                    color:'grey',
                }
            },
        axisTick:{
            lineStyle:{
                color:'white',
            }
        },
        splitArea: {
            areaStyle: {
                color: [],
            }
        },
        indicator: [
           { name: '运动', max: 6500},
           { name: '运动', max: 16000},
           { name: '运动', max: 30000},
           { name: '运动', max: 38000},
           { name: '运动', max: 52000},
        ]
    },
    series: [{
        name: 'demo',
        type: 'radar',
        data : [
            {
                value : [4300, 10000, 28000, 35000, 50000, 19000],
                name : 'people'
            }
        ],
        itemStyle:{
            color:'rgb(245,34,33)',
        },
    }]
};
```


## # 语音鼓励
- 废弃~~wx.startRecord(OBJECT)~~
- 废弃~~wx.stopRecord()~~
- 废弃~~wx.playVoice(OBJECT)~~


```
wx.getRecorderManager()

wx.createInnerAudioContext()

wx.saveFile(OBJECT)

wx.getSavedFileList(OBJECT)

```
## # 运动能力
- [echarts-for-weixin](https://github.com/ecomfe/echarts-for-weixin)

```
const option = {
    title: {},
    tooltip: {},
    radar: {
      name: {},
      indicator: [],
    },
    series: [{}],
  }
```
## # 保存照片

```
wx.chooseImage(OBJECT)

wx.saveImageToPhotosAlbum(OBJECT)
```
## # 指纹识别

```
wx.startSoterAuthentication(OBJECT)

wx.checkIsSupportSoterAuthentication(OBJECT)

```
## # 页面转发

```
onShareAppMessage(options)

wx.showShareMenu(OBJECT)


```
## # 手机振动

```
wx.vibrateLong(OBJECT)

wx.vibrateShort(OBJECT)

```
## # 当前位置

```
wx.getLocation(OBJECT)

wx.chooseLocation(OBJECT)

wx.openLocation(OBJECT)

```
## # 滚动选择

```
  <picker bindchange="bindPickerChange" value="{{index}}" range="{{array}}">
    <view class="picker">
      当前选择：{{array[index]}}
    </view>
  </picker>
```
## # 调用拍照

```
  onLoad: function (options) {
    if (wx.createCameraContext()) {
      this.cameraContext = wx.createCameraContext('myCamera')
    } else {
      // 如果希望用户在最新版本的客户端上体验您的小程序，可以这样子提示
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }

  },
  startTakePhoto: function () {
    this.cameraContext.takePhoto({

    })
  },
```
## # WIFI配网[测试]

```
  onLoad: function (options) {
    wx.startLocalServiceDiscovery({
      // 当前手机所连的局域网下有一个 _http._tcp. 类型的服务
      serviceType: '_http._tcp.',
      success: function(res){
        console.log(res);
      },
      fail: function(res){
        console.log(res);
      }
    })
    wx.onLocalServiceFound(res => {
      console.log(res);
    })
  },
```
## # MQTT订阅
- 需引入 paho-mqtt-min.js

```
var { Client, Message } = require('paho-mqtt-min.js');
```
- 实例化连接

```
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
```
- 订阅 mqtt

```
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
```
- 发布 mqtt

```
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
```








