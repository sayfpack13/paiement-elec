<?PHP
include "config.php";

if(!defined('DIRECT'))
{
	header("Location: $site_url/maintenance.php");
	exit;
}

function out(){
	header("Location: $site_url/maintenance.php");
	exit;
}


function signin($user,$pass){
	global $connect;
	$sql="select * from users where username like \"".$user."\";";
	$sql_query=mysqli_query($connect,$sql);
	
	
	if(mysqli_num_rows($sql_query)==0){
		$error['type']="username";
		$error['msg']="User doesn't exist !!";
		
		echo json_encode($error);
	}else{
		$sql="select * from users where username like \"".$user."\" and password like \"".$pass."\";";
		$sql_query=mysqli_query($connect,$sql);
		if(mysqli_num_rows($sql_query)==0){
			$error['type']="password";
			$error['msg']="Wrong password !!";
		
			echo json_encode($error);
		}
		// SUCCESS LOGIN
		else{
			if($rslt=mysqli_fetch_array($sql_query)){
				// CHECK ACCOUNT
				if($rslt['status']!="active")
					echo "Account is deleted/banned !!";
				// LOGIN ...
				else{
					updateUserSession($rslt);
				}
					
			}
			
			
		}
	}
}


function updateUserSession($rslt){
	$_SESSION['id']=$rslt['id'];	
	$_SESSION['username']=$rslt['username'];
	$_SESSION['email']=$rslt['email'];
	$_SESSION['role']=$rslt['role'];
}



function loggedIn(){
	if(isset($_SESSION['id']))
		return true;
	else
		return false;
}




?>