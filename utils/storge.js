export default  class Storge{
  static set(key,data){
    wx.setStorageSync(key,data)
  }
  static get(key){
    wx.getStorageSync(key)
  }
  static remove(key){
    wx.removeStorage(key)
  }
  static clear(){
    wx.clearStorageSync()
  }
}