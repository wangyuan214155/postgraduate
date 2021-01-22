// pages/personal/personal.js
const request = require("../../utils/url");
const { schoolApi,personApi } = require("../../utils/api");
var  app =  getApp();

Page({

  data: {
    isLogin: false,//是否已经登录
    avater: '',//微信头像地址
    nickName:'',//昵称
    schoolStatus: false,
    departmentStatus: false,
    specialStatus: false,
    outShool:[],
    schoolList: [],
    outDepartment:[],
    departmentList: [],
    outSpecial:[],
    specialList: [],
    schoolId: '',
    schoolName: '',
    schoolError: false,
    departmentId: '',
    departmentName: '',
    departmentError: false,
    specialId: '',
    specialName: '',
    specialError: false,
    isSave: false,//当前的状态是否是保存
    userId:'',
  },

  onLoad: function (options) {
   
    this.getSchoolList();
    this.getPersonMess();
  },

  onShow: function () {
    console.log(app.globalData.userInfo,'全局变量')
    if(app.globalData.userInfo){
      this.setData({
        isLogin:false,
        avater: app.globalData.userInfo.avatarUrl,//微信头像地址
        nickName:app.globalData.userInfo.nickName,//昵称
      })
    }
  },
  async getPersonMess(){
    let data = {
      id:'1ihvue9mchjjen'
    }
    const res = await request._get(personApi.getUserInfo,data);
    console.log(res,1111)
    let  result = res.result;
    if(result.openid){

      this.setData({
        isLogin:true,
        nickName:result.nickname,
        avater:result.avatar_url,
        schoolId: result.school_id ? result.school_id : '',
        schoolName: result.school_name ? result.school_name :'',
        departmentId: result.collage_id ? result.collage_id : '',
        departmentName: result.collage_name ?result.collage_name :'',
        specialId: result.special_id ? result.special_id : '',
        specialName:result.special_name ? result.special_name : '',
      })

    }


  },
  async getSchoolList(){
    const res = await request._get(schoolApi.getSchoolListTest)
    console.log(res,'获得学校')
    if(res.result){
      this.setData({
        schoolList:res.result,
        outShool:res.result
      })
    }
  },
  async getDepartmentList(){
    let data = {
      "schoolId":this.data.schoolId
    }
    const res = await request._get(schoolApi.getDepartmentList,data)
    console.log(res,'获得学院')
    if(res.result){
      this.setData({
        outDepartment:res.result,
        departmentList:res.result
      })
    }
  },
  async getSpecialList(){
    let data = {
      "schoolId":this.data.schoolId,
      "collageId":this.data.departmentId
    }
    const res = await request._get(schoolApi.getSpecialList,data)
    console.log(res,'获得专业')
    if(res.result){
      this.setData({
        outSpecial:res.result,
        specialList:res.result
      })
    }
  },
  gotoUserInfo(){
    var self = this;
    wx.getUserInfo({
      success: function (res) {
        console.log(res,44444)
        console.log("encryptedData",res.encryptedData)
        console.log("iv",res.iv)
        console.log("signature",res.signature)
        console.log("rawData",res.rawData)
        const userInfo = JSON.parse(res.rawData);
        console.log(userInfo,5555)
        app.globalData.userInfo = userInfo;
        self.setData({
          isLogin:true,
          avater: userInfo.avatarUrl,//微信头像地址
          nickName:userInfo.nickName,//昵称
        })
        wx.showModal({
          title: '提示',
          content: '请填写报考信息',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              console.log('用户点击确定')
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
        // self.saveMess();
      },
      fail(){
      }
    })
  },
  // async saveMess(){


  // },
 
  schoolInput(e) {
    let tempList = [];
    let value = e.detail.value;
    console.log(value, '学校')
    //此处要发请求
    if (value != this.data.schoolName) {
      this.setData({
        departmentId: '',
        departmentName: '',
        specialId: '',
        specialName: '',
      })
    }
    if (value.trim()) {
      let reg = new RegExp(value.trim());
      this.data.schoolList.forEach((item,index)=>{
        if(reg.test(item.school_name)){
          tempList.push(item)
        }
      })
     this.setData({
      outShool:tempList
     })

    }
    if(value.trim() == ''){
      this.setData({
        outShool:this.data.schoolList
       })
    }

  },
  departmentInput(e) {
    let tempList = [];
    let value = e.detail.value;
    console.log(value, '学院')
    //此处要发请求
    if (value != this.data.departmentName) {
      this.setData({
        specialId: '',
        specialName: '',
      })
    }
    if (value.trim()) {
      let reg = new RegExp(value.trim());
      this.data.departmentList.forEach((item,index)=>{
        if(reg.test(item.collage_name)){
          tempList.push(item)
        }
      })
     this.setData({
      outDepartment:tempList
     })

    }
    if(value.trim() == ''){
      this.setData({
        outDepartment:this.data.departmentList
       })
    }
  },
  specialInput(e) {
    let tempList = [];
    let value = e.detail.value;
    console.log(value, '专业')
    //此处要发请求
    if (value.trim()) {
      let reg = new RegExp(value.trim());
      this.data.specialList.forEach((item,index)=>{
        if(reg.test(item.speciality_name)){
          tempList.push(item)
        }
      })
     this.setData({
      outSpecial:tempList
     })

    }
    if(value.trim() == ''){
      this.setData({
        outSpecial:this.data.specialList
       })
    }
  },
  schoolFous() {
    this.setData({
      schoolStatus: true,
      departmentStatus:false,
      specialStatus:false,
      isSave: true
    })

  },
  departmentFous() {
    this.setData({
      departmentStatus:true,
      schoolStatus:false,
      specialStatus:false,
    })
  },
  specialFous() {
    this.setData({
      departmentStatus:false,
      schoolStatus:false,
      specialStatus: true,
      isSave: true
    })
  },
  selectSchool(e) {
    let item = e.currentTarget.dataset.item;
    console.log(item, 33)
    if (item) {
      if(item.school_name != this.data.school_name){
        this.setData({
          departmentId: '',
          departmentName: '',
          specialId: '',
          specialName: '',
        })
      }
      this.setData({
        schoolName: item.school_name,
        schoolId: item.id,
        schoolStatus: false,
      })
      this.getDepartmentList();
    }

  },
  selectDepartment(e) {
    let item = e.currentTarget.dataset.item;
    console.log(item, 33)
    if (item) {
      if(item.collage_name != this.data.departmentName){
        this.setData({
          specialId: '',
          specialName: '',
        })
      }
      this.setData({
        departmentName: item.collage_name,
        departmentId: item.collage_id,
        departmentStatus: false,
      })
      this.getSpecialList();
    }

  },
  selectSpecial(e) {
    let item = e.currentTarget.dataset.item;
    console.log(item, 33)
    if (item) {
      this.setData({
        specialName: item.speciality_name,
        specialId: item.speciality_id,
        specialStatus: false,
      })
    }
  },
  saveMess() {
    
    let self = this;
    let data = this.data;
    if(!this.data.isLogin){
      wx.showToast({
        title: "请先登录哦",
        icon: "none",
        duration: 2000,
      });
      return;
    }
    if (data.schoolName == '') {
      this.setData({
        schoolError: true
      })
      return;
    } else {
      this.setData({
        schoolError: false
      })
    }

    if (data.departmentName == '') {
      this.setData({
        departmentError: true
      })
      return;
    } else {
      this.setData({
        departmentError: false
      })
    }
    if (data.specialName == '') {
      this.setData({
        specialError: true,
      })
      return;
    } else {
      this.setData({
        specialError: false,
      })
    }
    // 此处要发起请求
    console.log(2222)
    this.setData({
      isSave: false,
    })
  },
  async updatePersonMess(){
    let data = {
      'id':this.data.userId,
      'school_id':this.data.schoolId,
      'school_name':this.data.schoolName,
      'collage_id':this.data.departmentId,
      'collage_name':this.data.departmentName,
      'special_id':this.data.specialId,
      'special_name':this.data.specialName,
    } 
    const res = await request._post(personApi.updateUserInfo,data);
    let rsult = res.result;
    if(rsult){

    }
  }

})