import {
    setRequestUrl,
    checkUpdateVersion
} from './utils/system'

import Request from './utils/http'

import Toast from './utils/toast'

import Storge from './utils/storge'

import Log from './utils/log'

App({
    onLaunch() {
        const fs = wx.getFileSystemManager()
        console.log(fs);
        this.init()
    },
    init() {
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
    },
    globalData: {
        mapKey: '',
    }
})