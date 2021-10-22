<?php
define("DIRECT",true);
include_once "functions.php";

if(isset($_POST['type']))
	$type=$_POST['type'];
else
	out();


if($type=="signin"){
	$user=$_POST['username'];
	$pass=$_POST['password'];
	
	signin($user,$pass);
}else
	out();





?>