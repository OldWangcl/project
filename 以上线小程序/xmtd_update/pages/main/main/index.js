// pages/main/main.js
const util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 500,
    circular: true,
    page: 1, //页面
    callbackcount: 10, //返回的值
    hidden: false,
    kfhidden: '分享好友'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.requestTap();
    this.controlTap();
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
   * 获取后台数据
   */
  requestTap: function() {
    let that = this;
    wx.request({
      url: 'https://pei84s.cn/service/RefreshTitle.html',
      data: {
        page: that.data.page,
        count: that.data.callbackcount
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        let item = res.data.titles;
        let arrItem = JSON.parse(item);
        that.setData({
          contentUrls: arrItem
        })
        console.log(arrItem, "00");
        for (let i = 0; i < arrItem.length; i++) {
          if (arrItem['cid'] == that.data.cid) {
            let time = arrItem[i].update_time,
              value = arrItem[i].ctimes;
            let times = util.formatTime2(time, 'Y/M/D');
            that.setData({
              update_time: times,
              popular_value: value
            })
          }
        }
      }
    })
  },
  /**
   * 跳转到更多内容界面
   */
  onMoreTap: function(e) {
    let txt = e.currentTarget.dataset.index;
    let cid = e.currentTarget.dataset.id;
    let img = e.currentTarget.dataset.img;
    wx.navigateTo({
      url: '../more/more?id=' + txt + '&cid=' + cid
    })
    wx.showToast({
      title: '加载中',
      duration: 1000,
      icon: 'loading',
    });
  },
  /**
   * 刷新按钮刷新页面
   */
  onRefreshTap: function() {
    let that = this;
    wx.showToast({
      title: '正在刷新',
      icon: 'loading',
      duration: 1000,
      success: function(res) {
        wx.request({
          url: 'https://pei84s.cn/service/RefreshTitle.html',
          data: {

          },
          header: {
            'content-type': 'application/json'
          },
          success: function(res) {
            var itemLi = res.data.titles;
            var reverse = itemLi.reverse();
            that.setData({
              contentUrls: reverse
            })
          }
        })
      }
    });
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    let that = this;
    that.setData({
      page: that.data.page + 1
    })
    wx.request({
      url: 'https://pei84s.cn/service/RefreshTitle.html',
      data: {
        page: that.data.page,
        count: that.data.callbackcount
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(res) {
        var pageall = res.data.pageall;
        var item = res.data.titles;
        var arrItem = JSON.parse(item)
        if (that.data.page > pageall) {
          that.setData({
            hidden: !that.data.hidden
          })
        } else {
          that.setData({
            contentUrls: (that.data.contentUrls).concat(arrItem)
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
  onCancelTap: function() {
    this.setData({
      hidden: !this.data.hidden
    })
  }
})