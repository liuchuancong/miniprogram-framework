// components/city-selector/city-selector.js
import pyjs from 'js-pinyin'
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        cityList: {
            type: Array,
            value: []
        },
        hotCityList: {
            type: Array,
            value: []
        },
        showSearch: {
            type: Boolean,
            value: false
        },
        showLocation: {
            type: Boolean,
            value: false
        },
        mapKey: {
            type: String,
            value: ''
        }

    },

    /**
     * 组件的初始数据
     */
    data: {
        indexList: [],
        blocks: [],
        hotCityLists: [],
        showHot: false,
        showOverLay: false,
        overLayText: '',
        timer: null,
        searchKey: '',
        list: [],
        notHasLocationPermission: false,
        errMsg: "位置获取失败,请打开手机定位权限",
        showErrContent: false,
        locationCity: {
            name: ''
        },
        hasGetLocation: false,
        loadComplete: false
    },
    pageLifetimes: {
        show() {
            this.init()
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        reSetTimer(text) {
            const timer = setTimeout(() => {
                this.setData({
                    timer: timer,
                    overLayText: text,
                    showOverLay: false
                });
            }, 500);
            return timer
        },
        indexBarSelect(event) {
            const lasttimer = this.data.timer;
            lasttimer && clearTimeout(lasttimer);
            const timer = this.reSetTimer(event.detail)
            this.setData({
                timer: timer,
                overLayText: event.detail,
                showOverLay: true
            });
            console.log(event);
        },
        getCity(event) {
            this.triggerEvent('getCity', event.target.dataset.city);
        },
        search(e) {
            const p = pyjs.getFullChars(e.detail).toUpperCase().slice(0, 1)
            const tempList = this.data.blocks.filter((item) => item.title == p)
            const searchList = tempList && tempList.length > 0 ? tempList[0].city : []
            const result = searchList.filter((item) => item.name.indexOf(e.detail) != -1)
            this.setData({
                searchKey: e.detail,
                list: result.length > 0 ? result : searchList
            })
        },
        showList() {
            const {
                searchKey
            } = this.data;
            if (searchKey) {
                const p = pyjs.getFullChars(searchKey).toUpperCase().slice(0, 1)
                const tempList = this.data.blocks.filter((item) => item.title == p)
                const searchList = tempList && tempList.length > 0 ? tempList[0].city : []
                console.log(searchList);
                const result = searchList.filter((item) => item.name.indexOf(searchKey) != -1)
                this.setData({
                    list: result.length > 0 ? result : searchList
                })
            }
        },
        getPositionPermission: function () {
            wx.getSetting({
                success: (res) => {
                    if (
                        res.authSetting["scope.userLocation"] != undefined &&
                        res.authSetting["scope.userLocation"] != true
                    ) {
                        wx.showModal({
                            title: "是否授权当前位置",
                            content: "需要获取您的地理位置，请确认授权，否则无法获取当前城市",
                            success:  (res)=> {
                                if (res.cancel) {
                                    this.setData({
                                        notHasLocationPermission: true,
                                    });
                                } else if (res.confirm) {
                                    wx.openSetting({
                                        success:(data)=> {
                                            if (data.authSetting["scope.userLocation"] == true) {
                                                wx.showToast({
                                                    title: "授权成功",
                                                    icon: "success",
                                                    duration: 2000,
                                                });
                                                this.setData({
                                                    notHasLocationPermission: false,
                                                });
                                                this.getLocalCityInfo();
                                            } else {
                                                this.setData({
                                                    notHasLocationPermission: true,
                                                });
                                                wx.showToast({
                                                    title: "授权失败",
                                                    icon: "none",
                                                    duration: 2000,
                                                });
                                            }
                                        }
                                    });
                                }
                            },
                        });
                    } else if (res.authSetting["scope.userLocation"] == undefined) {
                        this.getLocalCityInfo();
                    } else {
                        this.getLocalCityInfo();
                    }
                },
            });
        },
        getLocalCityInfo: function () {
            //获取用户的初始位置
            wx.getLocation({
                type: "gcj02",
                success: (res) => {
                    this.setData({
                        notHasLocationPermission: false,
                        showErrContent: false,
                    });
                    const {
                        longitude,
                        latitude
                    } = res;
                    this.getLocation(longitude, latitude);
                },
                fail:  (res) =>{
                    wx.getSetting({
                        success: res => {
                            if (typeof (res.authSetting['scope.userLocation']) != 'undefined' && !res.authSetting['scope.userLocation']) {
                                // 用户拒绝了授权，跳转设置页面
                                $this.setData({
                                    notHasLocationPermission: true
                                })
                            }
                        }
                    });
                    if (
                        res.errMsg == "getLocation:fail:ERROR_NOCELL&WIFI_LOCATIONSWITCHOFF"
                    ) {
                        wx.showToast({
                            title: "位置获取失败,请打开手机定位权限",
                            icon: "none",
                            duration: 2000,
                        });
                        $this.setData({
                            showErrContent: true,
                        });
                    }
                },
            });
        },
        getLocation(longitude, latitude) {
            // 第三个参数为是否使用第三方地址
            if (this.data.mapKey) {
                wx.request({
                    url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${this.data.mapKey}`,
                    success: (res) => {
                        if (res.data.status == 0) {
                            const {city,adcode,province} = res.data.result.ad_info;
                            if (city) {
                                this.setData({
                                    locationCity: {
                                        "code": adcode,
                                        "name": city.replace('市', ''),
                                        "province": province
                                    },
                                    hasGetLocation: true
                                })
                            }

                        }
                    }
                })
            } else {
                wx.showToast({
                    title: '请传递mapKey',
                    icon: 'none'
                })
            }

        },
        init() {
            wx.showLoading({
                title: '正在初始化',
            })
            setTimeout(() => {
                wx.hideLoading()
            }, 1000)
            let d = {}
            let blocks = []
            let indexList = []
            this.data.cityList.map((item) => {
                const p = pyjs.getFullChars(item.name).toLowerCase().slice(0, 1)
                const c = p.charCodeAt(0)
                if (c > 96 && c < 123) {
                    if (!d[p]) {
                        d[p] = []
                        d[p].push(item)
                    } else {
                        d[p].push(item)
                    }
                }
            })


            for (let [k, v] of Object.entries(d)) {
                blocks.push({
                    title: k.toUpperCase(),
                    city: v
                })
            }
            blocks = blocks.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0))
            blocks.map((item) => {
                indexList.push(item.title)
            });
            // 热门城市
            if (this.data.hotCityList instanceof Array && this.data.hotCityList.length > 0) {
                this.setData({
                    showHot: this.data.hotCityList.length != 0
                })
            }
            this.getPositionPermission()
            this.setData({
                blocks,
                indexList,
                loadComplete: true
            })
        }
    }
})