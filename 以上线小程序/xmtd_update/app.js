//app.js
App({
  onLaunch: function () {

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: 'https://pei84s.cn/api/XcxGetTest.html',
          data: {
            appid: 'wx1156b60f7bba1f91',
            secret: 'adf9d3a8bea6f4de4b81b676e8be7475',
            js_code: res.code,
            grant_type: 'authorization_code'
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            wx.setStorageSync('openid', res.data.openid);
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})