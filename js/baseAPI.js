$.ajaxPrefilter(function(options){
    // options.url = 'http://www.liulongbin.top:3007' + options.url
    options.url = 'http://big-event-api-t.itheima.net' + options.url
    // 添加统一请求头
    if(options.url.indexOf('/my/') !== -1){
         options.headers ={
        Authorization:localStorage.getItem('token') || '' 
    }
    }
    options.complete = function(res){
        if (
            res.responseJSON.status === 1 &&
            res.responseJSON.message === "身份认证失败！"
          ) {
            // 清空token 跳转页面
            localStorage.removeItem("token");
            location.href = "/login/login.html";
          }
    }
   
})
// jq统一管理ajax跟链接