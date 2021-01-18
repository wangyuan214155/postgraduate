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
    schoolList: [],
    departmentList: [],
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
        schoolList:res.result
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
    if (value) {


    }

  },
  departmentInput(e) {
    let value = e.detail.value;
    console.log(value, '学院')
    //此处要发请求
    if (value != this.data.schoolName) {
      this.setData({
        specialId: '',
        specialName: '',
      })
    }
    if (value) {

    }
  },
  specialInput(e) {
    let value = e.detail.value;
    console.log(value, '专业')
    //此处要发请求
    if (value) {

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