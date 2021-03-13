const request = require("../../../utils/url");
const { rankApi,personApi } = require("../../../utils/api");
import Poster from '../../../utils/palette/rank.js';
var  app =  getApp();


Page({
  data: {
    rankNum:'',//当前的排名
    rankList:[],//排名列表
    no_more:false,
    currentPage: 1,//当前页数
    totalNum: 0,
    totalPage: 1,
    postData:null,
    shareStatus:false,
    rankTemplete:{},//生成图片所需要的参数
    saveImgScope: true,// 用户是否授权保存图片至相册的权限
    showPosterWrap: false, // 海报弹窗
    showBg: false,
    rankTemplete:null,
  },

  onLoad: function (options) {
    if(options.postData){
      let postData = JSON.parse(options.postData)
        this.setData({
          postData
        })
      
    }
    this.getRankList();
    // this.saveImg();

  },
  onShow: function () {
    this.setData({
      showBg: false,
    })
    this.openSettingFn();
  },
  openSelectBox(){
    console.log(1111,2222)
    this.setData({
      shareStatus:true
    })

  },
  closeTip() {
    this.setData({ showBg: false })
  },
  cancel(){
    this.setData({
      shareStatus:false
    })
  },
  getPosterParams() {
    return new Promise((resolve, reject) => {
      let posterParams = { // 生成海报所需要的参数
        rankNum: this.data.rankNum,
        rankList: this.data.rankList,//报考人数
       
      }
      resolve(posterParams);
    })
  },
  saveImg(){
      this.setData({ showPosterWrap: !this.data.showPosterWrap });
      wx.showToast({
        title: '图片生成中...',
        icon: 'loading',
        duration: 1000,
        mask: true
      })
      if (this.data.showPosterWrap && !this.data.posterImgPath){
        this.getPosterParams().then((posterParams) => {
          this.setData({
            rankTemplete: new Poster().palette(posterParams)
          })
        })
      }
      // this.getPosterParams().then((posterParams) => {
      //   this.setData({
      //     rankTemplete: new Poster().palette(posterParams)
      //   })
      // })
  },
  openSettingModel() {
    this.setData({ 
      showBg: true,
      showPosterWrap: false,
    });
  },
  onImgOK(e) {// 海报生成成功
    // util.hideToast();
    console.log(e,'图片生成中')
    this.setData({
      posterImgPath: e.detail.path
    })
  },
  openSettingFn() {
    wx.getSetting({
      success: (res) => {
        if (typeof res.authSetting['scope.writePhotosAlbum'] == 'boolean' && !res.authSetting['scope.writePhotosAlbum']) { // 用户未授权拍照
          this.setData({ saveImgScope: false })
        } else if (typeof res.authSetting['scope.writePhotosAlbum'] == 'boolean' && res.authSetting['scope.writePhotosAlbum']) {
          this.setData({ saveImgScope: true })
        }
        console.log(this.data.saveImgScope,'按钮状态')
      },
      fail: (err) => {
        console.log('openSettingFn',err);
      }
    })
  },
  savePoster() {
    this.openSettingFn();
    console.log(this.data.posterImgPath,4444)
    wx.saveImageToPhotosAlbum({
      filePath: this.data.posterImgPath,
      success: (res) => {
        console.log(1111, res);
        if (app.globalData.system != 'android'){
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 3000,
            mask: true
          })
        }
        this.setData({ showPosterWrap: false , shareStatus:false});
      }, 
      fail: (err) => {
        // 用户拒绝授权保存到相册 将按钮改为 button
        this.setData({ saveImgScope: false })
      }
    });
  },
  async getRankList(){
    let postData = this.data.postData;
    let data = {
      'schoolId':postData.schoolId,
      'collageId':postData.collageId,
      'specialId':postData.specialId,
      'userId':postData.userId,
      'page':this.data.currentPage,
    }
    const res = await request._get(rankApi.getStudentRank,data);
    console.log(res,'列表')
    let result = res.result;
    if(result){
      if(result.rank.length > 0){
        result.rank.forEach((item,index) => {
         
          item.openid =  "***"+ item.openid.substring(item.openid.length - 4);
        });
      }
       this.setData({
        totalPage:result.pagination.page_count,
        rankNum:result.self ? result.self.rank :0,
        rankList:this.data.rankList.concat(result.rank),
       })
    }
  },

  onReachBottom: function () {
    console.log('是否到达底部', this.data.currentPage, this.data.totalPage)
    let newPage = this.data.currentPage + 1;
    if (newPage <= this.data.totalPage) {
      this.setData({
        currentPage: newPage
      })
      this.getRankList();
    } else {
      newPage = this.data.totalPage;
      this.setData({
        currentPage: newPage,
        no_more: true
      })
    }
  },
  onShareAppMessage: function () {},

})