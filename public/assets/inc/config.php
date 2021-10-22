<?PHP
$site_url="http://localhost";

if(!defined('DIRECT'))
{
	header("Location: $site_url/maintenance.php");
	exit;
}


define("db_host","localhost");
define("db_user","root");
define("db_pass","");
define("db_name","cloud");



$connect=new mysqli(db_host,db_user,db_pass,db_name);
if($connect->connect_error)
	echo("error connecting");


?>