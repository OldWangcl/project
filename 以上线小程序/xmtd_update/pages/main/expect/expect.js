// pages/main/expect/expect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    poor: '有钱的捧个钱场',
    poors: '没钱的捧个人场',
    money: [0.1, 1.34, 1.56, 1.88, 2.66, 2.88, 3.14, 3.56, 3.66, 3.88, 8.88, 18.88],
    cid: '',
    txt: '',
    value: '',
    time: ''
  },
  // 点击支付
  onPoorTab: function (e) {
    let that = this,
        money = e.currentTarget.dataset.money,
        openId = wx.getStorageSync('openid');
    wx.request({
      url: 'https://pei84s.cn/api/XcxPay.html',
      data: {
        openid: openId,
        totalfee: money
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        var arrs = res.data
        wx.requestPayment({
          timeStamp: arrs.timeStamp,
          nonceStr: arrs.nonceStr,
          package: arrs.package,
          signType: arrs.signType,
          paySign: arrs.paySign,
          success: function (res) {
            wx.navigateTo({
              url: '../more/more?cid=' + that.data.cid + '&txt=' + that.data.txt + '&value=' + that.data.value + '&time=' + that.data.time
            })
          },
          fail: function (res) {
            console.log(res);
            wx.showModal({
              title: '提示',
              content: '支付失败，请重新支付',
              showCancel: false
            })
          },
          complete: function (res) {
            console.log(res);
          }
        })
      }
    })
  },
  // 更多图文
  onMoreTap: function () {
    wx.switchTab({
      url: '../main/index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var cid = options.cid;
    var txt = options.txt;
    var value = options.value;
    var time = options.time;
    this.setData({
      cid: cid,
      txt: txt,
      value: value,
      time: time
    })
    console.log(options.txt,"9999")
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