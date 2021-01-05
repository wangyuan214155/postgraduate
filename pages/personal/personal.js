// pages/personal/personal.js
Page({

  data: {
    isLogin:false,//是否已经登录
    avater:'',//微信头像地址
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
    isSave:true,//当前的状态是否是保存




  },

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
          showCancel:false,
          success (res) {
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
    if(value != this.data.schoolName){
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
      isSave:true
    })

  },
  departmentFous(){
    this.setData({
      departmentStatus:true,
      isSave:true
    })
  },
  specialFous(){
    this.setData({
      specialStatus:true,
      isSave:true
    })
  },
  selectSchool(e){
    let item  = e.currentTarget.dataset.item;
    console.log(item,33)
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


  }
 
})