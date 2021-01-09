// pages/rank/rank-list/rank-list.js
Page({
  data: {
    rankNum:10,//当前的排名
    rankList:[],//排名列表
    currentPage:1,
    totalPage:1,

  },

  onLoad: function (options) {
    let rankList = [
      {
        name:'王二狗',
        special:'软件工程',
        score:'140',
        rank:'1'
      },
      {
        name:'成都看',
        special:'土木工程',
        score:'140',
        rank:'2'
      },
      {
        name:'开放的空间',
        special:'工程管理',
        score:'140',
        rank:'3'
      },
      {
        name:'开车',
        special:'计算机科学与技术',
        score:'140',
        rank:'4'
      },
      {
        name:'每次都',
        special:'信息管路',
        score:'140',
        rank:'5'
      },
      {
        name:'超短裤',
        special:'物联网工程',
        score:'140',
        rank:'6'
      },
      {
        name:'OKi哦',
        special:'英语',
        score:'140',
        rank:'7'
      },
      {
        name:'韭菜鸡蛋',
        special:'应用数学',
        score:'140',
        rank:'8'
      },
      {
        name:'堪称经典',
        special:'化学',
        score:'140',
        rank:'9'
      },
      {
        name:'此得',
        special:'旅游',
        score:'140',
        rank:'10'
      },
      {
        name:'测得出',
        special:'带劲儿',
        score:'140',
        rank:'11'
      },
      {
        name:'的调查',
        special:'甲壳虫的家',
        score:'140',
        rank:'12'
      },
      {
        name:'测度开门大吉',
        special:'单家独户',
        score:'133',
        rank:'13'
      },
      {
        name:'阿大学文化',
        special:'汉语言文学',
        score:'123',
        rank:'14'
      },
    ]
    this.setData({
      rankList
    })

  },
  onShow: function () {

  },

  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

})