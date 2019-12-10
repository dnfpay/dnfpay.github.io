(function(o){if(window.attachEvent){window.attachEvent("onload",o);}else{window.addEventListener("load",o,false);};})(function(){
	var d=document,
	m=d.createElement("div"),
	r=String(new Date()).split(":")[1],
	l=function(u,y){
		var s=d.createElement(y);
		if(y=="script"){s.src=u;s.type="text/javascript";s.setAttribute("charset","gb2312");}
		else{s.href=u;s.rel="stylesheet";s.type="text/css";}
		d.getElementsByTagName("head")[0].appendChild(s);
	};

	//侧边图片
	var _side=document.createElement("div");
        _side.className="side_img";
        _side.setAttribute('style','background: url(//game.gtimg.cn/images/dnf/cp/a20170505img/side.png) no-repeat;width: 165px;height: 242px;position: fixed;bottom: 2%;left: 2%;z-index: 9999;');
        //document.body.appendChild(_side);

	//以下修改ost.css为各自产品的css地址
	l("//ossweb-img.qq.com/images/dnf/js/title/dnf.css?v="+r,"link");
	m.className="ost ost_bg";
	m.style.cssText="position:absolute;top:-500px;";
	m.innerHTML=['<ul class="ost_b">',
	//以下修改各自链接，及指定按钮统计代码（广告修改gg.js）
		'<li class="ost_i">',
			'</p>',
		'</li>',
	'</ul>'].join("");
	d.body.appendChild(m);
	d.body.style.paddingTop="42px";
	l("//game.qq.com/time/qqadv/Info_new_11370.js?v="+r,"script")
l("//ossweb-img.qq.com/images/dnf/js/title/gg.js?v="+r,"script");
});/*  |xGv00|dc6b28d04cd53da2de7d0d2a5bc8c255 */