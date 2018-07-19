// pages/result/result.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    A:'',
    B:'',
    C:'',
    record:'',
    imgUrl:''
  },
  
  // 学历判断
  recordTap:function(){
    let that = this;
    if (that.data.A > that.data.B && that.data.A > that.data.C){
      return '学士'
    } else if (that.data.B > that.data.A && that.data.B > that.data.C){
      return '硕士'
    } else if (that.data.C > that.data.A && that.data.C > that.data.B) {
      return '博士'
    } else if (that.data.A == that.data.B && that.data.A > that.data.C){
      return '大专'
    } else if (that.data.A > that.data.B && that.data.A == that.data.C){
      return '高中'
    } else if (that.data.A < that.data.B && that.data.B == that.data.C){
      return '文盲'
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    that.setData({
      A : options.A,
      B : options.B,
      C : options.C
    })
    that.setData({
      record: that.recordTap()
    })
    
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