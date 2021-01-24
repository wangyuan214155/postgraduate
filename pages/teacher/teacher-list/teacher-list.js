const request = require("../../../utils/url");
const { schoolApi,personApi,loginApi,rankApi } = require("../../../utils/api");
var  app =  getApp();
Page({

  data: {
    teacherName: '',
    reportNum: 0,//报考人数
    rank: 0,
    applyStudentList: [],
    no_more:false,
    currentPage: 1,//当前页数
    totalNum: 0,
    totalPage: 1,

  },

  onLoad: function (options) {
    if(options.postData){
      let postData = JSON.parse(options.postData);
      this.setData({
        postData, 
        teacherName:postData.teacherName,
      })
    }
    // let applyStudentList = [
    //   {
    //     name: '多久呢',
    //     grad: 400,
    //     rank: 1
    //   },
    //   {
    //     name: '目测等你',
    //     grad: 355,
    //     rank: 2
    //   },
    //   {
    //     name: '烦得很',
    //     grad: 562,
    //     rank: 3
    //   },
    //   {
    //     name: '快吃饭没得呢',
    //     grad: 123,
    //     rank: 4
    //   }, 
    //   {
    //     name: '查看',
    //     grad: 400,
    //     rank: 5
    //   },
    //   {
    //     name: '每次看',
    //     grad: 344,
    //     rank: 6
    //   },
    //    {
    //     name: '名称',
    //     grad: 123,
    //     rank: 7
    //   },
    //   {
    //     name: '聪明的你',
    //     grad: 456,
    //     rank: 8
    //   },
    //    {
    //     name: '聪明的',
    //     grad: 345,
    //     rank: 9
    //   },
    //   {
    //     name: '附近的',
    //     grad: 123,
    //     rank: 10
    //   }, 
    //   {
    //     name: '的怀抱',
    //     grad: 553,
    //     rank: 11
    //   },
    //   {
    //     name: '分泌出',
    //     grad: 234,
    //     rank: 12
    //   },
    //    {
    //     name: '多久呢',
    //     grad: 123,
    //     rank: 13
    //   },
    //   {
    //     name: '客服没人接',
    //     grad: 345,
    //     rank: 14
    //   },
    //   {
    //     name: '没吃饭',
    //     grad: 122,
    //     rank: 15
    //   },
    //   {
    //     name: '奶茶店',
    //     grad: 455,
    //     rank: 16
    //   }, 
    //   {
    //     name: '看美剧',
    //     grad: 543,
    //     rank: 17
    //   },
    //   {
    //     name: '没参加',
    //     grad: 345,
    //     rank: 18
    //   }, 
    //   {
    //     name: '吃饭的',
    //     grad: 434,
    //     rank: 19
    //   },
    //   {
    //     name: '非常的暖和',
    //     grad: 400,
    //     rank: 20
    //   }, 
    //   {
    //     name: '吃的呢',
    //     grad: 400,
    //     rank: 21
    //   },
    //   {
    //     name: '吃得好',
    //     grad: 400,
    //     rank: 22
    //   }, 
    //   {
    //     name: '很单纯',
    //     grad: 400,
    //     rank: 23
    //   },
    //   {
    //     name: '的话',
    //     grad: 400,
    //     rank: 24
    //   },
    // ]
    // this.setData({
    //   applyStudentList,
    // })
    this.getStudentList();
  },

  onShow: function () {

  },
  async getStudentList(){
    let data = {
      'teacherId':this.data.postData.teacherId,
      'userId':this.data.postData.userId,
      'page':this.data.currentPage
    }
    const res = await request._get(rankApi.getTeaStudent,data)
    console.log(res,33333,'获得导师下的学生')
    let result = res.result; 
    if(result){
      this.setData({
        applyStudentList:result.studentList,
        rank:result.self.rank,
      })
    }

  },
  async queryApply(){
    let data = {
      data :{
        'userId':this.data.postData.userId,
        'teacherId':this.data.postData.teacherId,
        'teacherName':this.data.postData.teacherName,
        'openId':this.data.postData.openId,
        'score':this.data.postData.score,
      }
    }
    const res = await request._get(rankApi.addBindTeacher,data);
    console.log(res,111111)
    

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