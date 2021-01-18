// pages/teacher/teacher_detail/teacher-detail.js
import api from "../../../utils/url.js";
Page({

  data: {
    id:1,
    nextId:2,
    name:'王二狗',
    photo:'',
    school:'西北工业大学',
    department:'计算机学院',
    hotNum:2345

  },

  onLoad: function (options) {
    if(options.id && options.nextId){
      this.setData({
        id:options.id,
        nextId:options.nextId,
      })
    }
    api.fetchCode()
    .then(code =>{
      console.log(code,22222)
      
    })

  },


  onReady: function () {

  },

  onShow: function () {

  },



})