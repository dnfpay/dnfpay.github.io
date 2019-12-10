//客服漂浮代码
taokfe=function (id,_top,_right){
	var me=id.charAt?document.getElementById(id):id, d1=document.body, d2=document.documentElement;
	//d1.style.height=d2.style.height='100%';
	me.style.top=_top?_top+'px':0;me.style.right=_right+"px";//[(_left>0?'left':'left')]=_left?Math.abs(_left)+'px':0;
	me.style.position='absolute';
	setInterval(function (){me.style.top=parseInt(me.style.top)+(Math.max(d1.scrollTop,d2.scrollTop)+_top-parseInt(me.style.top))*0.1+'px';},10+parseInt(Math.random()*20));
	return arguments.callee;
};

$(function(){
	//alert('aaaaaaaaaaa');

if($("#qqfloat").length>0){		
	taokfe('qqfloat',150,0);//漂浮客服实例化	
		
	var sl=$(this).find("#ykfColseBox");
	var zk=$(this).find("#ykfOpenBox");
	$("#ykfCloseBtn").click(function(){
		zk.hide(200);sl.delay(200).show(200);
	})
	sl.click(function(){
		sl.hide(200);zk.delay(200).show(200);	
	})	

}
})
