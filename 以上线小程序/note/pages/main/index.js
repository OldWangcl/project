// pages/main/index.js
// var DBPost = require('../../db/DBPost.js').DBPost;
// import {DBPost} from '../../db/DBPost.js';
// var dataObj = require('../../data/data.js');
var openId = '';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyboardInputValue: '',
    pageH: 0,
    pageW: 0,
    postList: [],
    ishidden:false,
    leave:'全部留言',
    title:'哈哈', //标题,
    keylist:[],
    hidden:'分享好友',
    kfhidden: '分享好友'
  },

  //客服按钮
  onKfTap:function(){
    wx.showModal({
      title: '提示',
      content: '这是一个客服按钮',
      showCancel:false
    })
  },
  // 获取用户输入
  bindCommentInput: function (e) {
    var val = e.detail.value;
    this.data.keyboardInputValue = val;
    // console.log(val);
  },
  submitComment: function () {
    var that = this;
    var comments = [];
    setTimeout(function () {
      if (!that.data.keyboardInputValue) {
       that.comment();
      }
      else if (that.data.postList.length >= 0) {
        console.log(997);
        console.log(that.data.postList.length);
        comments.push({
          hide: that.data.keylist['key4'],
          txt: that.data.keyboardInputValue
        })
        that.setData({
          postList: that.data.postList.concat(comments),
          keyboardInputValue: ''
        })
        that.sendNote();
        var Json = JSON.stringify(that.data.postList);
        wx.request({
          url: 'https://pei84s.cn/api/XcxNoteAdd.html',
          data: {
            openid: openId,
            note: Json
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            console.log(66578);
            console.log(openId);
          }
        })
      }
    },1000)
  },
  // 全部留言判断
  allLeave:function(){
    var leave = wx.getStorageSync('openid');
    var that = this;
    
      if (leave !== openId) {
        that.setData({
          // ishidden: !that.data.ishidden,
          leave: '我的留言'
        })
      }
      else {
        that.setData({
          // ishidden: that.data.ishidden,
          leave: '全部留言'
        })
      }
    
    
  },
  // 评论数据
  comment: function () {
    wx.showToast({
      title: '请输入评论',
      duration: 1000,
      icon: 'loading'
    })
  },
  sendNote:function(){
    wx.showToast({
      title: '发送成功',
      duration:1000,
      icon:'success'
    })
  },
  // 我的留言
  onMyLeaveTap: function () {
      wx.navigateTo({
        url: '../leave/index',
      }) 
      // wx.showNavigationBarLoading();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this;
    wx.request({
      url: 'https://pei84s.cn/api/XcxKeysGet.html',
      data:{
        openid: wx.getStorageSync('openid'),
        appid:'wxe2b9a6c3f7150e24'
      },
      header: {
        'content-type': 'application/json'
      },
      success:function(res){
        if (res.data !== '') {
          // var aa = res.data.split('oaHTaGaVmmhlnmg=');
          var arrs = res.data;
          console.log(arrs);
          wx.setNavigationBarTitle({
            title: arrs['key1']
          });
          if(arrs['key6'] ===that.data.hidden){
            that.setData({
              hidden:true
            })
          }else{
            that.setData({
              hidden: false,
              leave:'全部账单'
            })
          }
          that.setData({
            // postList: arrs,
            keylist: arrs
          })
          console.log(356);
          console.log(that.data.keylist);
        }
      }
     
    });
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
    var that = this;
    // if (e.fopenid) {
    //   openId = e.fopenid;
    // } else {
    //   openId = wx.getStorageSync('openid');
    // }
    openId = wx.getStorageSync('fopenid');
    console.log(openId);
    console.log(openId);
    that.setData({
      postList:[]
    })
    wx.request({
      url: 'https://pei84s.cn/api/XcxNoteGet.html',
      data: {
        // openid: wx.getStorageSync('openid')
        openid: openId
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.data !== '') {
          // var aa = res.data.split('oaHTaGaVmmhlnmg=');
          var arrs = res.data;
          that.setData({
            postList: arrs
          })
          console.log(that.data.postList);
        }
      }
    })
    that.allLeave();  
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
    wx.stopPullDownRefresh();
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
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
      return {
        title: '分享给朋友，看看大家对我有啥话',
        path: 'pages/main/index?fopenid=' + wx.getStorageSync('openid'),
        // imageUrl:'../../images/myCode1.png',
        success: function (res) {
          // 转发成功
          
        },
        fail: function (res) {
          // 转发失败
        }
      }
      
  }
})