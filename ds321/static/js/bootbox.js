/*---------------------dialog------------------
------------write by Fan   2015-07-01
Alert:   eg: $("body").Alert("Hello world")

Confirm:   eg: $("body").Confirm("Hello world",function (flag){ alert(flag))

Dialog: eg:
title: 标题,
buttons: [{
    text: 按钮文字,
    success: 按钮事件
}, {
    text: 按钮文字,
    success: 按钮事件
}]
,
url: 链接,
div:要弹的div,
size: 弹窗大小,
dropable: 弹窗点周围是否消失,
close: 是否出现关闭图标,
data: url数据,
callback: 回调,
before:弹窗前
----------------
$("body").Dialog({
            before: function () {
                alert(1)
            },
            callback: function () {
                alert(2)
            },
            title: '添加页面',
            size:'large',
            url:"@Url.Action("CreatePage","YiZhanPage")"
        })
--Add By FanQiHang 2015-10-20

Success:   eg: $("body").Success("Success")
Error:   eg: $("body").Success("Error")
Info:   eg: $("body").Success("Infomation")
Warning:   eg: $("body").Success("Warning")
--------------------------end----------------------*/

(function ($) {
    'use strict';
    var methods = {
        init: function () {
            bootboxthis = this;
            $("#confirmwindow .btn-default").click(function () {
                $("#confirmwindow").modal("hide");
            });
            $("#confirmwindow .btn-info").click(function () {
                $("#confirmwindow").modal("hide");
                if (typeof (bootboxthis.func) === "function") {
                    bootboxthis.func.call(true)
                };
            });
        },
        _alertHtml: '<div class="modal fade design-modal modal-group-md"  data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
      '  <div class="modal-dialog modal-sm">                                                                                                      ' +
'      <div class="modal-content modal-no-border">                                                                                          ' +
'          <div class="modal-header">                                                                                                       ' +
'              <h4 class="modal-title"><span class="text-warning"><i class="fa fa-exclamation-triangle"></i></span>　提示</h4>              ' +
'          </div>                                                                                                                           ' +
'          <div class="modal-body publish-modal-body text-center">                                                                          ' +
'                                                                                                                                           ' +
'              <p></p>                                                                                            ' +
'                                                                                                                                           ' +
'          </div>                                                                                                                           ' +
'                                                                                                                                           ' +
'          <div class="modal-footer " style="text-align:center">                                                                                           ' +
'              <button type="button" data-dismiss="modal" class="btn btn-info">确定</button>                                                                   ' +
'          </div>                                                                                                                           ' +
'      </div>                                                                                                                               ' +
'  </div>                                                                                                                                   ' +
'</div>',
        Alert: function (message, options) {
            return this.each(function () {
                var alertdialog = $(methods._alertHtml).appendTo("body")
                alertdialog.find(".modal-body p").text(message);


                var modaloption = $.extend({}, methods.defaultDialog, options);

                alertdialog.on('hidden.bs.modal', function (e) {
                    // do something...
                    alertdialog.remove();
                    if (modaloption.callback) {
                        modaloption.callback.call(this)
                    }
                })
                alertdialog.modal("show");
                //setTimeout(function () { alertdialog.modal("hide") }, 5000)
            })
        },
        _confirmHtml: '<div class="modal fade design-modal modal-group-md" id="library-del-tips" tabindex="-1" role="dialog">                ' +
'  <div class="modal-dialog modal-sm">                                                                                                      ' +
'      <div class="modal-content modal-no-border">                                                                                          ' +
'          <div class="modal-header">                                                                                                       ' +
'              <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> ' +
'              <h4 class="modal-title"><span class="text-warning"><i class="fa fa-exclamation-triangle"></i></span>　提示</h4>              ' +
'          </div>                                                                                                                           ' +
'          <div class="modal-body publish-modal-body text-center">                                                                          ' +
'                                                                                                                                           ' +
'              <p></p>                                                                                            ' +
'                                                                                                                                           ' +
'          </div>                                                                                                                           ' +
'                                                                                                                                           ' +
'          <div class="modal-footer " style="text-align:center">                                                                                           ' +
'              <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>                                             ' +
'              <button type="button" class="btn btn-danger">删除</button>                                                                   ' +
'          </div>                                                                                                                           ' +
'      </div>                                                                                                                               ' +
'  </div>                                                                                                                                   ' +
'</div>',
        Confirm: function (message, Func, options) {
            var confirmdialog = $(methods._confirmHtml).appendTo("body")
            confirmdialog.find(".modal-body p").text(message);


            var modaloption = $.extend({}, methods.defaultDialog, options);
            if (modaloption.buttons) {
                confirmdialog.find(".btn-danger").text(modaloption.buttons.text);
            }
            if (modaloption.buttons1) {
                confirmdialog.find(".btn-default").text(modaloption.buttons1.text);
            }
            confirmdialog.on('hidden.bs.modal', function (e) {
                // do something...
                confirmdialog.remove();
            })
            if (typeof (Func) === "function") {
                confirmdialog.find(".btn-danger").on("click", function () { Func.call(this, true), confirmdialog.modal("hide"); }).end().find(".btn-default").on("click", function () { Func.call(this, false) })
            }
            confirmdialog.modal("show");
        },
        _confirm2Html: '<div id="modal-tips" class="modal modal-danger">                                  ' +
   '     <div class="modal-heading">                                                                      ' +
   '         <span class="right-content close-modal">&#215;</span>                                        ' +
   '         <div class="modal-title"><i class="fa fa-warning"></i> <strong>警告</strong></div>           ' +
   '     </div>                                                                                           ' +
   '     <div class="modal-body text-center">                                                             ' +
   '         <p class="text-bold text-large">切换模板，会丢失原网站内容和相关设置数据，您是否继续。</p>   ' +
   '     </div>                                                                                           ' +
   '     <div class="modal-footer text-right">                                                            ' +
   '         <div class="btn btn-default close-modal" data-modal-id="modal-loading">取消</div>            ' +
   '         <div class="btn btn-danger close-modal" data-modal-id="changed-success">继续切换</div>       ' +
   '     </div>                                                                                           ' +
   ' </div>                                                                                               ',
        Confirm2: function (message, Func, options) {
            var confirmdialog = $(methods._confirm2Html).appendTo("body")
            confirmdialog.find(".modal-body").text(message);
            var modaloption = $.extend({}, methods.defaultDialog, options);
            if (modaloption.buttons) {
                confirmdialog.find(".btn-default").text(modaloption.buttons.text);
            }
            if (modaloption.buttons1) {
                confirmdialog.find(".btn-default").text(modaloption.buttons1.text);
            }

            if (typeof (Func) === "function") {
                confirmdialog.find(".btn-danger").on("click", function () { Func.call(this, true), confirmdialog.trigger("reveal:close"); }).end().find(".btn-default").on("click", function () { Func.call(this, false) })
            }
            confirmdialog.reveal();
        },
        _success2Html: '<div id="changed-success" class="modal modal-success">                                   ' +
    '    <div class="modal-heading">                                                                             ' +
    '        <span class="right-content close-modal">&#215;</span>                                               ' +
    '        <div class="modal-title"><i class="fa fa-check-circle"></i> <strong>提示</strong></div>     ' +
    '    </div>                                                                                                  ' +
    '    <div class="modal-body text-center">                                                                    ' +
    '        <p class="text-bold text-large">恭喜您，模板切换成功。</p>                                          ' +
    '    </div>                                                                                                  ' +
    '    <div class="modal-footer text-right">                                                                   ' +
    '        <div class="btn btn-success close-modal">确定</div>                                                 ' +
    '    </div>                                                                                                  ' +
    '</div>                                                                                                      ',
        Success2: function (message, Func, options) {
            var confirmdialog = $(methods._success2Html).appendTo("body")
            confirmdialog.find(".modal-body .text-large").text(message);
            var modaloption = $.extend({}, methods.defaultDialog, options);
            if (modaloption.buttons) {
                confirmdialog.find(".btn-default").text(modaloption.buttons.text);
            }
            if (modaloption.buttons1) {
                confirmdialog.find(".btn-default").text(modaloption.buttons1.text);
            }

            if (typeof (Func) === "function") {
                confirmdialog.find(".btn-success").on("click", function () { Func.call(this, true), confirmdialog.trigger("reveal:close"); });
            }
            confirmdialog.reveal();
        },
        _error2Html: '<div id="changed-danger" class="modal modal-danger">                                   ' +
   '    <div class="modal-heading">                                                                             ' +
   '        <span class="right-content close-modal">&#215;</span>                                               ' +
   '        <div class="modal-title"><i class="fa fa-check-circle"></i> <strong>提示</strong></div>     ' +
   '    </div>                                                                                                  ' +
   '    <div class="modal-body text-center">                                                                    ' +
   '        <p class="text-bold text-large">恭喜您，模板切换成功。</p>                                          ' +
   '    </div>                                                                                                  ' +
   '    <div class="modal-footer text-right">                                                                   ' +
   '        <div class="btn btn-danger close-modal">确定</div>                                                 ' +
   '    </div>                                                                                                  ' +
   '</div>                                                                                                      ',
        Error2: function (message, Func, options) {
            var confirmdialog = $(methods._error2Html).appendTo("body")
            confirmdialog.find(".modal-body .text-large").text(message);
            var modaloption = $.extend({}, methods.defaultDialog, options);
            if (modaloption.buttons) {
                confirmdialog.find(".btn-default").text(modaloption.buttons.text);
            }
            if (modaloption.buttons1) {
                confirmdialog.find(".btn-default").text(modaloption.buttons1.text);
            }

            if (typeof (Func) === "function") {
                confirmdialog.find(".btn-danger").on("click", function () { Func.call(this, true), confirmdialog.trigger("reveal:close"); });
            }
            confirmdialog.reveal();
        },
        defaultDialog:
            {
                title: '模态框',
                buttons: [{
                    text: null,
                    success: null
                }, {
                    text: null,
                    success: null
                }]
                ,
                url: '',
                div: '',
                size: 'middle',
                dropable: true,
                close: true,
                data: null,
                callback: null,
                before: null,
                headClass: ""
            },
        _dialogHtml: ' <div class="modal fade design-modal" tabindex="-1" id="dialogmodal" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">                  ' +
            '   <div class="modal-dialog modal-sm">                                                                                                                          ' +
            '       <div class="modal-content">                                                                                                                              ' +
            '           <div class="modal-header">                                                                                                                           ' +
            '               <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>      ' +
            '               <h4 class="modal-title" id="myModalLabel">Modal title</h4>                                                                                       ' +
            '           </div>                                                                                                                                               ' +
            '           <div class="modal-body clearfix">                                                                                                                    ' +
            '           </div>                                                                                                                                               ' +
            '           <div class="modal-footer">                                                                                                                           ' +
            '               <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>                                                                ' +
            '               <button type="button" class="btn btn-primary">保存</button>                                                                              ' +
            '           </div>                                                                                                                                               ' +
            '       </div>                                                                                                                                                   ' +
            '   </div>                                                                                                                                                       ' +
            '</div>',
        Dialog: function (options) {
            var modaloption = $.extend({}, methods.defaultDialog, options);
            if (typeof (modaloption.before) === "function") {
                modaloption.before.call();
            }
            var dialog = $(methods._dialogHtml).appendTo("body")
            dialog.addClass(modaloption.headClass);
            dialog.find("h4").text(modaloption.title);
            if (modaloption.dropable) {
                dialog.attr("data-backdrop", "static");
            } else {
                dialog.removeAttr("data-backdrop", "static");
            }
            if (modaloption.size == "small") {
                dialog.find(".modal-dialog").removeClass("modal-lg").addClass("modal-sm")
            } else if (modaloption.size == "middle") {
                dialog.find(".modal-dialog").removeClass("modal-lg").removeClass("modal-sm")
            } else {
                dialog.find(".modal-dialog").removeClass("modal-sm").addClass("modal-lg")
            }
            if (modaloption.close) {
                dialog.find("button.close").show();
            } else {
                dialog.find("button.close").hide();
            }

            if (modaloption.url != '') {
                $.ajax({
                    url: modaloption.url,
                    data: modaloption.data,
                    type: 'get', //数据发送方式 
                    dataType: 'html', //接受数据格式 (这里有很多,常用的有html,xml,js,json) 
                    error: function () { //失败 
                        $("body").Alert("加载失败");
                    },
                    success: function (msg) { //成功 
                        dialog.find(".modal-body").html(msg);
                        if (typeof (modaloption.callback) === "function") {
                            modaloption.callback.call();
                        }

                        dialog.modal("show");
                    }
                })

            } else if (modaloption.div != '') {
                dialog.find(".modal-body").append($(modaloption.div));
                dialog.modal("show");
                modaloption.callback.call();
            }
            var buttons = modaloption.buttons;
            dialog.find(".modal-footer").show();
            dialog.on('hidden.bs.modal', function (e) {
                // do something...
                dialog.remove();
            })
            if (buttons.length > 1) {
                dialog.find(".modal-footer button").unbind("click");
                if (buttons[0].text != null) {
                    dialog.find(".modal-footer button").eq(0).text(buttons[0].text).bind("click", function () {
                        dialog.modal("hide");
                        if (typeof (buttons[0].success) === "function") {
                            buttons[0].success.call()
                        };
                    })
                } else {
                    dialog.find(".modal-footer button").eq(0).bind("click", function () {
                        dialog.modal("hide");
                        if (typeof (buttons[0].success) === "function") {
                            buttons[0].success.call()
                        };
                    })
                }
                if (buttons[1].text != null) {
                    dialog.find(".modal-footer button").eq(1).text(buttons[1].text).bind("click", function () {
                        if (typeof (buttons[1].success) === "function") {
                            buttons[1].success.call()
                        };
                    });
                } else {
                    dialog.find(".modal-footer button").eq(1).bind("click", function () {

                        if (typeof (buttons[1].success) === "function") {
                            buttons[1].success.call()
                        };
                    });
                }
            }
            if (buttons.length == 1) {
                dialog.find(".modal-footer button").unbind("click").remove();
                $("<button type=\"button\" class=\"btn btn-info\" >" + buttons[0].text + "</button>").bind("click", function () {
                    dialog.modal("hide");
                    if (typeof (buttons[0].success) === "function") {
                        buttons[0].success.call()
                    };
                }).appendTo(dialog.find(".modal-footer"));

            }
            if (buttons.length == 0) {
                dialog.find(".modal-footer").hide();
            }
            return dialog;
        },

        _linkDialogHtml: ' <div class="modal fade design-modal " tabindex="-1" id="dialogmodal" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">                  ' +
            '   <div class="modal-dialog modal-sm">                                                                                                                          ' +
            '       <div class="modal-content">                                                                                                                              ' +
            '           <div class="modal-header">                                                                                                                           ' +
            '               <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>      ' +
            '               <h4 class="modal-title" id="myModalLabel">Modal title</h4>                                                                                       ' +
            '           </div>                                                                                                                                               ' +
            '           <div class="modal-body link-box-body">                                                                                                                    ' +
            '           </div>                                                                                                                                               ' +
            '           <div class="modal-footer">                                                                                                                           ' +
            '               <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>                                                                ' +
            '               <button type="button" class="btn btn-primary">保存</button>                                                                              ' +
            '           </div>                                                                                                                                               ' +
            '       </div>                                                                                                                                                   ' +
            '   </div>                                                                                                                                                       ' +
            '</div>',
        LinkDialog: function (options) {
            var modaloption = $.extend({}, methods.defaultDialog, options);
            if (typeof (modaloption.before) === "function") {
                modaloption.before.call();
            }
            var dialog = $(methods._linkDialogHtml).appendTo("body")

            dialog.find("h4").text(modaloption.title);
            if (modaloption.dropable) {
                dialog.attr("data-backdrop", "static");
            } else {
                dialog.removeAttr("data-backdrop", "static");
            }
            if (modaloption.size == "small") {
                dialog.find(".modal-dialog").removeClass("modal-lg").addClass("modal-sm")
            } else if (modaloption.size == "middle") {
                dialog.find(".modal-dialog").removeClass("modal-lg").removeClass("modal-sm")
            } else {
                dialog.find(".modal-dialog").removeClass("modal-sm").addClass("modal-lg")
            }
            if (modaloption.close) {
                dialog.find("button.close").show();
            } else {
                dialog.find("button.close").hide();
            }

            if (modaloption.url != '') {
                $.ajax({
                    url: modaloption.url,
                    data: modaloption.data,
                    type: 'get', //数据发送方式 
                    dataType: 'html', //接受数据格式 (这里有很多,常用的有html,xml,js,json) 
                    error: function () { //失败 
                        $("body").Alert("加载失败");
                    },
                    success: function (msg) { //成功 
                        dialog.find(".modal-body").html(msg);
                        if (typeof (modaloption.callback) === "function") {
                            modaloption.callback.call();
                        }
                        dialog.modal("show");
                    }
                })

            } else if (modaloption.div != '') {
                dialog.find(".modal-body").append($(modaloption.div)[0]);
                dialog.modal("show");
            }
            var buttons = modaloption.buttons;
            dialog.find(".modal-footer").show();
            dialog.on('hidden.bs.modal', function (e) {
                // do something...
                dialog.remove();
            })
            if (buttons.length > 1) {
                dialog.find(".modal-footer button").unbind("click");
                if (buttons[0].text != null) {
                    dialog.find(".modal-footer button").eq(0).text(buttons[0].text).bind("click", function () {
                        dialog.modal("hide");
                        if (typeof (buttons[0].success) === "function") {
                            buttons[0].success.call()
                        };
                    })
                } else {
                    dialog.find(".modal-footer button").eq(0).bind("click", function () {
                        dialog.modal("hide");
                        if (typeof (buttons[0].success) === "function") {
                            buttons[0].success.call()
                        };
                    })
                }
                if (buttons[1].text != null) {
                    dialog.find(".modal-footer button").eq(1).text(buttons[1].text).bind("click", function () {
                        if (typeof (buttons[1].success) === "function") {
                            buttons[1].success.call()
                        };
                    });
                } else {
                    dialog.find(".modal-footer button").eq(1).bind("click", function () {

                        if (typeof (buttons[1].success) === "function") {
                            buttons[1].success.call()
                        };
                    });
                }
            }
            if (buttons.length == 1) {
                dialog.find(".modal-footer button").unbind("click").remove();
                $("<button type=\"button\" class=\"btn btn-info\" >" + buttons[0].text + "</button>").bind("click", function () {
                    dialog.modal("hide");
                    if (typeof (buttons[0].success) === "function") {
                        buttons[0].success.call()
                    };
                }).appendTo(dialog.find(".modal-footer"));

            }
            if (buttons.length == 0) {
                dialog.find(".modal-footer").hide();
            }
            return dialog;
        },
        _contentDialogHtml: ' <div class="modal fade design-modal " tabindex="-1" id="dialogmodal" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">                  ' +
            '   <div class="modal-dialog modal-sm">                                                                                                                          ' +
            '       <div class="modal-content modal-no-shadow no-border">                                                                                                                              ' +
            '           <div class="modal-header">                                                                                                                           ' +
            '               <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>      ' +
            '               <h4 class="modal-title" id="myModalLabel">Modal title</h4>                                                                                       ' +
            '           </div>                                                                                                                                               ' +
            '           <div class="modal-body choosed-column-body">                                                                                                                    ' +
            '           </div>                                                                                                                                               ' +
            '           <div class="modal-footer">                                                                                                                           ' +
            '               <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>                                                                ' +
            '               <button type="button" class="btn btn-primary">保存</button>                                                                              ' +
            '           </div>                                                                                                                                               ' +
            '       </div>                                                                                                                                                   ' +
            '   </div>                                                                                                                                                       ' +
            '</div>',
        ContentDialog: function (options) {
            var modaloption = $.extend({}, methods.defaultDialog, options);
            if (typeof (modaloption.before) === "function") {
                modaloption.before.call();
            }
            var dialog = $(methods._contentDialogHtml).appendTo("body")

            dialog.find("h4").text(modaloption.title);
            if (modaloption.dropable) {
                dialog.attr("data-backdrop", "static");
            } else {
                dialog.removeAttr("data-backdrop", "static");
            }
            if (modaloption.size == "small") {
                dialog.find(".modal-dialog").removeClass("modal-lg").addClass("modal-sm")
            } else if (modaloption.size == "middle") {
                dialog.find(".modal-dialog").removeClass("modal-lg").removeClass("modal-sm")
            } else {
                dialog.find(".modal-dialog").removeClass("modal-sm").addClass("modal-lg")
            }
            if (modaloption.close) {
                dialog.find("button.close").show();
            } else {
                dialog.find("button.close").hide();
            }

            if (modaloption.url != '') {
                $.ajax({
                    url: modaloption.url,
                    data: modaloption.data,
                    type: 'get', //数据发送方式 
                    dataType: 'html', //接受数据格式 (这里有很多,常用的有html,xml,js,json) 
                    error: function () { //失败 
                        $("body").Alert("加载失败");
                    },
                    success: function (msg) { //成功 
                        dialog.find(".modal-body").html(msg);
                        if (typeof (modaloption.callback) === "function") {
                            modaloption.callback.call();
                        }
                        dialog.modal("show");
                    }
                })

            } else if (modaloption.div != '') {
                dialog.find(".modal-body").append($(modaloption.div)[0]);
                dialog.modal("show");
            }
            var buttons = modaloption.buttons;
            dialog.find(".modal-footer").show();
            dialog.on('hidden.bs.modal', function (e) {
                // do something...
                dialog.remove();
            })
            if (buttons.length > 1) {
                dialog.find(".modal-footer button").unbind("click");
                if (buttons[0].text != null) {
                    dialog.find(".modal-footer button").eq(0).text(buttons[0].text).bind("click", function () {
                        dialog.modal("hide");
                        if (typeof (buttons[0].success) === "function") {
                            buttons[0].success.call()
                        };
                    })
                } else {
                    dialog.find(".modal-footer button").eq(0).bind("click", function () {
                        dialog.modal("hide");
                        if (typeof (buttons[0].success) === "function") {
                            buttons[0].success.call()
                        };
                    })
                }
                if (buttons[1].text != null) {
                    dialog.find(".modal-footer button").eq(1).text(buttons[1].text).bind("click", function () {
                        if (typeof (buttons[1].success) === "function") {
                            buttons[1].success.call()
                        };
                    });
                } else {
                    dialog.find(".modal-footer button").eq(1).bind("click", function () {

                        if (typeof (buttons[1].success) === "function") {
                            buttons[1].success.call()
                        };
                    });
                }
            }
            if (buttons.length == 1) {
                dialog.find(".modal-footer button").unbind("click").remove();
                $("<button type=\"button\" class=\"btn btn-info\" >" + buttons[0].text + "</button>").bind("click", function () {
                    dialog.modal("hide");
                    if (typeof (buttons[0].success) === "function") {
                        buttons[0].success.call()
                    };
                }).appendTo(dialog.find(".modal-footer"));

            }
            if (buttons.length == 0) {
                dialog.find(".modal-footer").hide();
            }
            return dialog;
        },
        _tagDialogHtml: ' <div class="modal fade design-modal modal-group-md" tabindex="-1" id="dialogmodal" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">                  ' +
            '   <div class="modal-dialog modal-sm">                                                                                                                          ' +
            '       <div class="modal-content modal-no-shadow no-border">                                                                                                                              ' +
            '           <div class="modal-header">                                                                                                                           ' +
            '               <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>      ' +
            '               <h4 class="modal-title" id="myModalLabel">Modal title</h4>                                                                                       ' +
            '           </div>                                                                                                                                               ' +
            '           <div class="modal-body choosed-featured-body">                                                                                                                    ' +
            '           </div>                                                                                                                                               ' +
            '           <div class="modal-footer">                                                                                                                           ' +
            '               <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>                                                                ' +
            '               <button type="button" class="btn btn-primary">保存</button>                                                                              ' +
            '           </div>                                                                                                                                               ' +
            '       </div>                                                                                                                                                   ' +
            '   </div>                                                                                                                                                       ' +
            '</div>',
        TagDialog: function (options) {
            var modaloption = $.extend({}, methods.defaultDialog, options);
            if (typeof (modaloption.before) === "function") {
                modaloption.before.call();
            }
            var dialog = $(methods._tagDialogHtml).appendTo("body")

            dialog.find("h4").text(modaloption.title);
            if (modaloption.dropable) {
                dialog.attr("data-backdrop", "static");
            } else {
                dialog.removeAttr("data-backdrop", "static");
            }
            if (modaloption.size == "small") {
                dialog.find(".modal-dialog").removeClass("modal-lg").addClass("modal-sm")
            } else if (modaloption.size == "middle") {
                dialog.find(".modal-dialog").removeClass("modal-lg").removeClass("modal-sm")
            } else {
                dialog.find(".modal-dialog").removeClass("modal-sm").addClass("modal-lg")
            }
            if (modaloption.close) {
                dialog.find("button.close").show();
            } else {
                dialog.find("button.close").hide();
            }

            if (modaloption.url != '') {
                $.ajax({
                    url: modaloption.url,
                    data: modaloption.data,
                    type: 'get', //数据发送方式 
                    dataType: 'html', //接受数据格式 (这里有很多,常用的有html,xml,js,json) 
                    error: function () { //失败 
                        $("body").Alert("加载失败");
                    },
                    success: function (msg) { //成功 
                        dialog.find(".modal-body").html(msg);
                        if (typeof (modaloption.callback) === "function") {
                            modaloption.callback.call();
                        }
                        dialog.modal("show");
                    }
                })

            } else if (modaloption.div != '') {
                dialog.find(".modal-body").append($(modaloption.div)[0]);
                dialog.modal("show");
            }
            var buttons = modaloption.buttons;
            dialog.find(".modal-footer").show();
            dialog.on('hidden.bs.modal', function (e) {
                // do something...
                dialog.remove();
            })
            if (buttons.length > 1) {
                dialog.find(".modal-footer button").unbind("click");
                if (buttons[0].text != null) {
                    dialog.find(".modal-footer button").eq(0).text(buttons[0].text).bind("click", function () {
                        dialog.modal("hide");
                        if (typeof (buttons[0].success) === "function") {
                            buttons[0].success.call()
                        };
                    })
                } else {
                    dialog.find(".modal-footer button").eq(0).bind("click", function () {
                        dialog.modal("hide");
                        if (typeof (buttons[0].success) === "function") {
                            buttons[0].success.call()
                        };
                    })
                }
                if (buttons[1].text != null) {
                    dialog.find(".modal-footer button").eq(1).text(buttons[1].text).bind("click", function () {
                        if (typeof (buttons[1].success) === "function") {
                            buttons[1].success.call()
                        };
                    });
                } else {
                    dialog.find(".modal-footer button").eq(1).bind("click", function () {

                        if (typeof (buttons[1].success) === "function") {
                            buttons[1].success.call()
                        };
                    });
                }
            }
            if (buttons.length == 1) {
                dialog.find(".modal-footer button").unbind("click").remove();
                $("<button type=\"button\" class=\"btn btn-info\" >" + buttons[0].text + "</button>").bind("click", function () {
                    dialog.modal("hide");
                    if (typeof (buttons[0].success) === "function") {
                        buttons[0].success.call()
                    };
                }).appendTo(dialog.find(".modal-footer"));

            }
            if (buttons.length == 0) {
                dialog.find(".modal-footer").hide();
            }
            return dialog;
        },
        _sliderDialogHtml: ' <div class="modal fade design-modal modal-group-md" tabindex="-1" id="dialogmodal" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">                  ' +
            '   <div class="modal-dialog modal-sm">                                                                                                                          ' +
            '       <div class="modal-content modal-no-shadow no-border">                                                                                                                              ' +
            '           <div class="modal-header">                                                                                                                           ' +
            '               <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>      ' +
            '               <h4 class="modal-title" id="myModalLabel">Modal title</h4>                                                                                       ' +
            '           </div>                                                                                                                                               ' +
            '           <div class="modal-body slider-image-body clearfix">                                                                                                                    ' +
            '           </div>                                                                                                                                               ' +
            '           <div class="modal-footer">                                                                                                                           ' +
            '               <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>                                                                ' +
            '               <button type="button" class="btn btn-primary">保存</button>                                                                              ' +
            '           </div>                                                                                                                                               ' +
            '       </div>                                                                                                                                                   ' +
            '   </div>                                                                                                                                                       ' +
            '</div>',
        SliderDialog: function (options) {
            var modaloption = $.extend({}, methods.defaultDialog, options);
            if (typeof (modaloption.before) === "function") {
                modaloption.before.call();
            }
            var dialog = $(methods._sliderDialogHtml).appendTo("body")

            dialog.find("h4").text(modaloption.title);
            if (modaloption.dropable) {
                dialog.attr("data-backdrop", "static");
            } else {
                dialog.removeAttr("data-backdrop", "static");
            }
            if (modaloption.size == "small") {
                dialog.find(".modal-dialog").removeClass("modal-lg").addClass("modal-sm")
            } else if (modaloption.size == "middle") {
                dialog.find(".modal-dialog").removeClass("modal-lg").removeClass("modal-sm")
            } else {
                dialog.find(".modal-dialog").removeClass("modal-sm").addClass("modal-lg")
            }
            if (modaloption.close) {
                dialog.find("button.close").show();
            } else {
                dialog.find("button.close").hide();
            }

            if (modaloption.url != '') {
                $.ajax({
                    url: modaloption.url,
                    data: modaloption.data,
                    type: 'post', //数据发送方式 
                    dataType: 'html', //接受数据格式 (这里有很多,常用的有html,xml,js,json) 
                    error: function () { //失败 
                        $("body").Alert("加载失败");
                    },
                    success: function (msg) { //成功 
                        dialog.find(".modal-body").html(msg);
                        if (typeof (modaloption.callback) === "function") {
                            modaloption.callback.call();
                        }
                        dialog.modal("show");
                    }
                })

            } else if (modaloption.div != '') {
                dialog.find(".modal-body").append($(modaloption.div)[0]);
                dialog.modal("show");
            }
            var buttons = modaloption.buttons;
            dialog.find(".modal-footer").show();
            dialog.on('hidden.bs.modal', function (e) {
                // do something...
                dialog.remove();
            })
            if (buttons.length > 1) {
                dialog.find(".modal-footer button").unbind("click");
                if (buttons[0].text != null) {
                    dialog.find(".modal-footer button").eq(0).text(buttons[0].text).bind("click", function () {
                        dialog.modal("hide");
                        if (typeof (buttons[0].success) === "function") {
                            buttons[0].success.call()
                        };
                    })
                } else {
                    dialog.find(".modal-footer button").eq(0).bind("click", function () {
                        dialog.modal("hide");
                        if (typeof (buttons[0].success) === "function") {
                            buttons[0].success.call()
                        };
                    })
                }
                if (buttons[1].text != null) {
                    dialog.find(".modal-footer button").eq(1).text(buttons[1].text).bind("click", function () {
                        if (typeof (buttons[1].success) === "function") {
                            buttons[1].success.call()
                        };
                    });
                } else {
                    dialog.find(".modal-footer button").eq(1).bind("click", function () {

                        if (typeof (buttons[1].success) === "function") {
                            buttons[1].success.call()
                        };
                    });
                }
            }
            if (buttons.length == 1) {
                dialog.find(".modal-footer button").unbind("click").remove();
                $("<button type=\"button\" class=\"btn btn-info\" >" + buttons[0].text + "</button>").bind("click", function () {
                    dialog.modal("hide");
                    if (typeof (buttons[0].success) === "function") {
                        buttons[0].success.call()
                    };
                }).appendTo(dialog.find(".modal-footer"));

            }
            if (buttons.length == 0) {
                dialog.find(".modal-footer").hide();
            }
            return dialog;
        },
        _successHtml: '<div class="alert alert-success alert-block fade in alert-dismissable" role="dialog">' +
                        '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>' +
                        '<strong>成功!</strong><span> 成功信息内容<span>' +
                        '<a href="#fakelink" class="alert-link">成功链接</a>' +
                    '</div>',
        Success: function (message, options) {
            methods.Notify(message, 'top-right', '5000', 'success', 'fa-check', true)
        },
        _errorHtml: '<div class="alert alert-danger alert-block fade in alert-dismissable" role="dialog">' +
                        '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>' +
                        '<strong>出错!</strong><span> 成功信息内容<span>' +

                    '</div>',
        Error: function (message, options) {
            methods.Notify(message, 'top-right', '5000', 'danger', 'fa-times', true)
        },
        _infoHtml: '<div class="alert alert-info alert-block fade in alert-dismissable" role="dialog">' +
                        '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>' +
                        '<strong>信息!</strong><span> <span>' +

                    '</div>',
        Info: function (message, options) {
            return this.each(function () {
                var infodialog = $(methods._infoHtml).appendTo("body")
                infodialog.find("span").text(message);
                infodialog.modal("show");
                setTimeout(function () { infodialog.modal("hide") }, 5000)
            })
        },
        _warningHtml: '<div class="alert alert-warning alert-block fade in alert-dismissable" role="dialog">' +
                        '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">×</button>' +
                        '<strong>警告!</strong><span> <span>' +

                    '</div>',
        Warning: function (message, options) {
            methods.Notify(message, 'top-right', '5000', 'warning', 'fa-warning', true)
        },


        Notify: function (message, position, timeout, theme, icon, closable) {
            toastr.options.positionClass = 'toast-' + position;
            toastr.options.extendedTimeOut = 0; //1000;
            toastr.options.timeOut = timeout;
            toastr.options.closeButton = closable;
            toastr.options.iconClass = icon + ' toast-' + theme;
            toastr['custom'](message);
        }


    }
    $.fn.Alert = function () {
        methods.Alert.call(this, arguments[0],arguments[1]);
    }
    $.fn.Confirm = function () {
        methods.Confirm.call(this, arguments[0], arguments[1], arguments[2]);
    }
    $.fn.Confirm2 = function () {
        methods.Confirm2.call(this, arguments[0], arguments[1], arguments[2]);
    }
    $.fn.Dialog = function () {
        return methods.Dialog.call(this, arguments[0]);
    }
    $.fn.LinkDialog = function () {
        return methods.LinkDialog.call(this, arguments[0]);
    }
    $.fn.ContentDialog = function () {
        return methods.ContentDialog.call(this, arguments[0]);
    }
    $.fn.TagDialog = function () {
        return methods.TagDialog.call(this, arguments[0]);
    }
    $.fn.SliderDialog = function () {
        return methods.SliderDialog.call(this, arguments[0]);
    }
    $.fn.Success = function () {
        methods.Success.call(this, arguments[0]);
    }
    $.fn.Error = function () {
        methods.Error.call(this, arguments[0]);
    }
    $.fn.Success2 = function () {
        methods.Success2.call(this, arguments[0], arguments[1], arguments[2]);
    }
    $.fn.Error2 = function () {
        methods.Error2.call(this, arguments[0], arguments[1], arguments[2]);
    }
    $.fn.Info = function () {
        methods.Info.call(this, arguments[0]);
    }
    $.fn.Warning = function () {
        methods.Warning.call(this, arguments[0]);
    }
    $.fn.Notify = function () {
        methods.Notify.call(this, arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
    }
})(jQuery);