<?PHP
session_start();
require_once("functions.php");





$sql="SELECT * FROM `settings` LIMIT 1";
$sql_result=mysqli_query($connect,$sql);

if($row = mysqli_fetch_assoc($sql_result))
{
	$site_name=$row['site_name'];
	$site_description=$row['site_description'];
	if($row['maintenance']=="false")
		$maintenance=false;
	else
		$maintenance=true;


}




// store data into session to pass values to external loaded pages
$_SESSION['site_name']=$site_name;
$_SESSION['site_description']=$site_description;
$_SESSION['maintenance']=$maintenance;
?>