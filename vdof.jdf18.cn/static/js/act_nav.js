var g_isFavorActFlag=false,_tcss_act=typeof(g_favorActId) != "undefined"?'act'+g_favorActId:'undefined';;//�Ƿ��ղع��Ļ��0,δ�ղ�;1,���ղء�

//ҳ�洦�Ѷ���ID����g_favorActId�����磺var g_favorActId=15517;

function _chkCommonCfg(callbackFunc){

    if(typeof(g_favorActId) == "undefined"){
        //alert("�ûIDδ����!");
        return;
    }

    callbackFunc();
}

//////�ж��Ƿ��ղع��û//////
function _chkIsFavorAct(){
    _chkCommonCfg(_doChkIsFavorAct);
}

function _doChkIsFavorAct(){
    var url = "//apps.game.qq.com/dnf/dnfPageEdit/FavoriteAct.php?r="+Math.random()
        +"&cmd=chkIsFavoriteAct&iActId="+g_favorActId;

    _loadjs(url, function() {

        var retJson = RST_FavoriteAct;
        if (typeof (retJson) == "undefined" || retJson == null){
            alert("��������������Ժ����ԣ�");
            return;
        }

        if(0 != retJson.ret){
            //alert(retJson.msg);
            return;
        }

        g_isFavorActFlag = retJson.msg;

        _showActFavorStatus();

    }, function() {
        alert('�ܱ�Ǹ�����緱æ�����Ժ����ԣ�');
    });
}

////////////�����������ղػ�ȡ���ղ�///////////
function _changeFavorStatus(){

    LoginManager.checkLogin(function(){

        if(g_isFavorActFlag){
            g_isFavorActFlag=false;
            pgvSendClick({hottag:'act.actnav.'+_tcss_act+'.favourite'});
        }else{
            g_isFavorActFlag=true;
            pgvSendClick({hottag:'act.actnav.'+_tcss_act+'.cancel'});
        }

        _saveFavorAct();

    },function(){
        LoginManager.login();
        pgvSendClick({hottag:'act.actnav.'+_tcss_act+'.unlogin'});
    });
}

function _saveFavorAct(){

    _chkCommonCfg(_doSaveFavorAct);
}

function _doSaveFavorAct(){

    var cmdType= (g_isFavorActFlag?"setFavoriteAct":"delFavoriteAct");
    var url = "//apps.game.qq.com/dnf/dnfPageEdit/FavoriteAct.php?r="+Math.random()
        +"&cmd="+cmdType+"&iActId="+g_favorActId;

    _loadjs(url, function() {

        var retJson = RST_FavoriteAct;
        if (typeof (retJson) == "undefined" || retJson == null){
            alert("��������������Ժ����ԣ�");
            return;
        }

        if(0 != retJson.ret){
            alert(retJson.msg);
            return;
        }

        var alertMsg = (g_isFavorActFlag?"�ղسɹ��������������Ĳ鿴�ղصĻ��":"ȡ���ɹ���");

        alert(alertMsg);

        _showActFavorStatus();

    }, function() {
        alert('�ܱ�Ǹ�����緱æ�����Ժ����ԣ�');
    });
}

////չʾҳ���ղء�δ�ղص�Ч��////
function _showActFavorStatus(){
    var favourite=document.getElementById("_favourite");

    if(g_isFavorActFlag){//���ղ�
        favourite.className="_ico2";
        favourite.innerHTML="ȡ��";
    }else{//δ�ղ�
        favourite.className="_ico1";
        favourite.innerHTML="�ղ�";
    }
};

