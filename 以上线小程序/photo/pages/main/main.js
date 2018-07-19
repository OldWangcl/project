// pages/main/main.js
// const swiper = require('../../data/swiper.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots:false,
    autoplay:true,
    interval:3000,
    circular:true,//swiper值
    page: 1, //页面
    callbackcount: 10, //返回的值
    index:7,
    hidden:false,
    kfhidden:'分享好友'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    wx.showToast({
      title: '加载中',
      icon:'loading',
      success:function(res){
        that.requestTap();
      }
    });
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
     * 获取后台数据
     */
  requestTap: function () {
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
      success: function (res) {
        let itemLi = res.data.titles,
            json = JSON.parse(itemLi);
        that.setData({
          contentUrls: json
        
        })
      }
    })
  },
  /**
   * 跳转到更多详情界面
   */
  onContentTap:function(e){
    let txt = e.currentTarget.dataset.index;
    let cid = e.currentTarget.dataset.id;
    let img = e.currentTarget.dataset.img;
    wx.navigateTo({
      url: '../content/content?txt=' + txt + '&cid=' + cid
    })
    console.log(txt,"000000");
    wx.showToast({
      title: '加载中',
      duration: 1000,
      icon: 'loading',
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let that = this;
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
          that.setData({
            hidden: !that.data.hidden
          })
        } else {
          that.setData({
            contentUrls: (that.data.contentUrls).concat(jsons)
          });
          console.log(that.data.contentUrls,"6666");
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
     * 取消提示
     */
  onCancelTap: function () {
    this.setData({
      hidden: !this.data.hidden
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})