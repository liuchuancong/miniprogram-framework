/**
 * @url 请求地址 必传 
 * @method 请求方式 默认  POST
 * @header 请求头 可选 
 * @data 请求参数
 */
export default class Request {
  constructor(context){
    this.baseUrl = context.globalData.url
  }
  static isHttpUrl = (url) => {
    const reg = new RegExp(/^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/)
    return reg.test(url)
  }
  static request(options, method) {
    const {
      url
    } = options;
    let stop = () => {};
    const abortPromise = new Promise((resolve) => {
      stop = () => {
        resolve({
          isOk: false,
          errMsg: "request is abort",
        });
      };
    });
    const requestPromise = new Promise((resolve) => {
      let addToken;
      const token = wx.getStorageSync("token");
      if (token) {
        addToken = {
          Authorization: wx.getStorageSync("token"),
        };
      }
      return new Promise((_resolve, _reject) => {
          wx.request(
            Object.assign(Object.assign({}, options), {
              method: method || "POST",
              url: this.isHttpUrl(url) ? url : `${this.baseUrl}${url}`,
              header: Object.assign(
                Object.assign({
                    "content-type": "application/json;charset=UTF-8",
                    requestSource: "weChat",
                  },
                  addToken
                ),
                options.header
              ),
              success: function (res) {
                _resolve(res);
              },
              fail: function (err) {
                _reject(err);
              },
            })
          );
        })
        .then(this.checkHttpStatus)
        .then((response) => {
          const {
            data
          } = response;
          let result;
          const {
            status,
            ...rest
          } = data;
          rest.result ? (result = rest.result) : (result = rest);
          if (status === 200) {
            resolve({
              data: result,
              isOk: true
            });
          } else {
            if (status === 405 || status == 403) {
              this.reLogin()
            }
            this.getMessage(result, () => {
              setTimeout(() => {
                resolve({
                  isOk: false,
                });
              }, 1000);
            })
          }
        })
        .catch((error) => {
          if (error.response.statusCode === 401) {
            wx.redirectTo({
              url: '/pages/login/login',
            })
          } else {
            const errorStr = error.errMsg || error.message || error;
            wx.showToast({
              title: errorStr || "",
              icon: "none",
              duration: 1000,
            });
          }
        });
    });
    const promiseWithAbort = Promise.race([abortPromise, requestPromise]);
    promiseWithAbort.abort = stop;
    return promiseWithAbort;
  }


  static getMessage = (data, callback) => {
    if (Array.isArray(data.messageDetails) && data.messageDetails.length > 0) {
      wx.showToast({
        title: data.messageDetails[0].value,
        icon: 'none',
        duration: 2000,
        success: () => {
          callback && callback()
        }
      })
    } else {
      wx.showToast({
        title: data.message,
        icon: 'none',
        duration: 2000,
        success: () => {
          callback && callback()
        }
      })
    }
  }
  static reLogin = () => {
    var pages = getCurrentPages(); //获取加载的页面
    var currentPage = pages[pages.length - 1]; //获取当前页面的对象
    var url = currentPage.route; //当前页面url
    if (url != 'pages/loginOpt/loginOpt') {
      wx.navigateTo({
        url: "/pages/loginOpt/loginOpt",
        success: () => {
          wx.showToast({
            title: '请重新登陆',
            icon: 'none',
            duration: 2000
          });
        }
      })
    }
  }
  static get(options) {
    return this.request(Object.assign({}, options));
  }
  static post(options) {
    return this.request(
      Object.assign(Object.assign({}, options), {
        data: options.data,
      }),
      "POST"
    );
  }
  static put(options) {
    return this.request(
      Object.assign(Object.assign({}, options), {
        data: options.data,
      }),
      "PUT"
    );
  }
  static delete(options) {
    return this.request(
      Object.assign(Object.assign({}, options), {
        data: options.data,
      }),
      "DELETE"
    );
  }
  //检查服务器连接状态
  static checkHttpStatus(response) {
    if (response.statusCode >= 200 && response.statusCode < 300) {
      return response;
    }
    const message = `连接失败！ERROR:${response.statusCode}`;
    const error = new Error(message);
    error.response = response;
    throw error;
  }
  //检查过滤特殊的访问地址
  static reqIntercept(path) {
    const commonReqUrlList = [
      // queryAirportCnAndAbURL
    ].filter((item) => path.indexOf(item) !== -1);
    return commonReqUrlList.length > 0;
  }
}