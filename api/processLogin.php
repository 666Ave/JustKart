<?php
	include 'conn.php';
	$data = array();
	$UName = $_POST['Lname'];
	$Password = $_POST['Lpassword'];

	$check_login = "SELECT * FROM user where UName='$UName' AND Password='$Password'";
	$run_login = mysqli_query($link,$check_login);

	if(mysqli_num_rows($run_login)>0) {
		$data['success'] = true;
		$data['message'] = 'Success!';
	}
	else {
		$data['success'] = false;
		$data['message']  = "Invalid UserName or Password!";
	}

	header('Content-type: application/json');
	echo json_encode($data);
    mysqli_close($link);
?>