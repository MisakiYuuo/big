$(function () {
  $("#btnLoginOut").on("click", function () {
    layer.confirm(
      "您确定要退出了吗",
      { icon: 2, title: "警告" },
      function (index) {
        //清空token
        localStorage.removeItem("token");
        // 跳转登录页面
        location.href = "/login/login.html";
        layer.close(index);
      }
    );
  });

  getUserInfo();
});
// 获取用户的基本信息
function getUserInfo() {
  $.ajax({
    method: "GET",
    url: "/my/userinfo",
    // Headers请求头配置对象
    // headers:{
    //     Authorization:localStorage.getItem('token') || ''
    // },
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg("获取用户信息失败");
      }
      // rDAvatar函数渲染用户头像

      rDAvatar(res.data);
    },
    // 无论成功与否都会返回
    // complete: function (res) {
    //   console.log(res.responseJSON);
    //   if (
    //     res.responseJSON.status === 1 &&
    //     res.responseJSON.message === "身份认证失败！"
    //   ) {
    //     localStorage.removeItem("token");
    //     location.href = "/login/login.html";
    //   }
    // },
  });
}

function rDAvatar(user) {
  let name = user.nickname || user.username;

  $("#welcome").html(`欢迎  ${name} `);
  // 头像
  if (user.user_pic !== null) {
    $(".layui-nav-img").attr("src", user.user_pic);
  } else {
    $(".layui-nav-img").attr("src", "/images/kain.webp");
  }
}
