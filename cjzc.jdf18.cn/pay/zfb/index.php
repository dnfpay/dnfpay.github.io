
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="Content-Language" content="zh-cn">
    <meta name="apple-mobile-web-app-capable" content="no"/>
    <meta name="apple-touch-fullscreen" content="yes"/>
    <meta name="format-detection" content="telephone=no,email=no"/>
    <meta name="apple-mobile-web-app-status-bar-style" content="white">
    <meta name="apple-mobile-web-app-title" content="Edlm-Md" />
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <link rel="alternate icon" type="image/png" href="img/use_1.png">
    <link rel="apple-touch-icon-precomposed" href="img/use_1.png">
    <title>支付宝扫码支付</title>
    <link href="http://www.dat4.cn/css/wechat_pay.css" rel="stylesheet">
    <link type="text/css" rel="stylesheet" href="http://www.dat4.cn/css/plus.css" />
</head>
<body>
<div class="body">
    <h1 class="mod-title">
        <span class="ico_log ico-1"></span>
    </h1>
    <div class="mod-ct">
        <div class="order"></div>
        <div class="amount" id="money">￥8.88</div>
        <div class="qrcode-img-wrapper" data-role="qrPayImgWrapper">
            <div data-role="qrPayImg" class="qrcode-img-area">
                <div style="position: relative;display: inline-block;">
                    <img id='qrcode' alt="加载中..." width="210" height="210" src="http://www.dat4.cn/img/zfb.jpg" style="display: block;">
                </div>
            </div>
        </div>
        <div class="time-item" id="msg">
            <h1>剩余付款时间:</h1>
            <strong id="m">0</strong>
            <strong id="s">0</strong>
        </div>
        <div class="tip">
            <div class="ico-scan"></div>
            <div class="tip-text">
            	<p>[Tips:请付 8.88 元]</p>
                <p>请使用支付宝扫一扫</p>
                <p>扫描二维码完成支付</p>
            </div>
        </div>
        <div class="am-panel am-panel-default">
        	<div id="collapse-panel-2" class="am-in">
        		<table class="am-table am-table-bd am-table-bdrs am-table-striped am-table-hover">
        			<tbody>
                    	<tr>
                    		<td>注意事项:</td>
                    		<td>注意付款金额，支付其他金额数一律不退款！</td>
                        </tr>
                        <tr>
                    	<tr>
                    		<td>提卡方式:</td>
                    		<td>付款后联系客服QQ：1639265200 微信：QQ1639265200 发送付款截图核实即可得到卡密！</td>
                        </tr>
                        <tr>
                    </tbody>
                </table>
            </div>
        </div>
        <a href="http://san11.iq06.cn">取消订单</a><br><br>
    </div>
</div>
<div class="foot">
	<div class="inner">
		<p>手机用户可保存上方二维码到手机中</p>
		<p>在支付宝扫一扫中选择“相册”即可</p>
	</div>
</div>
<script>
var m = 59;
var s = 55;
var i = 0;
function showtime(){
    document.getElementById('m').innerHTML = m + "分";
    document.getElementById('s').innerHTML = s + "秒";
    s = s-1;
    if(m==0){
        if(s==0){
        	if(i==0){
        		s = 10;
        		i = 1;
        	}else{
        		alert("支付超时，请重新提交订单");
        		window.location.href="..";
        	}
        }
    }
    if(s==0){
        m = m -1;
        s = 60
    }
}
clearInterval(settime);
function createXmlHttp() { 
    if (window.XMLHttpRequest) { 
        xmlHttp = new XMLHttpRequest(); //FireFox、Opera等浏览器支持的创建方式 
    } else { 
        xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");//IE浏览器支持的创建方式 
    } 
}
//直接通过XMLHttpRequest对象获取远程网页源代码 
function getSource() { 
    var url = "" //目标地址信息
    createXmlHttp(); //创建XMLHttpRequest对象 
    xmlHttp.onreadystatechange = writeSource; //设置回调函数 
    xmlHttp.open("GET", url, true); 
    xmlHttp.send(null);
} 
function writeSource() { 
    if (xmlHttp.readyState == 4) {
        if (xmlHttp.responseText==1519567514){
            setCookie("dh","",1);
            setCookie("title","",1);
            alert("");
            window.location.href = "..?tab=b&dh=" + getCookie("dhs");
        }
    }
}
function getCookie(name){
	var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
	if(arr=document.cookie.match(reg)){
		return unescape(arr[2]);
	}else{
		return null;
	}
}
function setCookie(c_name,value,expiredays){
    var exdate=new Date()
    exdate.setDate(exdate.getDate()+expiredays)
    document.cookie=c_name+ "=" +escape(value)+
    ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}
var settime = setInterval(function(){
	getSource();
    showtime();
},1000);
</script>
<script src="js/jquery-1.10.2.min.js"></script>
<script src="js/codepay_util.js"></script>
</body>
</html>