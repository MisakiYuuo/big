$(function () {
  var form = layui.form;
  var layer = layui.layer;
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return "昵称长度在1~6之间!";
      }
    },
  });
  // ----------
  function userInfo() {
    $.ajax({
      method: "get",
      url: "/my/userinfo",
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg("获取用户信息失败!");
        }
        // console.log(res);
        // 赋值
        form.val("formUserInfo", res.data);
      },
    });
  }
  userInfo();
  //   重新表单--------------------
  $("#btnReset").on("click", function (e) {
    e.preventDefault();
    userInfo();
  });
  // --------------提交------
  $(".layui-form").on("submit", function (e) {
    e.preventDefault();
    // ajax
    $.ajax({
      method: "POST",
      url: "/my/userinfo",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("修改失败!");
        }
        layer.msg("修改成功!");
        // 调用父页面中的方法,重新渲染用户昵称
        window.parent.getUserInfo()
      },
    });
  });
});
