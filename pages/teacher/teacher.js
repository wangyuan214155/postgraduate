const request = require("../../utils/url");
const { schoolApi, personApi, loginApi, rankApi } = require("../../utils/api");
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeTab: 1,
    schoolStatus: false,
    departmentStatus: false,
    teacherStatus: false,
    schoolList: [],
    departmentList: [],
    teacherList: [],
    schoolId: '',
    oldSchoolId: '',
    schoolName: '',
    oldSchoolName: '',
    schoolError: false,
    departmentId: '',
    oldDepartmentId: '',
    departmentName: '',
    oldDepartmentName: '',
    departmentError: false,
    specialId: '',
    specialName: '',
    teacherName: '',
    teacherId: '',
    teacherError: false,
    score: '',//成绩
    scoreError: false,
    isLogin: false,
    userId: '',
    showScoreTip: true,
    isShowScore: false,
    hasCore: false,
    hideBoxStatus:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var self = this;
    this.setData({
      isLogin: app.globalData.isLogin,
      userId: app.globalData.userId,
      openId: app.globalData.openId
    })
    if (this.data.isLogin) {
      // this.getSchoolList();
      this.getPersonMess();
    } else {
      wx.login({
        success: res => {
          // console.log(res, '登录信息')
          let data = {
            'code': res.code
          }
          return request._get(loginApi.isLogin, data)
            .then(res => {
              // console.log(res, 33333)
              if (res.success) {
                let result = res.result;
                if (result.student_id) {
                  app.globalData.userId = result.student_id;
                  app.globalData.openId = result.openid;
                  app.globalData.isLogin = true;
                  self.setData({
                    isLogin: app.globalData.isLogin,
                    userId: app.globalData.userId,
                    openId: app.globalData.openId
                  })

                  self.getPersonMess();
                } else {
                  app.globalData.userId = '';
                  app.globalData.openId = result;
                  app.globalData.isLogin = false;
                  wx.showModal({
                    title: '提示',
                    content: '您还未登录，请先登录哦',
                    showCancel: false,
                    success(res) {
                      if (res.confirm) {
                        // console.log('用户点击确定')
                        wx.switchTab({
                          url: '/pages/personal/personal',
                        });
                      }
                    }
                  })
                }
              }
            })
            .catch(err => {
              console.log(err, 4444)

            })
        }
      })

    }
    this.setData({
      schoolStatus: false,
      departmentStatus: false,
      teacherStatus: false,
      isShowScore:false
    })
  },
  async getPersonMess() {
    let self = this;
    let data = {
      id: this.data.userId,
    }
    const res = await request._get(personApi.getUserInfo, data);
    // console.log(res, 1111)
    let result = res.result;
    if (result.openid) {
      this.setData({
        isLogin: true,
        schoolId: result.school_id ? result.school_id : '',
        oldSchoolId: result.school_id ? result.school_id : '',
        schoolName: result.school_name ? result.school_name : '',
        oldSchoolName: result.school_name ? result.school_name : '',
        departmentId: result.collage_id ? result.collage_id : '',
        oldDepartmentId: result.collage_id ? result.collage_id : '',
        departmentName: result.collage_name ? result.collage_name : '',
        oldDepartmentName: result.collage_name ? result.collage_name : '',
        specialId: result.special_id ? result.special_id : '',
        specialName: result.special_name ? result.special_name : '',
        score: result.score ? result.score : '',
        hasCore: result.score > 0 ? true : false

      })
      if(result.school_id != 0 && result.collage_id != 0 && result.special_id != 0){
        this.getSchoolList();
        this.getDepartmentList();
        this.setData({
          showScoreTip: true,
        })
      }else{
        this.getSchoolList();
      }
      if(result.school_id == 0 && result.collage_id == 0 && result.special_id == 0){
        this.setData({
          showScoreTip: false,
        })
        wx.showModal({
          title: '提示',
          content: '请填写报考信息',
          showCancel: false,
          success(res) {
            if (res.confirm) {
              wx.switchTab({
                url: '/pages/personal/personal',
              });
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    }


  },
  async getSchoolList() {
    const res = await request._get(schoolApi.getSchoolListTest)
    // console.log(res, '获得学校')
    if (res.result) {
      this.setData({
        schoolList: res.result,
        outShool: res.result
      })
    }
  },
  async getDepartmentList() {
    let data = {
      "schoolId": this.data.schoolId
    }
    const res = await request._get(schoolApi.getDepartmentList, data)
    // console.log(res, '获得学院')
    if (res.result) {
      this.setData({
        outDepartment: res.result,
        departmentList: res.result
      })
    }
  },
  async getTeacherList() {
    let data = {
      "schoolId": this.data.schoolId,
      "collageId": this.data.departmentId,
      "page": 1
    }
    const res = await request._get(rankApi.getTeacherList, data)
    // console.log(res, '获得导师')
    let result = res.result;
    if (result) {
      this.setData({
        teacherList: result.teacherList
      })
    }
  },
  switchTab(e) {
    let type = e.currentTarget.dataset.type;
    this.setData({
      activeTab: type
    })
    this.setData({
      schoolId: this.data.oldSchoolId,
      schoolName: this.data.oldSchoolName,
      departmentId: this.data.oldDepartmentId,
      departmentName: this.data.oldDepartmentName,
      schoolStatus: false,
      departmentStatus: false,
      teacherStatus: false,
    })

  },
  schoolInput(e) {
    let tempList = [];
    let value = e.detail.value;
    // console.log(value, '学校')
    //此处要发请求
    // if (value != this.data.schoolName) {
    //   this.setData({
    //     departmentId: '',
    //     departmentName: '',
    //     specialId: '',
    //     specialName: '',
    //   })
    // }
    if (value.trim()) {
      let reg = new RegExp(value.trim());
      this.data.schoolList.forEach((item, index) => {
        if (reg.test(item.school_name)) {
          tempList.push(item)
        }
      })
      this.setData({
        outShool: tempList
      })

    }
    if (value.trim() == '') {
      this.setData({
        outShool: this.data.schoolList
      })
    }

  },
  departmentInput(e) {
    let tempList = [];
    let value = e.detail.value;
    // console.log(value, '学院')
    //此处要发请求
    // if (value != this.data.departmentName) {
    //   this.setData({
    //     specialId: '',
    //     specialName: '',
    //   })
    // }
    if (value.trim()) {
      let reg = new RegExp(value.trim());
      this.data.departmentList.forEach((item, index) => {
        if (reg.test(item.collage_name)) {
          tempList.push(item)
        }
      })
      this.setData({
        outDepartment: tempList
      })

    }
    if (value.trim() == '') {
      this.setData({
        outDepartment: this.data.departmentList
      })
    }
  },
  teacherInput: request.debounce(function (e) {
    // console.log(e, '专业')

    let value = e[0].detail.value;
    // console.log(value, '专业')
    //此处要发请求
    let data = {
      "schoolId": this.data.schoolId,
      "collageId": this.data.departmentId,
      'search': value
    }
    request._get(rankApi.searchTeacher, data)
      .then(res => {
        // console.log(res, '导师')
        let result = res.result;
        this.setData({
          teacherList: result
        })
      })

  }, 200),


  schoolFous() {
    this.setData({
      schoolStatus: true,
      departmentStatus: false,
      specialStatus: false,
      teacherStatus: false,
      hideBoxStatus:true,
    })

  },
  departmentFous() {
    this.setData({
      departmentStatus: true,
      schoolStatus: false,
      specialStatus: false,
      teacherStatus: false,
      hideBoxStatus:true,
    })
  },
  teacherFous() {
    this.setData({
      teacherStatus: true,
      hideBoxStatus:true,

    })
    let data = {
      "schoolId": this.data.schoolId,
      "collageId": this.data.departmentId,
      'search': '',
    }
    request._get(rankApi.searchTeacher, data)
      .then(res => {
        // console.log(res, '导师')
        let result = res.result;
        this.setData({
          teacherList: result
        })
      })
  },

  scoreBlur(e) {
    let value = e.detail.value;
    // console.log(value, 333333)
    this.setData({
      score: value
    })

  },
  selectSchool(e) {
    let item = e.currentTarget.dataset.item;
    // console.log(item, 33)
    if (item) {
      if (item.school_name != this.data.schoolName) {
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
        hideBoxStatus:false,

      })
      this.checkTip();

      this.getDepartmentList();
    }

  },
  selectDepartment(e) {
    let item = e.currentTarget.dataset.item;
    // console.log(item, 33)
    if (item) {
      if (item.collage_name != this.data.departmentName) {
        this.setData({
          specialId: '',
          specialName: '',
        })
      }
      this.setData({
        departmentName: item.collage_name,
        departmentId: item.collage_id,
        departmentStatus: false,
        hideBoxStatus:false,

      })
      this.checkTip();
      // this.getTeacherList();
    }

  },
  selectTeacher(e) {
    let item = e.currentTarget.dataset.item;
    // console.log(item, 33)
    if (item) {
      this.setData({
        teacherName: item.name,
        teacherId: item.id,
        teacherStatus: false,
        hideBoxStatus:false,
      })
    }
  },
  validataInput() {
    let flag = true;
    let data = this.data;
    // console.log(data.schoolId, data.departmentId, data.teacherId, data.score, 33333)

    if (data.schoolId == '') {
      this.setData({
        schoolError: true
      })
      flag = false
    } else {
      this.setData({
        schoolError: false
      })
    }
    if (data.departmentId == '') {
      this.setData({
        departmentError: true,
      })
      flag = false

    } else {
      this.setData({
        departmentError: false,
      })
    }

    if (data.teacherId == '') {
      this.setData({
        teacherError: true,
      })
      flag = false

    } else {
      this.setData({
        teacherError: false,
      })
    }
    if (this.data.isShowScore) {
      if (data.score == '' || data.score == 0) {
        this.setData({
          scoreError: true,
        })
        flag = false

      } else {
        this.updatePersonMess();
        this.setData({
          scoreError: false,
        })
      }
    }
    return flag;

  },
  async updatePersonMess() {
    let data = {
      data: {
        'id': this.data.userId,
        'school_id': this.data.schoolId,
        'school_name': this.data.schoolName,
        'collage_id': this.data.departmentId,
        'collage_name': this.data.departmentName,
        'special_id': this.data.specialId,
        'special_name': this.data.specialName,
        'score': this.data.score
      }

    }

    const res = await request._post(personApi.updateUserInfo, data);
    let result = res.result;
    if (result) {

    }
  },
  validataInputCopy() {
    let flag = true;
    let data = this.data;
    // console.log(data.schoolId, data.departmentId, data.teacherId, data.score, 33333)

    if (data.schoolId == '') {
      this.setData({
        schoolError: true
      })
      flag = false
    } else {
      this.setData({
        schoolError: false
      })
    }
    if (data.departmentId == '') {
      this.setData({
        departmentError: true,
      })
      flag = false

    } else {
      this.setData({
        departmentError: false,
      })
    }
    return flag;
  },
  //查看导师列表
  lookTeacherList() {
    if (this.validataInput()) {
      let postData = JSON.stringify({
        'teacherId': this.data.teacherId,
        'userId': this.data.userId,
        'teacherName': this.data.teacherName,
        'score': this.data.score,
        'openId': this.data.openId,
        'isSelfMess':this.data.showScoreTip
      })
      wx.navigateTo({
        url: `/pages/teacher/teacher-list/teacher-list?postData=${postData}`,
      });
    }

  },
  //查看导师热度
  lookTeacherHot() {
    if (this.validataInputCopy()) {
      let postData = JSON.stringify({
        'schoolId': this.data.schoolId,
        'schoolName': this.data.schoolName,
        'departmentId': this.data.departmentId,
        'departmentName': this.data.departmentName,
        'userId': this.data.userId,
        'openId': this.data.openId,
      })
      wx.navigateTo({
        url: `/pages/teacher/teacher-hot/teacher-hot?postData=${postData}`,
      });
    }
  },
  switchChange(e) {
    // console.log(e, 34455)
    let flag = e.detail.value;
    this.setData({
      isShowScore: flag
    })

  },
  checkTip() {
    let data = this.data;
    if (data.schoolName == data.oldSchoolName && data.departmentName == data.oldDepartmentName) {
      this.setData({
        showScoreTip: true,
      })
    } else {
      this.setData({
        showScoreTip: false,
      })
    }
  },
  hideStatus(){
    // console.log('点击其他地方')
    this.setData({
      hideBoxStatus:false,
      schoolStatus: false,
      departmentStatus: false,
      teacherStatus: false,
      schoolId: this.data.schoolId,
      schoolName: this.data.schoolName,
      departmentId: this.data.departmentId,
      departmentName: this.data.departmentName,
      specialId: this.data.specialId,
      specialName: this.data.specialName,
    })
  },
  gotoPage(){
    wx.navigateTo({
      url:'/pages/web-outline/web-inline'
    })
  },
  onShareAppMessage: function () {},


})