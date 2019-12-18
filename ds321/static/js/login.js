$(function () {
    $('.login-box,.reg-box').addClass("active");
    CanvasBG.init({
        Loc: {
            x: window.innerWidth / 2,
            y: window.innerHeight / 3.3
        },
    });
    $("input[name='RememberMe']").change(function () {
        if ($(this).is(':checked')) {
            $(this).parent(".pwcheck").find(".checkbox_no").removeClass("checkbox_no").addClass("checkbox_yes");
        } else {
            $(this).parent(".pwcheck").find(".checkbox_yes").removeClass("checkbox_yes").addClass("checkbox_no");
        }
    });

    function getmarginTop() {
        var winH = $(window).height();
        var headerH = $(".login-container").outerHeight();
        var mTop = (winH - headerH) / 2;
        $(".login-box").css("margin-top", mTop + "px");
        $(document.body).css({ "overflow-y": "hidden" });
    }
    $(window).resize(function () {
        getmarginTop();
    });
    getmarginTop();

   
});

