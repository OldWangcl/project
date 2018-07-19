const contentList = [
  {
imgs:"http://imoeu.com.img.800cdn.com/html/wechat/images/yunshi/hot.png",
    id: 1,
    txt1: '热点急先锋',
    txt2: '用户可以在小程序中看到各种分类的文章并阅读文章',
    appid:'wx1156b60f7bba1f91',
    path:'pages/main/main/index'
  },
  {
    imgs: "http://imoeu.com.img.800cdn.com/html/wechat/images/yunshi/baby.png",
    txt1: 'BabyName',//燕飞来
    id: 1,
    txt2: '用户可以在小程序中看到各种分类的文章并阅读文章',
    appid: 'wx7284702abaa0ebd3',
    path: 'pages/baby/baby'
  },
  {
    imgs: "http://imoeu.com.img.800cdn.com/html/wechat/images/yunshi/xingge.png",
    txt1: '性格大揭秘', // 燕飞来
    txt2: '快来测测看你是什么性格吧~',
    id: 2,
    appid: 'wx420114dccb0bdebc',
    path: 'pages/index/index'
  },
  {
    imgs: "http://imoeu.com.img.800cdn.com/html/wechat/images/yunshi/jizhang.png",
    txt1: '悄悄告诉你', //三尾狐
    txt2: '你有什么话想悄悄对ta说嘛~',
    appid: 'wxe2b9a6c3f7150e24',
    path: 'pages/main/index'
  }
]

const happyUrls = [
  {
    imgs: 'http://imoeu.com.img.800cdn.com/html/wechat/images/yunshi/hot.png',
    id: 1,
    txt1: '热点急先锋',
    txt2: '用户可以在小程序中看到各种分类的文章并阅读文章',
    appid: 'wx1156b60f7bba1f91',
    path: 'pages/main/main/index'
  },
  {
    imgs: 'http://imoeu.com.img.800cdn.com/html/wechat/images/yunshi/baby.png',
    txt1: 'BabyName',
    id: 1,
    txt2: '用户可以在小程序中看到各种分类的文章并阅读文章',
    appid: 'wx7284702abaa0ebd3',
    path: 'pages/baby/baby'
  }
]

const relaxUrls = [
  {
    imgs: 'http://imoeu.com.img.800cdn.com/html/wechat/images/yunshi/xingge.png',
    txt1: '性格大揭秘',
    txt2: '快来测测看你是什么样的性格吧',
    appid: 'wx420114dccb0bdebc',
    path: 'pages/index/index'
  }
]
const toolUrls = [
  {
    imgs: 'http://imoeu.com.img.800cdn.com/html/wechat/images/yunshi/jizhang.png',
    txt1: '悄悄告诉你',
    txt2: '你有什么悄悄话想对ta说嘛~',
    appid: 'wxe2b9a6c3f7150e24',
    path: 'pages/main/index'
  }
]
module.exports = {
  contentList: contentList,
  happyUrls: happyUrls,
  relaxUrls: relaxUrls,
  toolUrls: toolUrls
}