function _subscribe(){if(LoginManager.isLogin()){doReg(13343);}else{LoginManager.login();};pgvSendClick({hottag:'act.actnav.'+_tcss_act+'.subscribe'});};_qqshare=function(){window.open('//connect.qq.com/widget/shareqq/index.html?url='+location.href+'&desc=&title=&summary=&pics=&flash=&site=&style=201&width=32&height=32&showcount=');pgvSendClick({hottag:'act.actnav.'+_tcss_act+'.qqshare'});};
function _delay_js(url){var type=url.split("."),file=type[type.length-1];if(file=="css"){var obj=document.createElement("link"),lnk="href",tp="text/css";obj.setAttribute("rel","stylesheet");}else var obj=document.createElement("script"),lnk="src",tp="text/javascript";obj.setAttribute(lnk,url);obj.setAttribute("type",tp);file=="css"?document.getElementsByTagName("head")[0].appendChild(obj):document.body.appendChild(obj);return obj;};
function _loadjs(url,succ,v){var elem=_delay_js(url);if((navigator.userAgent.indexOf('MSIE')==-1)?false:true){elem.onreadystatechange=function(){if(this.readyState&&this.readyState=="loading") return;else succ(v);};}else elem.onload=function(){succ(v);};elem.onerror=function(){};};

