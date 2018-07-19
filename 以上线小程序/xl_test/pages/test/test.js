// pages/test/test.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayMusic: true,
    userInfo: {},
    index: 0,
    realIndex: 0,
    A: 0,
    B: 0,
    C: 0,
    a: 0,
    b: 0,
    c: 0,
    optionA: "A",
    optionB: "B",
    optionC: "C",
    questionDetail: app.globalData.question[0].question,
    answerA: app.globalData.question[0].option.A,
    answerB: app.globalData.question[0].option.B,
    answerC: app.globalData.question[0].option.C,
    list: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
    listABC: ['A', 'B', 'C'],
    kfhidden: '分享好友'
  },
  // 暂停音乐
  onPauseMusic: function() {
    wx.pauseBackgroundAudio();
    this.setData({
      isPlayMusic: !this.data.isPlayMusic
    })

  },
  // 重新播放音乐
  onStartMusic: function() {
    wx.playBackgroundAudio({
      dataUrl: 'http://imoeu.com.img.800cdn.com/html/wechat/images/yunshi/music.mp3',
      title: ''
    })
    this.setData({
      isPlayMusic: !this.data.isPlayMusic
    })
  },
  // 获取返回的一个随机数
  randSort: function() {
    return Math.random() > 0.5 ? 1 : -1;
  },

  // 设置列表
  setList: function() {
    var newList = this.data.list.sort(this.randSort);
    console.log(newList, "999");
    this.setData({
      list: newList
    })
  },

  // ABC题目
  setABC: function() {
    var abc = this.data.listABC.sort(this.randSort);
    this.setData({
      listABC: abc
    })
  },

  // 选择A题目
  onAnswerClickA: function() {
    var that = this;
    if (that.data.listABC[0] == 'A') {
      that.setData({
        A: that.data.A + 1
      })
    } else if (that.data.listABC[0] == 'B') {
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
      questionDetail: app.globalData.question[that.data.realIndex].question,
      answerA: app.globalData.question[that.data.realIndex].option[that.data.listABC[0]],
      answerB: app.globalData.question[that.data.realIndex].option[that.data.listABC[1]],
      answerC: app.globalData.question[that.data.realIndex].option[that.data.listABC[2]],
    })

    if (this.data.index == 12) {
      wx.redirectTo({
        url: '../result/result?A=' + that.data.A + '&B=' + that.data.B + '&C=' + that.data.C
      })
      console.log('../result/result?A=' + that.data.A + '&B=' + that.data.B + '&C=' + that.data.C, "444");
    }
    console.log(app.globalData.question[that.data.realIndex].question, "000")
  },

  // 选择B题目
  onAnswerClickB: function() {
    var that = this;
    if (that.data.listABC[1] == 'A') {
      that.setData({
        A: that.data.A + 1
      })
    } else if (that.data.listABC[1] == 'B') {
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
      questionDetail: app.globalData.question[that.data.realIndex].question,
      answerA: app.globalData.question[that.data.realIndex].option[that.data.listABC[0]],
      answerB: app.globalData.question[that.data.realIndex].option[that.data.listABC[1]],
      answerC: app.globalData.question[that.data.realIndex].option[that.data.listABC[2]],
    })

    if (that.data.index == 12) {
      console.log(that.data.index, "9999");
      wx.redirectTo({
        url: '../result/result?C=' + that.data.C + '&B=' + that.data.B + '&A=' + that.data.A
      })
    }
    console.log(app.globalData.question[that.data.realIndex].question, "000")
  },

  // 选择C题目
  onAnswerClickC: function() {
    var that = this;
    if (that.data.listABC[2] == 'A') {
      that.setData({
        A: that.data.A + 1
      })
    } else if (that.data.listABC[2] == 'B') {
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
      questionDetail: app.globalData.question[that.data.realIndex].question,
      answerA: app.globalData.question[that.data.realIndex].option[that.data.listABC[0]],
      answerB: app.globalData.question[that.data.realIndex].option[that.data.listABC[1]],
      answerC: app.globalData.question[that.data.realIndex].option[that.data.listABC[2]],
    })

    if (that.data.index == 12) {
      wx.redirectTo({
        url: '../result/result?C=' + that.data.C + '&B=' + that.data.B + '&A=' + that.data.A
      })
      // console.log('../result/result?C=' + that.data.C,"CCCC");
    }
    console.log(app.globalData.question[that.data.realIndex].question, "000")
  },
  // 监听音乐播放停止
  setMusicMonitor: function() {
    var that = this;
    wx.onBackgroundAudioStop(function() {
      that.setData({
        isPlayMusic: false
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // console.log(options.userInfo)
    var userInfo = JSON.parse(options.userInfo);
    // console.log(userInfo, "999");
    this.setData({
      userInfo: userInfo
    })

    this.setList();
    this.setABC();
    this.setMusicMonitor();
    this.controlTap();
  },

  /**
   * 控制开关
   */
  controlTap: function() {
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
      success: function(res) {
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
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // 定时播放音乐
    setTimeout(function() {
      wx.playBackgroundAudio({
        dataUrl: 'http://imoeu.com.img.800cdn.com/html/wechat/images/yunshi/music.mp3',
        title: ''
      })
    })

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    wx.stopBackgroundAudio();
    this.setMusicMonitor();
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})