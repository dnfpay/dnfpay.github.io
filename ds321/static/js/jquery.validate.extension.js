jQuery.validator.addMethod("isTel", function (value, element) {
    var length = value.length;
    var mobile = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    var tel = /^(\d{3,4}-?)?\d{7,9}$/g;
    return this.optional(element) || tel.test(value) || (length == 11 && mobile.test(value));
}, "请正确填写您的联系方式");

jQuery.validator.addMethod("isCreditCard", function (value, element) {
    var length = value.length;
    var creditcard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return this.optional(element) || creditcard.test(value);
}, "请正确填写您的身份证号");
$.extend($.validator.messages, {
    required: "必填字段",
    remote: "请修正该字段",
    email: "请输入正确格式的电子邮件",
    url: "请输入合法的网址",
    date: "请输入合法的日期",
    dateISO: "请输入合法的日期.",
    number: "请输入合法的数字",
    digits: "只能输入整数",
    creditcard: "请输入合法的信用卡号",
    equalTo: "请再次输入相同的值",
    accept: "请输入拥有合法后缀名的字符串",
    maxlength: $.validator.format("请输入一个长度最多是 {0} 的字符串"),
    minlength: $.validator.format("请输入一个长度最少是 {0} 的字符串"),
    rangelength: $.validator.format("请输入一个长度介于 {0} 和 {1} 之间的字符串"),
    range: $.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),
    max: $.validator.format("请输入一个最大为 {0} 的值"),
    min: $.validator.format("请输入一个最小为 {0} 的值")
});