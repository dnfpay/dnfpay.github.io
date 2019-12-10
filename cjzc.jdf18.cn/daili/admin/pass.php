<?php
/**
 * 修改信息
**/
$mod='blank';
include("../api.inc.php");
$title='修改信息';
include './head.php';
if($islogin==1){}else exit("<script language='javascript'>window.location.href='./login.php';</script>");
?>
  <nav class="navbar navbar-fixed-top navbar-default">
    <div class="container">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
          <span class="sr-only">导航按钮</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="./">代理平台</a>
      </div><!-- /.navbar-header -->
      <div id="navbar" class="collapse navbar-collapse">
        <ul class="nav navbar-nav navbar-right">
          <li class="active">
            <a href="./"><span class="glyphicon glyphicon-user"></span> 平台首页</a>
          </li>
          <li>
            <a href="#" class="dropdown-toggle" data-toggle="dropdown"><span class="glyphicon glyphicon-cloud"></span> 代理管理<b class="caret"></b></a>
            <ul class="dropdown-menu">
              <li><a href="./userlist.php">代理列表</a></li>
              <li><a href="./adduser.php">添加代理</a><li>
            </ul>
          </li>
          <li><a href="./login.php?logout"><span class="glyphicon glyphicon-log-out"></span> 退出登陆</a></li>
        </ul>
      </div><!-- /.navbar-collapse -->
    </div><!-- /.container -->
  </nav><!-- /.navbar -->
<div class="container" style="padding-top:70px;">
    <div class="col-xs-12 col-sm-10 col-lg-8 center-block" style="float: none;">
<?php
if($udata['active']==0) {
	showmsg('您的账号没有权限使用此功能',3);
	exit;
}
if(isset($_POST['submit'])) {
$user=daddslashes($_POST['user']);
$pass=daddslashes($_POST['pass']);
$sql="update `auth_user` set `user` ='{$user}' where `uid`='{$udata['uid']}'";
if(!empty($pass))$DB->query("update auth_user set pass='$pass' where uid='{$udata['uid']}'");
if($DB->query($sql)){
	setcookie("admin_token", "", time() - 604800);
	@header('Content-Type: text/html; charset=UTF-8');
	$city=get_ip_city($clientip);
	$czip=($udata['dlip']);
	$user=($udata['user']);
	$DB->query("insert into `auth_log` (`user`,`type`,`date`,`city`,`czip`,`data`) values ('".$user."','修改密码','".$date."','".$city."','".$czip."','原密码".$pass."|新密码".$udata['pass']."')");
	showmsg("修改成功！",1);
}else{
	showmsg('修改失败！<br/>'.$DB->error(),4,$_POST['backurl']);
	exit();
	}
}else{
echo'<div class="panel panel-primary"><div class="panel-heading"><h3 class="panel-title">'.$title.'</h3></div><div class="panel-body"><form action="./pass.php" method="post" class="form-horizontal" role="form">';
echo'<div class="input-group"><span class="input-group-addon"><span class="glyphicon glyphicon-user"></span></span><input type="text" name="user" value="'.$udata['user'].'" class="form-control" placeholder="新账号（不修改请留空）"></div><br/>';
echo'<div class="input-group"><span class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></span><input type="text" name="pass" value="" class="form-control" placeholder="新密码（不修改请留空）"></div><br/>';
echo'<div class="form-group"><div class="col-xs-12"><input type="submit" name="submit" value="修改" class="btn btn-primary form-control"/></div></div></form></div></div></div></div>';
}
?>