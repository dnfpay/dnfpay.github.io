<?php
/**
 * 添加代理
**/
$mod='blank';
include("../api.inc.php");
$title='添加代理';
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
if($udata['per_sq']==0) {
	showmsg('您的账号没有权限使用此功能',3);
	exit;
}
if(isset($_POST['user']) && isset($_POST['pass'])){
$user=daddslashes($_POST['user']);
$row=$DB->get_row("SELECT * FROM auth_user WHERE user='{$user}' limit 1");
if($row) {
	showmsg('用户名已存在',3);
	exit;
}
$pass=daddslashes($_POST['pass']);
$qq=daddslashes($_POST['qq']);
$per=daddslashes($_POST['per']);
if($per=="1"){
	$per_sq=0;
	$active=1;
}
	$sql="insert into `auth_user` (`user`,`pass`,`per_sq`,`qq`,`active`) values ('".$user."','".$pass."','".$per_sq."','".$qq."','".$active."')";
	$DB->query($sql);
	$city=get_ip_city($clientip);
		$DB->query("insert into `auth_log` (`uid`,`type`,`date`,`city`,`data`) values ('".$udata['user']."','添加代理','".$date."','".$city."','新用户名".$user."|授权".$per_sq."|获取".$per_db."|状态".$active."')");

exit("<script language='javascript'>alert('添加代理成功！');window.location.href='userlist.php';</script>");
} 
?>
      <div class="panel panel-primary">
        <div class="panel-heading"><h3 class="panel-title">添加代理</h3></div>
        <div class="panel-body">
          <form action="./adduser.php" method="post" class="form-horizontal" role="form">
		  <input type="hidden" name="backurl" value="<?php echo $_SERVER['HTTP_REFERER']; ?>"/>
            <div class="input-group">
              <span class="input-group-addon">用户名:</span>
              <input type="text" name="user" value="<?=@$_POST['user']?>" class="form-control" placeholder="" autocomplete="off" required/>
            </div><br/>
            <div class="input-group">
              <span class="input-group-addon">密码:</span>
              <input type="password" name="pass" value="<?=@$_POST['pass']?>" class="form-control" autocomplete="off" required/>
            </div><br/>
			 <div class="input-group">
              <span class="input-group-addon">QQ:</span>
              <input type="text" name="qq" value="<?=@$_POST['qq']?>" class="form-control" autocomplete="off" required/>
            </div><br/>
			<div class="input-group">
			  <span class="input-group-addon">权限:</span>
			  <select name="per" class="form-control">
				<?php echo $all;?>
					
					<option value="1">添加代理</option>
              </select>
            </div><br/>
            <div class="form-group">
              <div class="col-sm-12"><input type="submit" value="添加" class="btn btn-primary form-control"/></div>
            </div>
          </form>
        </div>
        <div class="panel-footer">        
        </div>
      </div>
    </div>
  </div>
