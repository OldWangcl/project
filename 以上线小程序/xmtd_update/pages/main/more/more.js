// pages/main/more/more.js
const app = getApp();
const util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: false,
    contentUrls: [],
    disabled: false,
    update_time: '', //时间
    // length:'',
    popular_value: '',//人气值
    add: '',
    deleted: '',
    kfhidden: '分享好友'
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this,
        txt = options.id,
        cid = options.cid;
    this.setData({
      txt:txt,
      cid:cid
    })
    /****** 后台控制按钮开关 *******/
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
        if (res.data != '') {
          var arrs = res.data;
          if (arrs['key6'] === that.data.kfhidden) {
            that.setData({
              kfhidden: true
            })
          } else {
            that.setData({
              kfhidden: false
            })
          }
        }
      }
    })
    /*********数据调用 **********/
    that.requestTap();
  },
  /**
   * 传递参数到数据库
   */
  requestTap:function(){
    let that = this;
    wx.request({
      url: 'https://pei84s.cn/api/XcxGetTitleOne.html',
      data: {
        cid: that.data.cid,
        numbers: that.data.popular_value
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        let aa = res.data;
        if (aa['cid'] === that.data.cid) {
          that.setData({
            contentUrls: aa
          })
          let txt = res.data.txt;
          wx.setNavigationBarTitle({
            title: txt
          })
          let sjc = that.data.contentUrls['update_time']; //时间戳转化
          let time = util.formatTime2(sjc, 'Y/M/D');
          let numbers = aa['ctimes'];
          that.setData({
            update_time: time,
            popular_value: numbers
          })
        }
      }
    })
  },
  /**
   * 收藏功能
   */
  onCollectionTap:function(e){
    let that = this,
      openid = wx.getStorageSync('openid'),
      txt = e.currentTarget.dataset.txt,
      img = e.currentTarget.dataset.img,
      cid = e.currentTarget.dataset.cid,
      index = e.currentTarget.dataset.index,
      time = util.formatTime3(new Date()),
      value = e.currentTarget.dataset.value;
    wx.request({
      url: 'https://pei84s.cn/api/XcxTitleDo.html',
      data: {
        openid: openid,
        name: txt,
        img: img,
        cid: cid,
        time: time,
        dom: 'save',
        value: value,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data.msg === '收藏成功') {
          wx.showToast({
            title: res.data.msg,
            icon: 'success',
            duration: 1000
          })
        } else if (res.data.msg === '你已经收藏了') {
          wx.showModal({
            title: '提示',
            content: "亲，您已经收藏过了",
            showCancel: false
          })
        }
      }
    })
  },
  /**
   * 点赞功能
   */
  onLikeTap: function (e) {
    let that = this;
    wx.request({
      url: 'https://pei84s.cn/api/XcxGetTitleOne.html',
      data: {
        cid: that.data.cid,
        numbers: that.data.popular_value
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var openid = wx.getStorageSync('openid');
        var time = res.data;
        var numbers = time['ctimes'];
        console.log(numbers,"898248");
        console.log(that.data.popular_value,"66666");
        if (numbers === that.data.popular_value) {
          that.setData({
            popular_value: parseFloat(numbers) + 1
          });
          that.showToast();
        } else if (numbers + 1 != that.data.popular_value) {
          wx.showModal({
            title: '温馨提示',
            content: '亲！恭喜您点 👍 成功',
            showCancel: false
          })
        }
      }
    })
  },
  // 交互模板
  showToast: function () {
    wx.showModal({
      title: '温馨提示',
      content: '亲！点赞失败了，再赞我一次吧~',
      showCancel: false
    })
  },

  /**
   * 更多图文
   */
  onMoreTap:function(){
    wx.switchTab({
      url: '../main/index'
    })
  },
  
  /**
   * 打赏功能
   */
  onExpectTap: function (e) {
    let cid = e.currentTarget.dataset.cid,
        txt = e.currentTarget.dataset.txt,
        value = e.currentTarget.dataset.value,
        time = e.currentTarget.dataset.time;
    wx.redirectTo({
      url: '../expect/expect?cid=' + cid + '&txt=' + txt + '&value=' + value + '&time=' + time
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    let arr = this.data.contentUrls;
    let img = arr.img;
    let txt = arr.txt;
    let cid = arr.cid;
    let ctimes = arr.ctimes;
    let update_time = arr.update_time;
    if (res.from === 'button') {
    }
    return {
      title: txt,
      imageUrl: img,
      path: 'pages/main/more/more?cid=' + cid + '&ctimes' + ctimes + '&update_time' + update_time,
      success: function (res) {
        // 转发成功

      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})