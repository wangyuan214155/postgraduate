const request = require("../../utils/url");
const { schoolApi,personApi } = require("../../utils/api");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin:false,//是否已经登录
    schoolStatus:false,
    departmentStatus:false,
    specialStatus:false,
    outShool:[],
    schoolList:[],
    outDepartment:[],
    departmentList:[],
    outSpecial:[],
    specialList:[],
    schoolId:'',
    schoolName:'',
    schoolError:false,
    departmentId:'',
    departmentName:'',
    departmentError:false,
    specialId:'',
    specialName:'',
    specialError:false,
    score:'',//成绩
    scoreError:false,
    isSave:true,//当前的状态是否是保存
    userId:''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSchoolList()

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
  schoolFous(){
    this.setData({
      schoolStatus:true,
      departmentStatus:false,
      specialStatus:false,
      isSave:true
    })

  },
  departmentFous(){
    this.setData({
      departmentStatus:true,
      schoolStatus:false,
      specialStatus:false,
      isSave:true
    })
  },
  specialFous(){
    this.setData({
      specialStatus:true,
      isSave:true
    })
  },
  scoreBlur(e){
    let value = e.detail.value;
    console.log(value,333333)
    this.setData({
      score:value
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
  saveMess(){
    let self =  this;
    let data = this.data;
    if(data.schoolName == ''){
      this.setData({
        schoolError:true
      })
      return;
    }else{
      this.setData({
        schoolError:false
      })
    }

    if(data.departmentName == '' ){
      this.setData({
        departmentError:true
      })
      return;
    }else{
      this.setData({
        departmentError:false
      })
    }
    if(data.specialName == ''){
      this.setData({
        specialError:true,
      })
      return;
    }else{
      this.setData({
        specialError:false,
      })
    }
    // 此处要发起请求
    console.log(2222)
    this.setData({
      isSave:false,
    })


  },
  validataInput(){
    let flag = true;
    let data = this.data;
    console.log(data.schoolId,data.departmentId,data.specialId,data.score,33333)
    
    if(data.schoolId == ''){
       this.setData({
        schoolError:true
       })
       flag = false
    }else{
      this.setData({
        schoolError:false
       })
    }
    if(data.departmentId == ''){
       this.setData({
        departmentError:true,
       })
       flag = false

    }else{
      this.setData({
        departmentError:false,
       })
    }

    if(data.specialId == ''){
      this.setData({
        specialError:true,
      })
      flag = false

    }else{
      this.setData({
        specialError:false,
      })
    }
    if(data.score == ''){
      this.setData({
        scoreError:true,
      })
      flag = false

    }else{
      this.setData({
        scoreError:false,
      })
    }
    return flag;

  },
  lookRank(){
    console.log(this.validataInput())
    if(this.validataInput()){
      let data = JSON.stringify({
        'schoolId':this.data.schoolId,
        'collageId':this.data.departmentId,
        'specialId':this.data.specialId,
        'userId':this.data.userId,
      })
      wx.navigateTo({
        url: `/pages/rank/rank-list/rank-list?postData=${data}`,
      });

    }

  }
 
})