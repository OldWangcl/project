// pages/column/column.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: false,
    autoplay: false,
    circular: true, //swiper值
    page: 1, //页面
    callbackcount: 10, //返回的值
    index: 4,
    uniform: 3,
    lovely: 6,
    current:0,
    circular:true,
    interval: 5000,
    duration: 1000,
    kfhidden: '分享好友'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      success: function (res) {
        that.requestTap();
        that.uniformTap();
        that.lovelyTap();
        that.controlTap();
      }
    })
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
   * 校花美女
   */
  requestTap: function() {
    let that = this;
    wx.request({
      url: 'https://pei84s.cn/service/RefreshTitle.html',
      data: {
        con: that.data.index,
        page: that.data.page,
        count: that.data.callbackcount
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        let itemLi = res.data.titles,
          json = JSON.parse(itemLi);
        that.setData({
          contentUrls: json
        })
        console.log(json)
      }
    })
  },
  /**
   * 丝袜制服
   */
  uniformTap: function() {
    let that = this;
    wx.request({
      url: 'https://pei84s.cn/service/RefreshTitle.html',
      data: {
        con: that.data.uniform,
        page: that.data.page,
        count: that.data.callbackcount
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        let itemLi = res.data.titles,
          json = JSON.parse(itemLi);
        that.setData({
          uniformUrls: json
        })
        console.log(json)
      }
    })
  },
  /**
   * 清纯可人
   */
  lovelyTap: function() {
    let that = this;
    wx.request({
      url: 'https://pei84s.cn/service/RefreshTitle.html',
      data: {
        con: that.data.lovely,
        page: that.data.page,
        count: that.data.callbackcount
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        let itemLi = res.data.titles,
          json = JSON.parse(itemLi);
        that.setData({
          lovelyUrls: json
        })
        console.log(json)
      }
    })
  },
  /**
   * 改变种类
   */
  switchSlider: function(e) {
    this.setData({
      current: e.currentTarget.dataset.index
    })
  },
  /**
   * 改变内容
   */
  changeSlider: function(e) {
    let that = this,
      current = e.detail.current,
      id = e.currentTarget.dataset.id;
    that.setData({
      current: e.detail.current,
    })
  },
  /**
   * 跳转到更多详情界面
   */
  onContentTap: function(e) {
    let txt = e.currentTarget.dataset.index;
    let cid = e.currentTarget.dataset.id;
    let img = e.currentTarget.dataset.img;
    wx.navigateTo({
      url: '../content/content?txt=' + txt + '&cid=' + cid
    })
    console.log(txt, "000000");
    wx.showToast({
      title: '加载中',
      duration: 1000,
      icon: 'loading',
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    this.requestsTap();
    this.uniformsTap();
    this.lovelysTap();
  },
  /**
   * 校花美女
   */
  requestsTap:function(){
    let that = this;
    console.log(that.data.contentUrls, "00000")
    that.setData({
      page: that.data.page + 1
    });
    wx.request({
      url: 'https://pei84s.cn/service/RefreshTitle.html',
      data: {
        con: that.data.index,
        page: that.data.page,
        count: that.data.callbackcount
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        let pageall = res.data.pageall,
          itemLi = res.data.titles,
          jsons = JSON.parse(itemLi)
        if (that.data.page > pageall) {
          wx.showModal({
            title: '温馨提示',
            content: '没有更多内容了哦~',
            showCancel: false
          })
        } else {
          that.setData({
            contentUrls: (that.data.contentUrls).concat(jsons)
          });
          wx.showToast({
            title: '正在加载更多',
            icon: 'loading',
            duration: 1000
          })
        }
      }
    })
  },
  /**
    * 丝袜制服
    */
  uniformsTap: function () {
    let that = this;
    console.log(that.data.contentUrls, "00000")
    that.setData({
      page: that.data.page + 1
    });
    wx.request({
      url: 'https://pei84s.cn/service/RefreshTitle.html',
      data: {
        con: that.data.uniform,
        page: that.data.page,
        count: that.data.callbackcount
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        let pageall = res.data.pageall,
          itemLi = res.data.titles,
          jsons = JSON.parse(itemLi)
        if (that.data.page > pageall) {
          wx.showModal({
            title: '温馨提示',
            content: '没有更多内容了哦~',
            showCancel: false
          })
        } else {
          that.setData({
            contentUrls: (that.data.contentUrls).concat(jsons)
          });

          wx.showToast({
            title: '正在加载更多',
            icon: 'loading',
            duration: 1000
          })
        }
      }
    })
  },
  /**
   * 清纯可人
   */
  lovelysTap: function () {
    let that = this;
    console.log(that.data.contentUrls, "00000")
    that.setData({
      page: that.data.page + 1
    });
    wx.request({
      url: 'https://pei84s.cn/service/RefreshTitle.html',
      data: {
        con: that.data.lovely,
        page: that.data.page,
        count: that.data.callbackcount
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        let pageall = res.data.pageall,
          itemLi = res.data.titles,
          jsons = JSON.parse(itemLi)
        if (that.data.page > pageall) {
          wx.showModal({
            title: '温馨提示',
            content: '没有更多内容了哦~',
            showCancel:false
          })
        } else {
          that.setData({
            contentUrls: (that.data.contentUrls).concat(jsons)
          });

          wx.showToast({
            title: '正在加载更多',
            icon: 'loading',
            duration: 1000
          })
        }
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})