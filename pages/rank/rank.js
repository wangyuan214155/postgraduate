// pages/rank/rank.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin:false,//是否已经登录
    schoolStatus:false,
    departmentStatus:false,
    specialStatus:false,
    schoolList:[],
    departmentList:[],
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

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let  schoolList = [
      {
        id:1,
        name:'西北大学'
      },
      {
        id:3,
        name:'西北工业大学'
      },
      {
        id:3,
        name:'广西名族大学'
      },
      {
        id:4,
        name:'山西大学'
      },
      {
        id:5,
        name:'山西农业大学'
      },
      {
        id:6,
        name:'陕西师范大学'
      },
      {
        id:7,
        name:'陕西科技大学'
      },
      {
        id:8,
        name:'西安工程大学'
      },
      {
        id:9,
        name:'陕西师范大学'
      },
      {
        id:10,
        name:'陕西科技大学'
      },
      {
        id:11,
        name:'西安工程大学'
      },


    ];
    let departmentList = [
      {
        id:1,
        number:'010',
        name:'政治于法学学院',
      },
      {
        id:2,
        number:'002',
        name:'经济与管理学院',
      },
      {
        id:3,
        number:'003',
        name:'马克思主义学院',
      },
      {
        id:4,
        number:'004',
        name:'鲁迅艺术学院',
      },
      {
        id:5,
        number:'005',
        name:'外国语学院',
      },
      {
        id:6,
        number:'006',
        name:'数学与计算机学院',
      },
      {
        id:7,
        number:'007',
        name:'生命科学学院',
      },
      {
        id:8,
        number:'009',
        name:'医学院',
      },

    ];
    let specialList = [
      {
        id:1,
        name:'学科教学（数学）',

      },
      {
        id:2,
        name:'基础数学',
        
      },
      {
        id:3,
        name:'计算数学',
        
      },
      {
        id:4,
        name:'数学',
        
      },
      {
        id:5,
        name:'计算机科学与技术',
        
      },
      {
        id:6,
        name:'软件工程',
        
      },
      {
        id:7,
        name:'物联网',
        
      }
    ];
    this.setData({
      schoolList,
      departmentList,
      specialList,
    })


  },
  onShow: function () {

  },
  schoolInput(e){
    let value = e.detail.value;
    console.log(value,'学校')
    //此处要发请求
    if(value != this.data.schoolName){
      this.setData({
        departmentId:'',
        departmentName:'',
        specialId:'',
        specialName:'',
      })
    }
    if(value){


    }

  },
  departmentInput(e){
    let value = e.detail.value;
    console.log(value,'学院')
    //此处要发请求
    if(value != this.data.departmentName){
      this.setData({
        specialId:'',
        specialName:'',
      })
    }
    if(value){

    }
  },
  specialInput(e){
    let value = e.detail.value;
    console.log(value,'专业')
    //此处要发请求
    if(value){

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
  selectSchool(e){
    let item  = e.currentTarget.dataset.item;
    console.log(item,33)
    if(item.name != this.data.schoolName){
      this.setData({
        departmentId:'',
        departmentName:'',
        specialId:'',
        specialName:'',
      })
    }
    if(item){
      this.setData({
        schoolName:item.name,
        schoolId:item.id,
        schoolStatus:false,
      })
    }

  },
  selectDepartment(e){
    let item  = e.currentTarget.dataset.item;
    console.log(item,33)
    if(item.name != this.data.departmentName){
      this.setData({
        specialId:'',
        specialName:'',
      })
    }
    if(item){
      this.setData({
        departmentName:item.name,
        departmentId:item.id,
        departmentStatus:false,
      })
    }

  },
  selectSpecial(e){
    let item  = e.currentTarget.dataset.item;
    console.log(item,33)
   
    if(item){
      this.setData({
        specialName:item.name,
        specialId:item.id,
        specialStatus:false,
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
      wx.navigateTo({
        url: '/pages/rank/rank-list/rank-list',
        
      });

    }

  }
 
})