const request = require("../../../utils/url");
const { schoolApi,personApi,loginApi,rankApi } = require("../../../utils/api");
var  app =  getApp();
Page({

  data: {
    teacherName: '',
    teacherId:'',
    reportNum: 0,//报考人数
    rank: 0,
    applyStudentList: [],
    no_more:false,
    currentPage: 1,//当前页数
    totalNum: 0,
    totalPage: 1,
    selected:{
      teacher:'',
      id:''
    }

  },

  onLoad: function (options) {
    if(options.postData){
      let postData = JSON.parse(options.postData);
      this.setData({
        postData, 
        teacherName:postData.teacherName,
        teacherId:postData.teacherId,

      })
    }
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
        reportNum:result.pagination.total_count,
        rank:result.self.rank,
        totalPage:result.pagination.page_count,
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
    const res = await request._post(rankApi.addBindTeacher,data);
    if(res.success){
      this.getStudentList();
    }

    console.log(res,111111)
    

  },
  async checkTeacher(){
    let self = this;
    let data = {
      'userId':this.data.postData.userId
    }
    const res = await request._get(rankApi.getBindTeacher,data);
    console.log(res,'获得已经绑定的导师')
    let result = res.result;
    if(result){
      this.setData({
        'selected.teacher':result.teacher_name,
        'selected.id':result.teacher_id,
      })
      if(result.teacher_id == self.data.teacherId){
        return;
      }else{
        wx.showModal({
          title: '提示',
          content: '确定要从'+result.teacher_name+'导师更换到'+self.data.teacherName+'导师 ？',
          showCancel: true,
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
              self.queryApply();
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
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