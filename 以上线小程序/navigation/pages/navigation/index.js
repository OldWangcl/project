// pages/navigation/index.js
const dataList = require('../../data/data.js');
const arrs = require('../../utils/arrs.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    circular: true,
    current: 0,
    swiper: {
      indicatorDots: false,
      autoplay: false,
      interval: 5000,
      duration: 1000
    },
    kfhidden: '分享好友'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    that.setData({
      imageUrls: dataList.dataList,
      contentUrls: arrs.contentList,
      happyUrls: arrs.happyUrls,
      relaxUrls: arrs.relaxUrls,
      toolUrls: arrs.toolUrls
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
   * 改变种类
   */
  switchSlider:function(e){
    this.setData({
      current:e.currentTarget.dataset.index
    })
  },
  /**
   * 改变内容
   */
  changeSlider:function(e){
    let that = this,
    current = e.detail.current,
    id = e.currentTarget.dataset.id;
        that.setData({
          current: e.detail.current,
        })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(res,e) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res)
    }
    return {
      title: res.target.dataset.txt,
      imageUrl:res.target.dataset.imgs,
      path: '/page/navigation/index'
    }
  }
})