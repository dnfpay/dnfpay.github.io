$(function(){
	$("#prev_btn").click(function(){
		var win = $(window);
		var win_h = win.height();
		var scroll_t = win.scrollTop();
		if(scroll_t != 0){
			if(scroll_t <= win_h){
				$("body,html").animate({"scrollTop":0});
			}else{
				$("body,html").animate({"scrollTop":scroll_t-win_h});
			}
		}
	})
	$("#next_btn").click(function(){
		var win = $(window);
		var win_h = win.height();
		var scroll_t = win.scrollTop();
		$("body,html").animate({"scrollTop":scroll_t+win_h});
	})
	// 切换侧栏显示或隐藏
	$("#state_btn").click(function(){
		var t = $(this);
		var t_state = parseInt($(".sidebar2_list").css("right"));
		if(t_state == 0){
			$(".sidebar2_list").animate({"right":"-50px"},function(){
				t.addClass("cur");
			})
		}else{
			$(".sidebar2_list").animate({"right":"0"},function(){
				t.removeClass("cur");
			})
		}
	})
	// 显示详细
	$(".function_list .list").hover(function(){
		var t = $(this).find(".alt_c");
		var t_right = t.width();
		if(!t.is(":animated")){ 
			$(this).find(".alt_c").animate({"right":"50","opacity":"1"});
		}else{
			t.stop(true,true);
			$(this).find(".alt_c").css({"right":-t_right,"opacity":"0"});
			$(this).find(".alt_c").animate({"right":"50","opacity":"1"});
		}
	},function(){
		var t = $(this).find(".alt_c");
		var t_right = t.width();
		t.animate({"right":-t_right,"opacity":"0"});
	})
	// 计算客服电话数量
	var li_length = $(".lxfs_list li").length;
	if(li_length == 1){
		$(".lxfs_qq").css("top","-22px");
	}else if(li_length == 2){
		$(".lxfs_qq").css("top","-50px");
	}
})