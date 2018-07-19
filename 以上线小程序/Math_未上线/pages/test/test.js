// pages/test/test.js
const problem = require('../../data/post-data.js');
// const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {}, //用户信息
    backgroundImg: 'http://imoeu.com.img.800cdn.com/html/wechat/images/yunshi/blackbord-01.png',
    isPlayMusic: true, //控制音乐播放按钮显示
    dataUrl: 'http://imoeu.com.img.800cdn.com/html/wechat/images/yunshi/zxyx.mp3',
    title: '真心英雄',
    index:0,
    bgA:'', //选中按钮改变背景色
    bgB:'',
    bgC:'',
    optionA:'A',
    optionB:'B',
    optionC:'C',
    questionDetail: problem.question[0].question, //初始题目
    answerA: problem.question[0].option.A, //初始答案
    answerB: problem.question[0].option.B,
    answerC: problem.question[0].option.C,
    list: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    listABC: ['A', 'B', 'C'],
    realIndex: 0, //问题序号
    A: 0,
    B: 0,
    C: 0,
    a: 0,
    b: 0,
    c: 0,
  },
  // 暂停音乐
  onPauseMusic: function () {
    wx.pauseBackgroundAudio();
    this.setData({
      isPlayMusic: !this.data.isPlayMusic
    })
  },
  onStartMusic: function () {
    this.backgroundMusic()
    this.setData({
      isPlayMusic: !this.data.isPlayMusic
    })
  },
  // 背景音乐
  backgroundMusic: function () {
    let that = this;
    wx.playBackgroundAudio({
      dataUrl: that.data.dataUrl,
      title: that.data.title
    })
  },
  // 关闭页面停止音乐
  setMusicStop:function(){
    let that = this;
    wx.onBackgroundAudioStop(function(){
      that.setData({
        isPlayMusic: !that.data.isPlayMusic
      })
    })
  },
  // 获取返回的一个随机数
  randSort:function(){
    return Math.random() > 0.5 ? 1 : -1;
  },
  // 设置列表
  setList:function(){
    var newList = this.data.list.sort(this.randSort);
    console.log(newList,"999");
    this.setData({
      list: newList
    })
  },
  //ABC答案
  setABC:function(){
    var abc = this.data.listABC.sort(this.randSort);
    console.log(abc,"7777");
    this.setData({
      listABC: abc
    })
  },
  ///////////////
  // 选择A题目
  onAnswerATap: function () {
    let that = this;
    if (that.data.listABC[0] == 'A') {
      that.setData({
        A: that.data.A + 1
      })
    }
    else if (that.data.listABC[0] == 'B') {
      that.setData({
        B: that.data.B + 1
      })
    }
    if (that.data.listABC[0] == 'C') {
      that.setData({
        C: that.data.C + 1
      })
    }
    that.setData({
      index: that.data.index + 1,
      realIndex: that.data.list[that.data.index]
    })
    console.log(that.data.list[that.data.index], "that.data.list[that.data.index]")
    that.setData({
      questionDetail: problem.question[that.data.realIndex].question,
      answerA: problem.question[that.data.realIndex].option[that.data.listABC[0]],
      answerB: problem.question[that.data.realIndex].option[that.data.listABC[1]],
      answerC: problem.question[that.data.realIndex].option[that.data.listABC[2]],
    })
    // 选择改变颜色
    that.setData({
      bgA: '#00FF00',
      bgB:'',
      bgC:''
    })
    if (this.data.index == 10) {
      wx.showToast({
        title: '阅卷中。。。',
        icon:'loading',
        duration:2000
      })
      setTimeout(function(){
        wx.redirectTo({
          url: '../result/result?A=' + that.data.A + '&B=' + that.data.B + '&C=' + that.data.C
        })
      },2000)
    }
  },

  // 选择B题目
  onAnswerBTap: function () {
    let that = this;
    if (that.data.listABC[1] == 'A') {
      that.setData({
        A: that.data.A + 1
      })
    }
    else if (that.data.listABC[1] == 'B') {
      that.setData({
        B: that.data.B + 1
      })
    }
    if (that.data.listABC[1] == 'C') {
      that.setData({
        C: that.data.C + 1
      })
    }
    that.setData({
      index: that.data.index + 1,
      realIndex: that.data.list[that.data.index]
    })
    console.log(that.data.list[that.data.index], "that.data.list[that.data.index]")
    that.setData({
      questionDetail: problem.question[that.data.realIndex].question,
      answerA: problem.question[that.data.realIndex].option[that.data.listABC[0]],
      answerB: problem.question[that.data.realIndex].option[that.data.listABC[1]],
      answerC: problem.question[that.data.realIndex].option[that.data.listABC[2]],
    })
    // 选择改变颜色
    that.setData({
      bgA: '',
      bgB: '#00FF00',
      bgC: ''
    })
    if (this.data.index == 10) {
      wx.showToast({
        title: '阅卷中。。。',
        icon: 'loading',
        duration: 2000
      })
      setTimeout(function () {
        wx.redirectTo({
          url: '../result/result?A=' + that.data.A + '&B=' + that.data.B + '&C=' + that.data.C
        })
      }, 2000)
    }
  },

  // 选择C题目
  onAnswerCTap: function () {
    let that = this;
    if (that.data.listABC[2] == 'A') {
      that.setData({
        A: that.data.A + 1
      })
    }
    else if (that.data.listABC[2] == 'B') {
      that.setData({
        B: that.data.B + 1
      })
    }
    if (that.data.listABC[2] == 'C') {
      that.setData({
        C: that.data.C + 1
      })
    }
    that.setData({
      index: that.data.index + 1,
      realIndex: that.data.list[that.data.index]
    })
    console.log(that.data.list[that.data.index], "that.data.list[that.data.index]")
    that.setData({
      questionDetail: problem.question[that.data.realIndex].question,
      answerA: problem.question[that.data.realIndex].option[that.data.listABC[0]],
      answerB: problem.question[that.data.realIndex].option[that.data.listABC[1]],
      answerC: problem.question[that.data.realIndex].option[that.data.listABC[2]],
    })
    // 选择改变颜色
    that.setData({
      bgA: '',
      bgB: '',
      bgC: '#00FF00'
    })
    if (this.data.index == 10) {
      wx.showToast({
        title: '阅卷中。。。',
        icon: 'loading',
        duration: 2000
      })
      setTimeout(function () {
        wx.redirectTo({
          url: '../result/result?A=' + that.data.A + '&B=' + that.data.B + '&C=' + that.data.C
        })
      }, 2000)
    }
  },
  // //////////////
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var userInfo = JSON.parse(options.userInfo);
    this.setData({
      userInfo: userInfo
    })
    this.setList();
    this.setABC();
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
    this.backgroundMusic();
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