// pages/collection/collection.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ishidden: true,
    collect: '暂无收藏',
    collectionUrls: [],
    update_time: '',
    kfhidden: '分享好友'
  },
  /**
   * 删除数据
   */
  onRemoveTap: function (e) {
    let that = this,
      cid = e.currentTarget.dataset.cid,
      openid = wx.getStorageSync('openid'),
      index = e.currentTarget.dataset.index;
    wx.showModal({
      title: '提示',
      content: '是否删除该收藏',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: 'https://pei84s.cn/api/XcxTitleDo.html',
            data: {
              openid: openid,
              cid: cid,
              dom: 'del'
            }
          })
          let arr = that.data.collectionUrls;
          arr.splice(index, 1);
          that.setData({
            collectionUrls: arr
          });
          if (arr.length === 0) {
            that.setData({
              ishidden: !that.data.ishidden
            })
          }
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
   * 跳转到详情界面
   */
  onMoreTap: function (e) {
    let txt = e.currentTarget.dataset.name,
        cid = e.currentTarget.dataset.cid;
    this.setData({
      moreTxt: txt,
      moreCid: cid
    })
    wx.navigateTo({
      url: '../content/content?cid=' + cid + '&txt' + txt,
      success: function (res) {
        wx.showToast({
          title: '加载中',
          duration: 1000,
          icon: 'loading',
        });
      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this,
      openid = wx.getStorageSync('openid');
    wx.request({
      url: 'https://pei84s.cn/api/XcxTitleDo.html',
      data: {
        openid: openid,
        dom: 'huoqu'
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        let reverse = res.data.reverse();
        that.setData({
          collectionUrls: reverse
        })
        if (res.data.length > 0) {
          that.setData({
            ishidden: false
          })
        }
      }
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {

    }
    return {
      title: res.target.dataset.name,
      imageUrl: res.target.dataset.src,
      path: 'pages/main/main/index',
      success: function (res) {
        // 转发成功
        console.log(res);
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})