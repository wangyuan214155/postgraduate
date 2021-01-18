// pages/personal/personal.js
const request = require("../../utils/url");
const { schoolApi } = require("../../utils/api");
Page({

  data: {
    isLogin: false,//是否已经登录
    avater: '',//微信头像地址
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
    isSave: true,//当前的状态是否是保存




  },

  onLoad: function (options) {
    this.getSchoolList();

  },

  onShow: function () {

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
  //通过授权获得用户手机号
  async getPhoneNumber(e) {
    const { encryptedData, iv } = e.detail;
    if (encryptedData && iv) {
      let data = {
        accessToken: wx.getStorageSync('accessToken') ? wx.getStorageSync('accessToken') : '',
        iv: iv,
        encryptedData: encryptedData
      }
      //此处要请求后台，获得用户手机号
      const res = await request._get(registerApi.getWeiPhone, data)
      if (res.msg == 'succcess') {
        let result = res.result;

        this.setData({
          phone: result.phone,
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
      }
      console.log(res, '手机号')
    }


  },
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
      isSave: true
    })

  },
  departmentFous() {
    this.setData({
      departmentStatus: true,
      isSave: true
    })
  },
  specialFous() {
    this.setData({
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


  }

})