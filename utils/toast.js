function Toast(options) {
    if (typeof options === 'number' || typeof options === 'string') {
        if (options != '') {
            wx.showToast({
                title: 'title',
                icon: 'none'
            })
        }
    } else if (typeof options === 'object') {
        if (options != null) {
            const { title, icon, image, duration, mask, success, fail, complete } = options
            wx.showToast({
                title: title,
                icon: icon || 'none',
                image: image,
                duration: duration || 1500,
                mask: mask || false,
                success: success || null,
                fail: fail || null,
                complete: complete || null,
            })
        }
    }
}
Toast.loading = function(options) {
    if (typeof options === 'number' || typeof options === 'string') {
        if (options != '') {
            wx.showToast({
                title: 'title',
                icon: 'loading'
            })
        }
    } else if (typeof options === 'object') {
        if (options != null) {
            const { title, duration, mask, success, fail, complete } = options
            wx.showToast({
                title: title,
                icon: 'loading',
                duration: duration || 1500,
                mask: mask || false,
                success: success || null,
                fail: fail || null,
                complete: complete || null,
            })
        }
    }
}
Toast.success = function(options) {
  if (typeof options === 'number' || typeof options === 'string') {
      if (options != '') {
          wx.showToast({
              title: 'title',
              icon: 'success'
          })
      }
  } else if (typeof options === 'object') {
      if (options != null) {
          const { title, duration, mask, success, fail, complete } = options
          wx.showToast({
              title: title,
              icon: 'success',
              duration: duration || 1500,
              mask: mask || false,
              success: success || null,
              fail: fail || null,
              complete: complete || null,
          })
      }
  }
}

Toast.error = function(options) {
  if (typeof options === 'number' || typeof options === 'string') {
      if (options != '') {
          wx.showToast({
              title: 'title',
              icon: 'error'
          })
      }
  } else if (typeof options === 'object') {
      if (options != null) {
          const { title, duration, mask, success, fail, complete } = options
          wx.showToast({
              title: title,
              icon: 'error',
              duration: duration || 1500,
              mask: mask || false,
              success: success || null,
              fail: fail || null,
              complete: complete || null,
          })
      }
  }
}

Toast.clear = function(options) {
  wx.hideToast()
}


export default Toast