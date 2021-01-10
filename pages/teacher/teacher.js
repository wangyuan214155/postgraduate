// pages/teacher/teacher.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeTab:1,
    schoolStatus:false,
    departmentStatus:false,
    teacherStatus:false,
    schoolList:[],
    departmentList:[],
    teacherList:[],
    schoolId:'',
    schoolName:'',
    schoolError:false,
    departmentId:'',
    departmentName:'',
    departmentError:false,
    teacherName:'',
    teacherId:'',
    teacherError:false,
    score:'',//成绩
    scoreError:false,


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
    let teacherList = [
      {
        id:1,
        name:'王二狗'
      },
      {
        id:2,
        name:'为大运'
      },
      {
        id:3,
        name:'杨幂'
      },
      {
        id:4,
        name:'魏大勋'
      },
      {
        id:5,
        name:'谭松韵'
      },
      {
        id:6,
        name:'李钟硕'
      },
      {
        id:7,
        name:'朴信惠'
      },
      {
        id:8,
        name:'马东'
      },
      {
        id:9,
        name:'李斯丹妮'
      },
    ]
   
    this.setData({
      schoolList,
      departmentList,
      teacherList,
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  switchTab(e){
    let type = e.currentTarget.dataset.type;
    this.setData({
      activeTab:type
    })

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
  teacherInput(e){
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
    })

  },
  departmentFous(){
    this.setData({
      departmentStatus:true,
      schoolStatus:false,
      specialStatus:false,
    })
  },
  teacherFous(){
    this.setData({
      teacherStatus:true
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
        teacherId:'',
        teacherName:'',
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
  selectTeacher(e){
    let item  = e.currentTarget.dataset.item;
    console.log(item,33)
    if(item){
      this.setData({
        teacherName:item.name,
        teacherId:item.id,
        teacherStatus:false,
      })
    }
  },
  //查看导师列表
  teacherList(){
    wx.navigateTo({
      url: '/pages/teacher/teacher-list/teacher-list',
    });
      

  },
  //查看导师热度
  lookTeacherHot(){
    wx.navigateTo({
      url: '/pages/teacher/teacher-hot/teacher-hot',
    });

  },

  
})