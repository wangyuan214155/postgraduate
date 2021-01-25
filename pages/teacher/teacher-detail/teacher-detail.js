// pages/teacher/teacher_detail/teacher-detail.js
const request = require("../../../utils/url");
const { schoolApi, personApi, loginApi, rankApi } = require("../../../utils/api");
const app = getApp();

Page({

  data: {
    school: '',
    department: '',
    preItem: null,
    item: null,
    nextItem: null,
    currentItem: null,
    userId: '',
    score: '',
    selected: {
      teacher: '',
      id: ''
    },
    addNum:0,

  },

  onLoad: function (options) {
    console.log(options.postData)
    this.setData({
      userId: app.globalData.userId,
    })
    // options.postData = '{"preItem":null,"item":{"id":"9","name":"刘艳春","sex":"未知","praise":"1122","school_id":"86","school_name":"辽宁大学","collage_id":"5","collage_name":"商学院","level":"教授","type":"博导","majors":"技术经济与管理","field":"风险管理、管理决策与复杂系统建模、评价理论方法与技术经济分析、金融计量与金融工程等。","work_tel":"024-62202136","email":"Liuyanchun6258@163.com","address":null,"status":"1","created_at":"1611455597","updated_at":"1611455597"},"nextItem":{"id":"12","name":"唐晓华","sex":"未知","praise":"1022","school_id":"86","school_name":"辽宁大学","collage_id":"5","collage_name":"商学院","level":"教授","type":"博导","majors":"产业经济学","field":"产业组织理论及应用、企业管理理论。具体研究方向为","work_tel":"024-62202136","email":"Xhtang818@yahoo.com.cn","address":null,"status":"1","created_at":"1611455597","updated_at":"1611455597"},"schoolName":"辽宁大学","department":"商学院","userId":1}'
    if (options.postData) {
      let postData = JSON.parse(options.postData);
      this.setData({
        preItem: postData.preItem,
        item: postData.item,
        currentItem: postData.item,
        nextItem: postData.nextItem,
        department: postData.department,
        school: postData.schoolName

      })
    }
    this.getPersonMess();
  },


  onReady: function () {
   
  },

  onShow: function () {

  },
  async getPersonMess() {
    let self = this;
    let data = {
      id: self.data.userId,
    }
    const res = await request._get(personApi.getUserInfo, data);
    console.log(res, 1111)
    let result = res.result;
    if (result.openid) {
      this.setData({
        score: result.score ? result.score : '',
      })

    }


  },
  async queryApply() {
    let data = {
      data: {
        'userId': this.data.userId,
        'teacherId': this.data.currentItem.id,
        'teacherName': this.data.currentItem.name,
        'openId': app.globalData.openId,
        'score': this.data.score,
      }
    }
    const res = await request._post(rankApi.addBindTeacher, data);
    console.log(res, 111111)


  },
  async checkTeacher() {
    let self = this;
    let data = {
      'userId': app.globalData.userId

    }
    const res = await request._get(rankApi.getBindTeacher, data);
    console.log(res, '获得已经绑定的导师')
    let result = res.result;
    if (result) {
      this.setData({
        'selected.teacher': result.teacher_name,
        'selected.id': result.teacher_id,
      })
      if (result.teacher_id == self.data.currentItem.id) {
        wx.showToast({
          title: "你已报考该导师！！",
          icon: "none",
          duration: 2000,
        });
        return;
      } else {
        wx.showModal({
          title: '提示',
          content: '确定要从' + result.teacher_name + '导师更换到' + self.data.currentItem.name + '导师 ？',
          showCancel: true,
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
              self.queryApply();
            }else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    }
  },
  async addCall(){
    if(this.data.addNum >=3){
      wx.showToast({
        title: "今日已打call3次了哦，请明天再来！！",
        icon: "none",
        duration: 2000,
      });
      return;
    }
    let data = {
      'userId':this.data.userId,
      // 'userId':1,
      'teacherId':this.data.currentItem.id
    }
    const res = request._get(rankApi.addCall,data);
    
    console.log(res)
    
    this.setData({
      addNum:Number(this.data.addNum) +1,
      'currentItem.praise':Number(this.data.currentItem.praise) +1,
    })

  },
  prePerson(){
    this.setData({
      currentItem:this.data.preItem,
    })

  },
  nextPerson(){
    this.setData({
      currentItem:this.data.nextItem,
    })
  }



})