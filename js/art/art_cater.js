$(function () {
  let layer = layui.layer;
  var indexE = null;
  var indexR = null;
  //   var indexD = null;
  // -----获取数据------
  function initArtCt() {
    $.ajax({
      method: "GET",
      url: "/my/article/cates",
      success: function (res) {
        var str = template("tpl-table", res);
        $("tbody").html(str);
        //   console.log(res);
      },
    });
  }
  initArtCt();
  // 添加
  $("#refreshBtn").on("click", function (e) {
    e.preventDefault();
    initArtCt();
  });
  $("#addBtn").on("click", function () {
    indexE = layer.open({
      type: 1,
      area: ["500px", "300px"],
      title: "添加文章属性",
      content: $("#tabAdd").html(),
    });
  });
  // 通过代理添加按钮
  $("body").on("submit", "#form-add", function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/my/article/addcates",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          // console.log(res);
          return console.log(res.message);
        }
        layer.msg(res.message);
        initArtCt();
        layer.close(indexE);
      },
    });
  });
  // ------------修改按钮--获得数据
  $("tbody").on("click", ".btn-revise", function (e) {
    e.preventDefault();
    indexR = layer.open({
      type: 1,
      area: ["500px", "300px"],
      title: "添加文章属性",
      content: $("#btnRevise").html(),
    });
    let id = $(this).attr("data-id");
    // ajax请求
    $.ajax({
      method: "GET",
      url: "/my/article/cates/" + id,
      success: function (res) {
        layui.form.val("form-revise", res.data);
      },
    });
  });

  // -------修改数据
  $("body").on("submit", "#form-revise", function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/my/article/updatecate",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg(res.message);
        initArtCt();
        layer.close(indexR);
      },
    });
  });
  //   删除-------------
  $("tbody").on("click", ".btn-del", function () {
    
    let id = $(this).attr("data-id");
    layer.confirm(
      "您确定吗要删除我?",
      { icon: 5, title: "删除" },
      function (index) {
        $.ajax({
          method: "GET",
          url: "/my/article/deletecate/" + id,
          success: function (res) {
            if (res.status !== 0) {
              return layer.msg(res.message);
            }
            
            layer.msg(res.message);
            initArtCt();
            layer.close(index);
          },
          
        });
      }
    );
    
  });
});
