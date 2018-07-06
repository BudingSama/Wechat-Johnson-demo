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

```
const option = {
    xAxis: {},
    yAxis: {},
    series: [{}],
}
```

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



