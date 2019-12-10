<?php include("api.inc.php"); ?>
<!DOCTYPE html>
<html lang="zh-cn">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="format-detection" content="telephone=no">
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <title>代理查询</title>
    <!--baidu-->
    <meta name="baidu-site-verification" content="4IPJiuihDj" />
    <!-- Bootstrap -->
    <link href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.css" rel="stylesheet">
    <script src="http://cdn.bootcss.com/jquery/1.11.3/jquery.min.js"></script>
    <script src="http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
    <!--[if lt IE 9]>
      <script src="http://cdn.bootcss.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="http://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
<script> 
function stop(){ return false; } 
document.oncontextmenu=stop; 
</script> 
<style>
body{
margin: 0 auto;
text-align: center;
}
.container {
max-width: 580px;
padding: 15px;
margin: 0 auto;
}
</style>
<body>
</head>
<body background="../root/images/fzbeijing.png">
<div class="container">    <div class="header">
<ul class="nav nav-pills pull-right" role="tablist">
<li role="presentation"><a href="/index.php">代理查询</a></li>
<li role="presentation"><a href="http://wpa.qq.com/msgrd?v=3&uin=360138338&site=qq&menu=yes">联系客服</a></li>
<li role="presentation"><a href="http://www.dat4.cn">返回首页</a></li>
</ul>
<h3 class="text-muted" align="left">代理查询</h3>
</div><hr>
<h3 class="form-signin-heading">请输入代理QQ</h3>	
<form class="form-horizontal" method="post" action="">
<input type="hidden" name="do" value="do">
<form action="?" class="form-sign" method="post">
<input type="text" class="form-control" name="qq" placeholder="比如:360138338" value=""><br>
<input type="submit" class="btn btn-primary btn-block" name="submit" value="点击查询"><br/>
<?php
if($qq=$_POST['qq']) {
	$qq=$_POST['qq'];
	$row=$DB->get_row("SELECT * FROM auth_user WHERE qq='$qq' limit 1");
	echo '<label>查询扣扣：</label>'.$dlqq.'<br>';
	if($row) {
		echo '<div class="alert alert-success">查询结果：该QQ为代理 请放心交易！</div>';
	}else{
		echo '<div class="alert alert-danger">查询结果：该QQ非代理 请停止交易！</div>';
	}
}
$DB->close();
?>
<hr>
<p style="text-align:center"><br>&copy; Powered by <a target="_blank" href="http://www.dat4.cn">绝地求生刺激战场辅助</a></p></div>
  </body>
</html>