_dnfnav = (function() {
var _nav={_body:document.body,_head:document.getElementsByTagName("head")[0],_first:document.body.firstChild,isie6:function(){return(/MSIE 6.0/ig.test(navigator.appVersion))},isie:function(){return navigator.userAgent.indexOf("MSIE")!=-1},elem:function(o){return document.createElement(o)},id:function(o){return document.getElementById(o)},showNav:function(_html,_css){if(document.getElementsByTagName("style").length==0){if(_nav.isie()){document.createStyleSheet()}else{_nav._head.appendChild(elem("style"))}};var _style=document.getElementsByTagName("style")[0];if(_nav.isie()){_style.styleSheet.cssText+=_css}else{_style.appendChild(document.createTextNode(_css))}var _navbox=_nav.elem("div");_navbox.className="dnfact_navbg";_navbox.innerHTML=_html;_nav._body.insertBefore(_navbox,_nav._first)},_html:"",_css:""};_nav._body.style.cssText="background-position:50% 130px;";
    var _navdata=[
		{link:'https://dnf.qq.com/cp/a20190924gift/',title:'��������������',title2:'˫����+˫����'},
		{link:'https://dnf.qq.com/cp/a20190924regress/',title:'�ع���ʿ�ͺ���',title2:'����װ��������Ӯ'},
		{link:'https://dnf.qq.com/cp/a20191017sign/',title:'ÿ��ǩ���ú���',title2:'װ������ȯ�ڵ���'},
		{link:'https://dnf.qq.com/cp/a20191017challenge/',title:'���ǿ���Ԩ����ս',title2:'���˵���Ʊ������'},
		{link:'https://dnf.qq.com/cp/a20191017plan/',title:'װ����ǿ��ս�ƻ�',title2:'����ǿ������е�����'},
		{link:'https://dnf.qq.com/cp/a20191017daphne/',title:'�ͷ�����������ӭ',title2:'��ֵ��ʻ�ɴ����'},
		{link:'https://dnf.qq.com/cp/a20191017integral/',title:'�����̵�',title2:'��ʱ���봿����������'},
		{link:'https://dnf.qq.com/cp/a20191017box/',title:'ʮ��ħ��',title2:'�����������������ȯ'},
		//{link:'https://dnf.qq.com/cp/a20190221box/',title:'ʷʫ����˫�ػ���',title2:'���ڶ���ħ��'},
		//{link:'http://dnf.qq.com/cp/a20181101single/',title:'�µ���ʿ���µ�',title2:'+11ǿ��һ����ս'}
        ],//���ӵ�����ť�������ı����鳤�ȼ���
        navwidth=1080;
        _nav._css='.dnfact_navbg {width:100%;min-width:1380px;height:85px;padding-top:3px;background:#171B24 url(//ossweb-img.qq.com/images/dnf/web2015/actnav.png) repeat-x;}.dnfact_nav {width:1190px;margin:0 auto;overflow:hidden;}.dnfact_nav a,.dnfact_nav a:hover{text-decoration:none;}._act_nav {width:1080px;float:left;margin-left:-2px;}._act_nav li{float:left;height:85px;width:'+(navwidth/_navdata.length)+'px;overflow:hidden;background:#171B24 url(//ossweb-img.qq.com/images/dnf/web2015/actnav.png) no-repeat 0 -297px;}._act_nav li a{display:block;height:65px;padding:20px 0 0 6px;white-space:nowrap;color:#767a82;font-size:12px;font-family:΢���ź�;margin-left:2px;}._act_nav li strong{display:block;font-weight:normal;font-size:14px;margin-bottom:5px;color:#A9A9A9;font-weight:bold;}._act_nav li a:hover{color:#fef9c3;}._act_nav li a:hover strong{color:#fef9c3;}._act_nav .s,._act_nav li a:hover{background:#171B24 url(//ossweb-img.qq.com/images/dnf/web2015/actnav.png) repeat-x 0 -91px;}._act_nav .s a,._act_nav .s strong{color:#fef9c3;}._act_btn {float:left;width:90px;padding:8px 9px 0 13px;}._act_btn li {padding:4px 0;}._act_btn a {display:block;width:90px;height:26px;line-height:25px;text-align:center;background:#e4c8a5;border-radius:2px;color:#17181c;}._user_info {float:left;width:190px;font-size:12px;}._user_info p {padding:10px 0;line-height:22px;color:#c1c1c1;text-align:center;}._user_info p a {color:#797979;}._user_info p a:hover {color:#fef9c3;}._user_info ul {height:30px;border-radius:15px;background:#23242c;width:100%;overflow:hidden;}._user_info li {float:left;width:57px;padding:5px 6px 0 2px;margin-left:-2px;display:inline;height:30px;background:url(//ossweb-img.qq.com/images/dnf/web2015/actnav.png) no-repeat 0 -267px;}._user_info li a {display:block;width:57px;height:20px;line-height:20px;background-image:url(//ossweb-img.qq.com/images/dnf/web2015/actnav.png);background-repeat:no-repeat;text-indent:28px;color:#e4c8a5;}._ico1 {background-position:10px -206px;}._ico2 {background-position:10px -185px;}._ico3 {background-position:10px -224px;}._ico4 {background-position:10px -245px;}';
        _nav._html='<div class="dnfact_nav"><ul class="_act_nav">';
        for(i=0;i<_navdata.length;i++){
            _nav._html+='<li'+(i==0?' class=""':'')+'><a href="'+_navdata[i].link+'" target="_blank"><strong>'+_navdata[i].title+'</strong>'+_navdata[i].title2+'</a></li>';
        }
        _nav._html+='</ul><ul class="_act_btn"><li><a href="https://dnf.qq.com/act.shtml" target="_blank">�����</a></li><li><a href="https://dnf.qq.com/v/" target="_blank">��Ƶ����</a></li></ul></div>';
		//<div class="_user_info"><p id="unlogin">��ӭ������<a href="javascript:LoginManager.login();">����¼��</a></p><p id="logined" style="display:none;">��ӭ����<span id="login_qq_span"></span>��<a href="javascript:LoginManager.logout();">��ע����</a></p><ul><li><a href="javascript:_changeFavorStatus();" class="_ico1" id="_favourite">�ղ�</a></li><li><a href="javascript:_subscribe();" class="_ico3">����</a></li><li><a href="javascript:_qqshare();" class="_ico4">����</a></li></ul></div>
        _nav.showNav(_nav._html,_nav._css);
})();
_delay_js("public-img.js"/*tpa=https://dnf.qq.com/cp/a20170505img/public-img.js*/);
//_delay_js("sign.js"/*tpa=https://ossweb-img.qq.com/images/comm/sign.js*/);
/*_loadjs("loginmanagerv3.js"/*tpa=https://ossweb-img.qq.com/images/js/login/loginmanagerv3.js*/,function(){
    LoginManager.checkLogin(function(){
        if($E("#login_qq_span")){$E("#login_qq_span").innerHTML = LoginManager.getUserUin();}
        _chkIsFavorAct();//�жϻ�Ƿ����ղع�
    });
});*//*  |xGv00|8c2e8ed52ac1faa9af4782a1ab6f8f67 */
/*  |xGv00|79d01e144e6ec5f4b2d516476474ba94 */