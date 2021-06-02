export default class Validate {
  constructor(context) {
    this.debug = context.globalData.debug
  }
  static isEmpty(value) {
    if (undefined == value || null == value || "" == value) {
      return true;
    }
    return false;
  }
  static phone(phone, message) {
    if (this.isEmpty(phone)) {
      wx.toast(message || '请输入手机号')
      return false
    } else if (String(phone).length != 11) {
      wx.toast(message || '手机号码长度有误')
      return false
    } else {
      const phoneReg = /^1[3-9]\d{9}$/;
      if (!phoneReg.test(phone)) {
        wx.toast(message || "手机号码有误");
        return false
      }
      return true
    }
  }
  static password(password, message) {
    if (this.isEmpty(password)) {
      wx.toast(message || '请输入密码')
      return false
    } else {
      const reg = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/]).{8,20}$/;
      if (!reg.test(password)) {
        wx.toast(message || "密码必须是8-20位的字母数字及特殊字符");
        return false
      }
      return true
    }
  }
}