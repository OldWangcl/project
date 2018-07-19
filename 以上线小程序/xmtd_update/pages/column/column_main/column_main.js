// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hidden: false,
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 500,
    circular: true,
    index: '',
    page: 1,
    callbackcount: 10,
    // 轮播图 end
    /**内容 start*/
    contentUrls: []
    /**内容 end*/
  },
  /**
   * 刷新界面
   */
  onRefreshTap: function () {
    var that = this;
    wx.showToast({
      title: '正在刷新',
      icon: 'loading',
      duration: 1000,
      success: function (res) {
        wx.request({
          url: 'https://pei84s.cn/api/XcxGetTitle.html',
          data: {

          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            var itemLi = res.data;
            that.setData({
              contentUrls: itemLi
            })
          }
        })
      }
    });
  },
  /**
   * 跳转到更多界面
   */
  onMoreTap: function (e) {
    let txt = e.currentTarget.dataset.index,
        cid = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../../main/more/more?id=' + txt + '&cid=' + cid,
      success:function(res){
        wx.showToast({
          title: '加载中',
          duration: 1000,
          icon: 'loading',
        });
      }
    }) 
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let index = options.id,
        tyname = options.A;
    this.setData({
      index: index
    })
    wx.setNavigationBarTitle({
      title: tyname
    })
    this.requestTap();
  },
  // 获取服务器数据
  requestTap: function (res) {
    var that = this;
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
        var itemLi = res.data.titles;
        var json = JSON.parse(itemLi);
        that.setData({
          contentUrls: json
        })
      }
    })
    wx.stopPullDownRefresh();
  },
  /**
   * 跳转到收藏界面
   */
  onCollectTap: function () {
    wx.switchTab({
      url: '../../collection/collection'
    })
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
  }
})