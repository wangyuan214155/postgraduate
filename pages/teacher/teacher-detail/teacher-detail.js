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
    currentIndex:1,
    currentList:[],
    isSelfMess:false



  },

  onLoad: function (options) {
    console.log(options.postData)
    this.setData({
      userId: app.globalData.userId,
    })
    options.postData = '{"tempList":[{"id":"14","name":"郭燕青","sex":"男","praise":"1500","school_id":"86","school_name":"辽宁大学","collage_id":"5","collage_name":"商学院","level":"教授","type":"博导","majors":"管理科学与工程","field":"技术转移与区域经济、创新生态系统、汽车产业技术战略、知识管理与项目管理等。先后提出“后发优势悖论”、“创新三要素理论”及“创新生态链竞争说”等观点。","work_tel":null,"email":null,"address":null,"status":"1","created_at":"1611455597","updated_at":"1611455597"},{"id":"9","name":"刘艳春","sex":"未知","praise":"1125","school_id":"86","school_name":"辽宁大学","collage_id":"5","collage_name":"商学院","level":"教授","type":"博导","majors":"技术经济与管理","field":"风险管理、管理决策与复杂系统建模、评价理论方法与技术经济分析、金融计量与金融工程等。","work_tel":"024-62202136","email":"Liuyanchun6258@163.com","address":null,"status":"1","created_at":"1611455597","updated_at":"1611455597"},{"id":"12","name":"唐晓华","sex":"未知","praise":"1022","school_id":"86","school_name":"辽宁大学","collage_id":"5","collage_name":"商学院","level":"教授","type":"博导","majors":"产业经济学","field":"产业组织理论及应用、企业管理理论。具体研究方向为","work_tel":"024-62202136","email":"Xhtang818@yahoo.com.cn","address":null,"status":"1","created_at":"1611455597","updated_at":"1611455597"}],"schoolName":"辽宁大学","department":"商学院"}'
    if (options.postData) {
      let postData = JSON.parse(options.postData);
      this.setData({
        preItem: postData.preItem,
        item: postData.item,
        currentItem: postData.item,
        nextItem: postData.nextItem,
        currentList:postData.tempList,
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
      if(result.school_name == self.data.school && result.collage_name == self.data.department){
        self.setData({
          isSelfMess:true
        })
      }
      this.setData({
        // schoolId: result.school_id ? result.school_id : '',
        // schoolName: result.school_name ? result.school_name : '',
        // departmentId: result.collage_id ? result.collage_id : '',
        // departmentName: result.collage_name ? result.collage_name : '',
        score: result.score ? result.score : '',
      })

    }


  },
  async queryApply() {
    let self = this;
    let currentList = self.data.currentList;
    let currentIndex = self.data.currentIndex;
    let data = {
      data: {
        'userId': this.data.userId,
        'teacherId': currentList[currentIndex].id,
        'teacherName': currentList[currentIndex].name,
        'openId': app.globalData.openId,
        'score': this.data.score,
      }
    }
    const res = await request._post(rankApi.addBindTeacher, data);
    console.log(res, 111111)
    wx.showToast({
      title: "报考成功！！",
      icon: "none",
      duration: 2000,
    });
  },
  async checkTeacher() {
    let self = this;
    if(!self.data.isSelfMess){
      wx.showToast({
        title: "检测到该院系与您本人报考的信息不一致，请到个人中心修改哦！",
        icon: "none",
        duration: 2000,
      });
      return;
    }else{
      if(this.data.score == '' || this.data.score == 0){
        wx.showToast({
          title: "请返回填写自己真实的成绩哦！",
          icon: "none",
          duration: 2000,
        });
        return;
      }
    }
    let currentList = self.data.currentList;
    let currentIndex = self.data.currentIndex;
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
      if (result.teacher_id == currentList[currentIndex].id) {
        wx.showToast({
          title: "你已报考该导师！！",
          icon: "none",
          duration: 2000,
        });
        return;
      } else {
        wx.showModal({
          title: '提示',
          content: '确定要从' + result.teacher_name + '导师更换到' + currentList[currentIndex].name + '导师 ？',
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
    }else{
      self.queryApply();
    }
  },
  async addCall(){
    let self = this;
    let currentList = self.data.currentList;
    let currentIndex = self.data.currentIndex;
    if(this.data.addNum >=3){
      wx.showToast({
        title: "今日已打call3次了哦，请明天再来！！",
        icon: "none",
        duration: 2000,
      });
      return;
    }
    let data = {
      'userId':self.data.userId,
      // 'userId':1,
      'teacherId':currentList[currentIndex].id
    }
    const res = await request._get(rankApi.addCall,data);
    currentList[currentIndex].praise = Number(currentList[currentIndex].praise) +1
    console.log(res)
    
    this.setData({
      addNum:Number(self.data.addNum) +1,
      currentList,
    })

  },
  prePerson(){
    this.setData({
      currentIndex:this.data.currentIndex -1,
    })

  },
  nextPerson(){
    this.setData({
      currentIndex:this.data.currentIndex +1,
    })
    // 
  },
  makePhone(){
    if(this.data.currentItem.work_tel){
      wx.makePhoneCall({
        phoneNumber: this.data.currentList[currentIndex].work_tel
      })
    }
    
  },
  



})