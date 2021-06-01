# miniprogram-framework

miniprogram-framework 是一个个人框架, 致力于简洁和高可用性的开发体验.

## 说明

**使用前请认真阅读文档和示例项目**

该小程序组件都是基于Vant/weapp编写的, 旨在提供简介一套ui复用.


## 组件列表 

- city-picker组件
- city-selector组件
- layout组件
- pagination组件 引用于 [wxp-ui]https://github.com/wxp-ui/wxp-ui


## 如何使用
该小程序已经将小程序http,log,toast,storage封装，具体可以查看utils/*目录下源码,已经挂载到全局wx上直接调用即可

```
// 检测更新
checkUpdateVersion()
// 设置请求地址
setRequestUrl(this)
// 封装toast
wx.toast = Toast
// 封装storge
wx.storge = Storge
// http 构建
wx.http = new Request(this)
// log 日志
wx.log = new Log(this)
```

### checkUpdateVersion setRequestUrl
```
utils/system.js  配置即可
```
### wx.toast
```
wx.toast
wx.toast.loading
wx.toast.success
wx.toast.error
```
参数：options (Number | String) || Object
参数为对象时请参考 [微信小程序toast](https://developers.weixin.qq.com/miniprogram/dev/api/ui/interaction/wx.showToast.html)

### wx.storge
```
wx.storge.set
wx.storge.get
wx.storge.remove
wx.storge.clear
```
### wx.http
```
wx.http.request.get
wx.http.request.post
wx.http.request.put
wx.http.request.delete
...
wx.http.request({
    url: '/api/xx',
    data:{},
})
/**
 * @url 请求地址 必传 
 * @method 请求方式 默认  POST
 * @header 请求头 可选 
 * @data 请求参数
 */
```

## 组件配置

### city-picker 组件

#### city-picker Attributes


| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| cityPickerColumnsNum | 列表列数 | Number | 1,2,3 | 3 |
```
//调用
this.selectComponent('#city-picker').showCityPicker()
this.selectComponent('#city-picker').data.values
或者页面绑定事件方法  <city-picker bind:confirm="onConfirm" id="city-picker"></city-picker>
```

### city-selector

#### city-selector Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| cityList | 数据源 | Array | -- | [] |
| hotCityList | 热门城市数据源 | Array | -- | [] |
| showSearch | 展示搜索 | Boolean | -- | false |
| showLocation | 展示定位 | Boolean | -- | false |
| mapKey | 地图定位key | string | -- |  |


#### city-selector Events


| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| getCity | 获取城市事件 | 当前选中城市的名称 |


### layout 组件



#### 布局ui 

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| padding-top | Boolean | true/false | false | -- |
| use-footer-slot | 底部按钮区域 | slot | ... | ... |

#### layout Slots



| name | 说明 |
| --- | --- |
| --- | 页面主体 |
| footer | 页面底部44px |

### pagination 组件

#### pagination Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| requesting | 列表数据是否处于加载中 | Boolean | -- | false |
| end | 列表数据加载完成 | Boolean | -- | false |
| emptyShow | 控制空状态显示 | Boolean | -- | false |
| use-empty-slot | 空列表的插槽 | Boolean | -- | false |
| listCount | 当前列表长度 | Number | -- | 0 |
| emptyUrl | 空列表的展示图片 | String | * | /assets/image/empty/empty.png |
| emptyText | 空列表的文字提示 | String | * | 未找到数据 |
| refreshSize | 下拉刷新的高度 | Number | -- | 90 |
| topSize | 顶部高度 | Number | -- | 0 |
| bottomSize | 底部高度 | Number | -- | 0 |
| color | 颜色 | String | -- | "" |
| enableBackToTop | 双击顶部状态栏回到顶部 | Boolean | -- | false |


#### pagination Events


| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| refresh | 下拉刷新 | -- |
| more | 上拉加载 | -- |


#### pagination Slots


| name | 说明 |
| --- | --- |
| -- | 列表组件主体 |
| empty | 空列表 |


## 贡献

如果有什么好的建议欢迎提issues

## License

MIT
