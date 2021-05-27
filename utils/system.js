const setRequestUrl = (context) => {
  const accountInfo = wx.getAccountInfoSync();
  switch (accountInfo.miniProgram.envVersion) {
    case 'develop':
      //开发
      context.globalData.url = 'https://test.tyt2.wl168.net';
      context.globalData.showLog = true
      break;
    case 'trial':
      //体验
      context.globalData.url = 'https://test.tyt2.wl168.net';
      context.globalData.showLog = false
      break;
    case 'release':
      //正式
      context.globalData.url = 'https://tyt.hntyy.com.cn';
      context.globalData.showLog = false
      break;
  }
}
const checkUpdateVersion = () => {
  if (wx.canIUse("getUpdateManager")) {
    const t = wx.getUpdateManager();
    if (t) {
      t.onCheckForUpdate((e) => {
        e.hasUpdate && (t.onUpdateReady(() => {
          t.applyUpdate()
        }), t.onUpdateFailed(() => {
          wx.showModal({
            title: "已经有新版本喽~",
            content: "请您删除当前小程序，到微信 “发现-小程序” 页，重新搜索打开哦~"
          })
        }))
      })
    }

  } else wx.showModal({
    title: "溫馨提示",
    content: "当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。"
  })
}

export {
  setRequestUrl,
  checkUpdateVersion
}