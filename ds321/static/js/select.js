$(document).on("click", ".mod-form-select-group", function (ev) {
    $(this).children("ul.mod-form-select-list").toggle();
}).on("click", ".mod-form-select-list-item", function (ev) {
    var value = $(this).html();
    $(this).parent().prev().children(".mod-form-select-txt").html(value);
    $(this).parent().prev().children("input").val($(this).attr("value"))
})