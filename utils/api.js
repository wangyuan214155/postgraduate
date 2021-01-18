//测试地址
const rootUrl = "http://print.woyouti.com";

//登录
const loginApi = {
  getLoginCode: rootUrl + "worker/logincode.htm", //获得手机号验证码
  login: rootUrl + "worker/login_activation.htm", //登录
};
const schoolApi = {
  getSchoolListTest:rootUrl+'/school/get-school-list',//获得院校列表
  getDepartmentList:rootUrl+'/collage/get-collage-by-school',//获得院校下的学院
  getSpecialList:rootUrl+'/speciality/get-speciality-by-collage',//获得学院下的专业
}


module.exports = {
  loginApi,
  schoolApi,
};