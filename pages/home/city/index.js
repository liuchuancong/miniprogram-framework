import {
  city
} from '../../../common/city.min'
const app = getApp()
Page({
  data: {
    city: [],
    hotCityList: [],
    mapKey: ''
  },
  onLoad() {
    this.init()
  },
  getCity(city) {
    wx.toast.loading('city')
  },
  init() {
    const hotCityList = [{
        "code": "110100",
        "name": "北京",
        "province_code": "110000",
        "province": "北京市"
      },
      {
        "code": "120100",
        "name": "天津",
        "province_code": "120000",
        "province": "天津市"
      },
      {
        "code": "310100",
        "name": "上海",
        "province_code": "310000",
        "province": "上海市"
      },
      {
        "code": "320100",
        "name": "南京",
        "province_code": "320000",
        "province": "江苏省"
      },
      {
        "code": "320500",
        "name": "苏州",
        "province_code": "320000",
        "province": "江苏省"
      },
      {
        "code": "330100",
        "name": "杭州",
        "province_code": "330000",
        "province": "浙江省"
      },
      {
        "code": "420100",
        "name": "武汉",
        "province_code": "420000",
        "province": "湖北省"
      },
      {
        "code": "440100",
        "name": "广州",
        "province_code": "440000",
        "province": "广东省"
      },
      {
        "code": "440300",
        "name": "深圳",
        "province_code": "440000",
        "province": "广东省"
      },
      {
        "code": "500100",
        "name": "重庆",
        "province_code": "500000",
        "province": "重庆市"
      },
      {
        "code": "510100",
        "name": "成都",
        "province_code": "510000",
        "province": "四川省"
      },
      {
        "code": "610100",
        "name": "西安",
        "province_code": "610000",
        "province": "陕西省"
      }
    ]
    this.setData({
      city,
      hotCityList,
      mapKey:app.globalData.mapKey
    })
  },
})