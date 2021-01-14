// pages/teacher/teacher-hot/teacher-hot.js
Page({

  data: {
    schoolName:'西北工业大学',
    department:'计算机学院',
    teacherList:[],//该学院下导师的热度

  },

  onLoad: function (options) {
    let teacherList = [
      {
        'name':'王二狗',
        'hotNum':'2345',
      },
      {
        'name':'胃肠道',
        'hotNum':'2345',
      },
      {
        'name':'大课间',
        'hotNum':'5673',
      },
      {
        'name':'从呢电话',
        'hotNum':'1233',
      },
      {
        'name':'警察局',
        'hotNum':'1234',
      },
      {
        'name':'坚持你的',
        'hotNum':'32223',
      },
      {
        'name':'存的',
        'hotNum':'4323',
      },
      {
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

})