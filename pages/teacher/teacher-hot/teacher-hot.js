// pages/teacher/teacher-hot/teacher-hot.js
Page({

  data: {
    schoolName:'西北工业大学',
    department:'计算机学院',
    teacherList:[],//该学院下导师的热度
    no_more:false,
    currentPage: 1,//当前页数
    totalNum: 0,
    totalPage: 1,

  },

  onLoad: function (options) {
    let teacherList = [
      {
        'id':1,
        'name':'王二狗',
        'hotNum':'2345',
      },
      {
        'id':2,
        'name':'胃肠道',
        'hotNum':'2345',
      },
      {
        'id':3,
        'name':'大课间',
        'hotNum':'5673',
      },
      {
        'id':4,
        'name':'从呢电话',
        'hotNum':'1233',
      },
      {
        'id':5,
        'name':'警察局',
        'hotNum':'1234',
      },
      {
        'id':6,
        'name':'坚持你的',
        'hotNum':'32223',
      },
      {
        'id':7,
        'name':'存的',
        'hotNum':'4323',
      },
      {
        'id':8,
        'name':'吃得好',
        'hotNum':'4343',
      },
      {
        'id':9,
        'name':'王二狗',
        'hotNum':'2345',
      },
      {
        'id':10,
        'name':'胃肠道',
        'hotNum':'2345',
      },
      {
        'id':11,
        'name':'大课间',
        'hotNum':'5673',
      },
      {
        'id':12,
        'name':'从呢电话',
        'hotNum':'1233',
      },
      {
        'id':13,
        'name':'警察局',
        'hotNum':'1234',
      },
      {
        'id':14,
        'name':'坚持你的',
        'hotNum':'32223',
      },
      {
        'id':15,
        'name':'存的',
        'hotNum':'4323',
      },
      {
        'id':16,
        'name':'吃得好',
        'hotNum':'4343',
      }
    ]
    this.setData({
      teacherList
    })
  },

  onShow: function () {

  },
  checkDetail(e){
    let id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    let nextId =  this.data.teacherList[index+1].id;
    console.log(id,nextId)
    if(id){
      wx.navigateTo({
        url: `/pages/teacher/teacher-detail/teacher-detail?id=${id}&nextId=${nextId}`,
      })
        
    }
  },
  onReachBottom: function () {
    console.log('是否到达底部', this.data.currentPage, this.data.totalPage)
    let newPage = this.data.currentPage + 1;
    if (newPage <= this.data.totalPage) {
      this.setData({
        currentPage: newPage
      })
      this.getResultList();
    } else {
      newPage = this.data.totalPage;
      this.setData({
        currentPage: newPage,
        no_more: true
      })
    }
  }

})