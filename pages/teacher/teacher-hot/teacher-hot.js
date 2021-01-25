// pages/teacher/teacher-hot/teacher-hot.js
const request = require("../../../utils/url");
const {rankApi } = require("../../../utils/api");
Page({

  data: {
    schoolName:'',
    department:'',
    teacherList:[],//该学院下导师的热度
    no_more:false,
    currentPage: 1,//当前页数
    totalNum: 0,
    totalPage: 1,
    schoolId:'',
    departmentId:'',
    postData:null

  },

  onLoad: function (options) {
    if(options.postData){
      let postData = JSON.parse(options.postData);
      this.setData({
        postData, 
        schoolId:postData.schoolId,
        departmentId:postData.departmentId,
        schoolName:postData.schoolName,
        department:postData.departmentName,
      })
      this.getTeacherList();
    }
  },

  onShow: function () {

  },
  async getTeacherList(){
    let data = {
      "schoolId":this.data.schoolId,
      "collageId":this.data.departmentId,
      "page":this.data.currentPage
    }
    const res = await request._get(rankApi.getTeacherList,data)
    console.log(res,'获得导师')
    let result  = res.result;
    if(result){
      this.setData({
        teacherList:result.teacherList
      })
    }
  },
  checkDetail(e){
    let id = e.currentTarget.dataset.id;
    let index = e.currentTarget.dataset.index;
    let nextId =  this.data.teacherList[index+1].id;
    let item = e.currentTarget.dataset.item;
    let preItem = null;
    if(index > 0){
       preItem = this.data.teacherList[index-1];
    }
    let nextItem = this.data.teacherList[index+1];
    console.log(id,nextId)
    let postData = JSON.stringify({
      preItem,
      item,
      nextItem,
      schoolName:this.data.schoolName,
      department:this.data.department,
    })
    if(id){
      wx.navigateTo({
        url: `/pages/teacher/teacher-detail/teacher-detail?postData=${postData}`,
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