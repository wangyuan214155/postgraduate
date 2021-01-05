//测试地址
const rootUrl = "https://www.workon.cc/icontact_web/rest/";

//登录
const loginApi = {
  getLoginCode: rootUrl + "worker/logincode.htm", //获得手机号验证码
  login: rootUrl + "worker/login_activation.htm", //登录
};


module.exports = {
  loginApi
};