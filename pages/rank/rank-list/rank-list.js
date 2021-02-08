const request = require("../../../utils/url");
const { rankApi,personApi } = require("../../../utils/api");
Page({
  data: {
    rankNum:10,//当前的排名
    rankList:[],//排名列表
    no_more:false,
    currentPage: 1,//当前页数
    totalNum: 0,
    totalPage: 1,
    postData:null,
  },

  onLoad: function (options) {
    if(options.postData){
      let postData = JSON.parse(options.postData)
        this.setData({
          postData
        })
      
    }
    this.getRankList();
    

  },
  onShow: function () {

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
          item.openid = item.openid.substring(0, 4);
          item.openid += "***"
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