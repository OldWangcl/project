// pages/column/column.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    columnUrls: [],
    kfhidden: '分享好友'
  },
  // 跳转到内容界面
  onColoumTap: function (e) {
    let index = e.currentTarget.dataset.id,
      tyname = e.currentTarget.dataset.tyname;
      console.log(index,"999");
    wx.navigateTo({
      url: 'column_main/column_main?id=' + index + '&A=' + tyname
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.request({
      url: 'https://pei84s.cn/api/XcxGetTitleType.html',
      data: {

      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var aa = res.data.reverse();
        that.setData({
          columnUrls: aa
        })
      }
    });
    that.controlTap();
  },

  /**
   * 控制开关
   */
  controlTap:function(){
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})