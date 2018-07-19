// pages/result/result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      A:'',
      B:'',
      C:'',
      Kind:'UNKnow'
  },
  // 性格类型判断
  kindType:function(){
    var that = this;
    if(that.data.A > that.data.B && that.data.A > that.data.C){
      return "听觉型"
    }
    else if (that.data.B > that.data.A && that.data.B > that.data.C){
      return "视觉型"
    }
    else if (that.data.C > that.data.A && that.data.C > that.data.B) {
      return "动觉型"
    }
    else if (that.data.A == that.data.B && that.data.A > that.data.C) {
      return "听觉视觉均衡型"
    }
    else if (that.data.A > that.data.B && that.data.A == that.data.C) {
      return "听觉动觉均衡型"
    }
    else if (that.data.A < that.data.B && that.data.B == that.data.C) {
      return "视觉动觉均衡型"
    }
    else{
      return "恭喜您，各项都很均衡"
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var A = options.A;
    console.log(A,"9999")
    var B = options.B;
    var C = options.C;
    this.setData({
      A:A - 0,
      B:B - 0,
      C:C - 0,
    })
    that.setData({
      Kind:that.kindType()
    })
    console.log(that.kindType());
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
  onShareAppMessage: function (res) {
    var openid = wx.getStorageSync('openid');
    console.log(openid,"33333")
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res)
    }
    return {
      title: '分享给朋友，看看是什么性格',
      path: 'pages/index/index',
      // imageUrl:'../../images/myCode1.png',
      success: function (res) {
        // 转发成功
        console.log(res)

      },
      fail: function (res) {
        // 转发失败
      }
    }

  }
})