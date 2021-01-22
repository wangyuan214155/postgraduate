//测试地址
const rootUrl = "http://print.woyouti.com";

//登录
const loginApi = {
  // getLoginCode: rootUrl + "worker/logincode.htm", //获得手机号验证码
  login: rootUrl + "worker/login_activation.htm", //登录
};
const schoolApi = {
  getSchoolListTest:rootUrl+'/school/get-school-list',//获得院校列表
  getDepartmentList:rootUrl+'/collage/get-collage-by-school',//获得院校下的学院
  getSpecialList:rootUrl+'/speciality/get-speciality-by-collage',//获得学院下的专业
};
const personApi = {
  getUserInfo:rootUrl+'/student/get-student-info',//用户信息
  updateUserInfo:rootUrl+'/student/update-student-info',//更改用户信息
};
const rankApi = {
  getStudentRank:rootUrl+'/student/get-student-rank',//获得专业下的学生排名
  getTeacherList:rootUrl+'/teacher/get-teacher-list',//获得学院下的导师列表
  addCall:rootUrl+'/teacher/teacher-praise',//给导师打call
  getBindTeacher:rootUrl+'/teacher/teacher-relation',//获取自己绑定的导师
  addBindTeacher:rootUrl+'/teacher/create-relation',//创建学生和导师的绑定关系
  getTeaStudent:rootUrl+'/teacher/teacher-student-relation-list',//获取导师组下的学生列表

}



module.exports = {
  loginApi,
  schoolApi,
  personApi,
  rankApi
};