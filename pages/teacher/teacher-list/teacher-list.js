const request = require("../../../utils/url");
const {rankApi } = require("../../../utils/api");
import Poster from '../../../utils/palette/poster.js';

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
    },
    isSelfMess:false,//查询的学校和学院是否和报考的一致
    shareStatus:false,
    teacherTemplete:{},//生成图片所需要的参数
    saveImgScope: true,// 用户是否授权保存图片至相册的权限
    showPosterWrap: false, // 海报弹窗
    showBg: false,


  },

  onLoad: function (options) {
    console.log(options)
    if(options.postData){
      let postData = JSON.parse(options.postData);
      this.setData({
        postData, 
        teacherName:postData.teacherName,
        teacherId:postData.teacherId,
        isSelfMess:postData.isSelfMess

      })
    }
    this.getStudentList();
  },

  onShow: function () {
    this.setData({
      showBg: false,
    })
    this.openSettingFn();

  },
  closeTip() {
    this.setData({ showBg: false })
  },
  openSelectBox(){
    this.setData({
      shareStatus:true
    })

  },
  cancel(){
    this.setData({
      shareStatus:false
    })
  },
  getPosterParams() {
    return new Promise((resolve, reject) => {
      let posterParams = { // 生成海报所需要的参数
        teacherName: this.data.teacherName,
        reportNum: this.data.reportNum,//报考人数
        rank: this.data.rank,
        applyStudentList: this.data.applyStudentList,
       
      }
      resolve(posterParams);
    })
  },
  closeModel(){
    this.setData({ showPosterWrap: !this.data.showPosterWrap });

  },
  saveImg(){
      this.setData({ showPosterWrap: !this.data.showPosterWrap });
      wx.showToast({
        title: '图片生成中...',
        icon: 'loading',
        duration: 1000,
        mask: true
      })
      if (this.data.showPosterWrap && !this.data.posterImgPath){
        this.getPosterParams().then((posterParams) => {
          this.setData({
            teacherTemplete: new Poster().palette(posterParams)
          })
        })
      }
  },
  openSettingModel() {
    this.setData({ 
      showBg: true,
      showPosterWrap: false,
    });
  },
  onImgOK(e) {// 海报生成成功
    // util.hideToast();
    console.log(e,'图片生成中')
    this.setData({
      posterImgPath: e.detail.path
    })
  },
  openSettingFn() {
    wx.getSetting({
      success: (res) => {
        if (typeof res.authSetting['scope.writePhotosAlbum'] == 'boolean' && !res.authSetting['scope.writePhotosAlbum']) { // 用户未授权拍照
          this.setData({ saveImgScope: false })
        } else if (typeof res.authSetting['scope.writePhotosAlbum'] == 'boolean' && res.authSetting['scope.writePhotosAlbum']) {
          this.setData({ saveImgScope: true })
        }
      },
      fail: (err) => {
        console.log('openSettingFn',err);
      }
    })
  },
  savePoster() {
    this.openSettingFn();
    wx.saveImageToPhotosAlbum({
      filePath: this.data.posterImgPath,
      success: (res) => {
        console.log(1111, res);
        if (app.globalData.system != 'android'){
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 3000,
            mask: true
          })
        }
        this.setData({ showPosterWrap: false , shareStatus:false});
      }, 
      fail: (err) => {
        // 用户拒绝授权保存到相册 将按钮改为 button
        this.setData({ saveImgScope: false })
      }
    });
  },
  async getStudentList(){
    let data = {
      'teacherId':this.data.postData.teacherId,
      'userId':this.data.postData.userId,
      'page':this.data.currentPage
    }
    const res = await request._get(rankApi.getTeaStudent,data)
    // console.log(res,33333,'获得导师下的学生')
    let result = res.result; 
    if(result){
      if(result.studentList.length >0){
        result.studentList.forEach((item,index) => {
          // item.openid = "***";
          item.openid = "***"+ item.openid.substring(item.openid.length - 4);
        });

      }
      this.setData({
        applyStudentList:this.data.applyStudentList.concat(result.studentList),
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
      wx.showToast({
        title: "报考成功！！",
        icon: "none",
        duration: 2000,
      });
      this.setData({
        applyStudentList:[],
        currentPage:1,
      })
      this.getStudentList();
    }
  },
 
  async checkTeacher(){
    let self = this;
    if(!self.data.isSelfMess){
      wx.showToast({
        title: "检测到该院系与您本人报考的信息不一致，请到个人中心修改哦！",
        icon: "none",
        duration: 2000,
      });
      return;
    }else{
      if(this.data.postData.score == '' || this.data.postData.score == 0){
        wx.showToast({
          title: "请返回填写自己真实的成绩哦！",
          icon: "none",
          duration: 2000,
        });
        return;
      }
    }
    let data = {
      'userId':this.data.postData.userId
      // 'userId':35,

      
    }
    const res = await request._get(rankApi.getBindTeacher,data);
    console.log(res,'获得已经绑定的导师')
    let result = res.result;
    if(result){
      console.log(111)
      this.setData({
        'selected.teacher':result.teacher_name,
        'selected.id':result.teacher_id,
      })
      if(result.teacher_id == self.data.teacherId){
        wx.showToast({
          title: "你已报考该导师！！",
          icon: "none",
          duration: 2000,
        });
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
    }else{
      console.log(222)

      self.queryApply();
    }
  },
  onReachBottom: function () {
    // console.log('是否到达底部', this.data.currentPage, this.data.totalPage)
    let newPage = this.data.currentPage + 1;
    if (newPage <= this.data.totalPage) {
      this.setData({
        currentPage: newPage
      })
      this.getStudentList();
    } else {
      newPage = this.data.totalPage;
      this.setData({
        currentPage: newPage,
        no_more: true
      })
    }
  },
  onShareAppMessage: function () {},


})