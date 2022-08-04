$(function () {
  let layer = layui.layer;
  let form = layui.form;
  var laypage = layui.laypage;
  var inquire = {
    pagenum: 1,
    pagesize: 3,
    cate_id: "",
    state: "",
  };
  // 时间美化=
  template.defaults.imports.dataFormat = function (data) {
    const dt = new Date(data);
    var y = dt.getFullYear();
    var mth = zor(dt.getMonth() + 1);
    var d = zor(dt.getDate());

    var h = zor(dt.getHours());
    var m = zor(dt.getMinutes());
    var s = zor(dt.getSeconds());

    return y + "-" + mth + "-" + d + "  " + h + ":" + m + ":" + s;
  };
  //   不灵
  function zor(z) {
    return z > 9 ? z : "0" + z;
  }
  // ----获取数据
  function initGet() {
    $.ajax({
      method: "GET",
      url: "/my/article/list",
      data: inquire,
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        } else if (res.total === 0) {
          layer.msg("暂时没有文章");
        }

        let str = template("tpl-table", res);
        $("tbody").html(str);
        rdPage(res.total);
        // console.log(res);
      },
    });
  }
  initGet();
  //   获取文章分类转态--------------
  function initCate() {
    $.ajax({
      method: "GET",
      url: "/my/article/list",
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        let str1 = template("tpl_cate", res);
        $("[name=cate_id] ").html(str1);

        form.render();
      },
    });
  }
  initCate();
  //   -----------
  $("#form-search").on("submit", function (e) {
    e.preventDefault();
    let cate_id = $("[name=cate_id]").val();
    let state = $("[name=state]").val();
    inquire.cate_id = cate_id;
    inquire.state = state;
    initGet();
  });
  // ________分页方法
  function rdPage(t) {
    // layui的分页方法
    laypage.render({
      elem: "pageB",
      count: t,
      limit: inquire.pagesize,
      curr: inquire.pagenum,
      layout: ["count", "prev", "page", "next", "limit", "skip"],
      limits: [2, 3, 5, 10],
      jump: function (obj, f) {
        // console.log(f); true/是render调用的
        inquire.pagenum = obj.curr;
        inquire.pagesize = obj.limit;
        // initGet();
        if (!f) {
          initGet();
        }
      },
    });
  }
  // -----删除---
  $("tbody").on("click", ".btn-del-wd", function () {
    let id = $(this).attr("data-id");
    let btnL = $(".btn-del-wd").length;
    layer.confirm("是否删除", { icon: 3, title: "删除" }, function (index) {
      $.ajax({
        method: "GET",
        url: "/my/article/delete/" + id,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg(res.message);
          }
          layer.msg(res.message);
          if (btnL === 1) {
            inquire.pagenum = inquire.pagenum === 1 ? 1 : inquire.pagenum - 1;
          }
          initGet();
        },
      });
      layer.close(index);
    });
  });
  // --------编辑
  var indexR = null
  $('tbody').on('click','.btn-bj',function(){
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
      url: "/my/article/" + id,
      success: function (res) {
        form.val("form-revise", res.data);
      },
    });
  })
  $("body").on("submit", "#form-revise", function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/my/article/edit",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg(res.message);
        }
        initGet()
        layer.msg(res.message);
        layer.close(indexR);
      },
    });
  });
});
