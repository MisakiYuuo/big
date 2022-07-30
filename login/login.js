$(function () {
  $("#link_reg").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  $("#link_login").on("click", function () {
    $(".login-box").show();
    $(".reg-box").hide();
  });
  // 校验规则
  let form = layui.form;
  let layer = layui.layer;
  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    //   校验两次密码
    repwd: function (value) {
      let pwd = $(".reg-box [name=password] ").val();
      if (pwd !== value) {
        return "两次密码不一致";
      }
    },
  });
//   监听注册表单
$('#form_reg').on('submit',function(e){
    e.preventDefault()
    $.post('/api/reguser',{
        username:$('#form_reg [name=username]').val() ,
        password:$('#form_reg [name=password]').val(),
    },function(res){
if(res.status !== 0){
  return  layer.msg(res.message, function(){
    //do something
  }); 
}
layer.msg('注册成功', {
    icon: 1,
    time: 2000 //2秒关闭（如果不配置，默认是3秒）
  }, function(){
    $('#link_login').click()
  }); 
    })
})
// 监听登录表单
$('#form_login').submit(function(e){
    e.preventDefault()
    $.ajax({
        url: '/api/login',
        method: 'POST',
        // jq中快速获取表单中的数据
        data: $(this).serialize(),
        success:function(res){
            if(res.status !==0){
                return layer.msg(res.message, function(){
                    //do something
                  }); 
            }
            layer.msg('登录成功', {
                icon: 1,
                time: 1000 //2秒关闭（如果不配置，默认是3秒）
              }, function(){
               console.log(res.token);
            //    token存储到localstorage里
            localStorage.setItem('token',res.token)
            //    location.href = '/index/index.html'
              }); 

        }
    })
})
});
