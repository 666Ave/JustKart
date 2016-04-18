<?php
	include 'conn.php';
	
	$user_id = $_GET['userid'];

	$delete_user = "update users set Active=0 where User_id='$user_id'";
	$run_delete = mysqli_query($link,$delete_user);

	if($run_delete) {
		echo "User deactivated succefully!";
	}
	else {
		echo "Error getting data : ".$pro_id.mysqli_error($link);
	}
    mysqli_close($link);
?>