// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden:true,
    kfhidden: '分享好友'
  },
  // 登录答题
  onLoginTap:function(){
    let that = this;
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              var userInfo = res.rawData;
              wx.redirectTo({
                url: "../test/test?userInfo=" + userInfo
              })
            }
          })
        }
      },
      fail: function (res) {
        console.log(res, "555");
      }
    })
  },
  openSetting:function(){

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    setTimeout(function(){
      that.setData({
        hidden: !that.data.hidden
      });
    },500);
    that.controlTap();

  },
  /**
     * 控制开关
     */
  controlTap: function () {
    let that = this;
    wx.request({
      url: 'https://pei84s.cn/api/XcxKeysGet.html',
      data: {
        openid: wx.getStorageSync('openid'),
        appid: 'wx1156b60f7bba1f91'
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data, "999")
        if (res.data != '') {

          var arrs = res.data;
          if (arrs['key6'] === that.data.kfhidden) {
            console.log(arrs['key6'], "9992")
            that.setData({
              kfhidden: true
            })
          } else {
            that.setData({
              kfhidden: false
            });
            wx.showModal({
              title: '温馨提示',
              content: '页面崩溃了呢，请联系客服人员反馈问题',
              showCancel: false
            })
          }
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})