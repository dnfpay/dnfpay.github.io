// JavaScript Document
$(function () {
    $("div.tab").hide(); //隐藏所有
    $("div.tabs a:first").addClass("current"); //第一个元素选中
    $("div.tab:first").show(); //第一个内容显示
	// var t = $("#intro").offset().top;

    $("div.tabs a").click(function () {
        $("div.tabs a").removeClass("current"); //将所有的tab去掉current样式
        $(".tab").hide(); //隐藏所有
        $(this).addClass("current");
        var activeTab = $(this).attr("href"); //获取div
        $(activeTab).show();
		
		$('html, body').animate({scrollTop:0}, 'fast');
				
    });
	


    //获取从url中传递的
    var url = window.location.href;
    var reg = /#.+/;
    if (reg.test(url)) {//含有#,默认为只有一个#，多个#情况不考虑 
        //隐藏所有
        $("div.tabs a").removeClass("current"); //将所有的tab去掉current样式
        $(".tab").hide(); //隐藏所有

        var href = url.split('#')[1];      
        $("div.tabs [href=#" + href + "]").addClass("current");
        $("#" + href).show();
    }
});    
 