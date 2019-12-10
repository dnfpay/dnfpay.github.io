// show_hide_topBigBlock
function s_h_tb(id) {
	$("#"+id).toggle();
}


$('.go').on('click',function(){
	$('html,body').animate({'scrollTop':0},400);
});


$(function(){
    var m_st, m_po = 10; //滚动到600像素时显示
    $(window).scroll(
        function () {
            m_st = Math.max(document.body.scrollTop || document.documentElement.scrollTop);
            if (m_st > m_po) {
                $(".goTop").slideDown(300);
            }else{
                $(".goTop").slideUp(300);
            }
        }) 
});