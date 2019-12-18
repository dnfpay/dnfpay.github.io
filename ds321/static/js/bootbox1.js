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
        _successHtml: ' <div class="modal modal-tiny modal-tiny-sm fade" tabindex="-1" role="dialog" aria-hidden="true">' +
      ' <div class="modal-dialog">                                                                                                                                  ' +
      '     <div class="modal-content">                                                                                                                             ' +
      '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
      '<div class="modal-body clearfix">' +
							'<div class="modal-tiny-icon text-success">' +
								'<i class="fa fa-check-circle fa-4x"></i>' +
							'</div>' +
							'<div class="modal-tiny-container">' +
								'<div class="modal-tiny-title">操作成功！</div>' +
								'<p class="modal-tiny-int">' +

								'</p>' +
							'</div>' +
						'</div>' +
    '             <div class="modal-footer">                                                                                                                      ' +
      '                 <button type="button" id="btnOk" class="btn btn-info btn-sm" data-dismiss="modal">确定</button>                  ' +
      '             </div>                                                                                                                                          ' +
      '     </div>                                                                                                                                                  ' +
      '                                                                                                                                                             ' +
      ' </div>                                                                                                                                                       ' +
       '</div>',
        Success: function (message, options) {
            var modaloption = $.extend({}, methods.defaultDialog, options);
            var dialog = $(methods._successHtml).appendTo("body")
            if (modaloption.dropable) {
                dialog.attr("data-backdrop", "static");
            } else {
                dialog.removeAttr("data-backdrop", "static");
            }
            if (message == undefined || message == "") {
                dialog.find(".modal-body").find(".modal-tiny-int").remove();
                dialog.find(".modal-body").find(".modal-tiny-title").css("line-height", "50px");
            } else {
                dialog.find(".modal-body").find(".modal-tiny-int").html(message);
            }

            dialog.modal("show");
            dialog.on('hidden.bs.modal', function (e) {
                // do something...
                dialog.remove();
            })

            if (typeof (modaloption.callback) === "function") {
                dialog.find("#btnOk").click(function () {
                    modaloption.callback.call();
                });
                dialog.find(".close").click(function () {
                    modaloption.callback.call();
                });
            }



            return dialog;
        },
        _errorHtml: ' <div class="modal modal-tiny modal-tiny-sm fade" tabindex="-1" role="dialog" aria-hidden="true">' +
     ' <div class="modal-dialog">                                                                                                                                  ' +
     '     <div class="modal-content">                                                                                                                             ' +
     '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
     '<div class="modal-body clearfix">' +
                           '<div class="modal-tiny-icon text-success">' +
                               '<i class="fa fa-times-circle fa-4x"></i>' +
                           '</div>' +
                           '<div class="modal-tiny-container">' +
                               '<div class="modal-tiny-title">操作失败！</div>' +
                               '<p class="modal-tiny-int">' +

                               '</p>' +
                           '</div>' +
                       '</div>' +
   '             <div class="modal-footer">                                                                                                                      ' +
     '                 <button type="button" id="btnOk" class="btn btn-info btn-sm" data-dismiss="modal">确定</button>                  ' +
     '             </div>                                                                                                                                          ' +
     '     </div>                                                                                                                                                  ' +
     '                                                                                                                                                             ' +
     ' </div>                                                                                                                                                       ' +
      '</div>',
        Error: function (message, options) {
            var modaloption = $.extend({}, methods.defaultDialog, options);
            var dialog = $(methods._errorHtml).appendTo("body")
            if (modaloption.dropable) {
                dialog.attr("data-backdrop", "static");
            } else {
                dialog.removeAttr("data-backdrop", "static");
            }
            if (message == undefined || message == "") {
                dialog.find(".modal-body").find(".modal-tiny-int").remove();
                dialog.find(".modal-body").find(".modal-tiny-title").css("line-height", "50px");
            } else {
                dialog.find(".modal-body").find(".modal-tiny-int").html(message);
            }
            dialog.modal("show");
            dialog.on('hidden.bs.modal', function (e) {
                // do something...
                dialog.remove();
            })

            if (typeof (modaloption.callback) === "function") {
                dialog.find("#btnOk").click(function () {
                    modaloption.callback.call();
                });
                dialog.find(".close").click(function () {
                    modaloption.callback.call();
                });
            }

            return dialog;
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
            if (modaloption.dangers) {
                confirmdialog.find(".btn-danger").removeClass("btn-danger").addClass(modaloption.dangers.modifyClass);
                confirmdialog.find(".btn-info").on("click", function () { Func.call(this, true), confirmdialog.modal("hide"); }).end().find(".btn-default").on("click", function () { Func.call(this, false) });
            }
            if (modaloption.textwarning) {
                confirmdialog.find(".text-warning").removeClass("text-warning");
            }
            confirmdialog.on('hidden.bs.modal', function (e) {
                // do something...
                confirmdialog.remove();
            })
            if (typeof (Func) === "function") {
                confirmdialog.find(".btn-danger").on("click", function () { Func.call(this, true), confirmdialog.modal("hide"); }).end().find(".btn-default").on("click", function () { Func.call(this, false) });
            }
            confirmdialog.modal("show");
            $("body").css("padding-right", 0);
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
                        $("body").Error("加载失败");
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
        }


    }

    $.fn.Success = function () {
        methods.Success.call(this, arguments[0], arguments[1]);
    }
    $.fn.Error = function () {
        methods.Error.call(this, arguments[0], arguments[1]);
    }
    $.fn.Dialog = function () {
        return methods.Dialog.call(this, arguments[0]);
    }
    $.fn.Confirm = function () {
        methods.Confirm.call(this, arguments[0], arguments[1], arguments[2]);
    }
})(jQuery);