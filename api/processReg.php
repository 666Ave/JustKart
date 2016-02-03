<?php
	include 'conn.php';
	$data = array();
	$Name = $_POST['Rname'];
	$UName = $_POST['Rusername'];
	$Password = $_POST['Rpassword'];
	$Email = $_POST['Remail'];
	$PinCode = $_POST['Rpincode'];

	$get_reg = "insert INTO user(UName,Email_address,Password,Pin_code,Name) values ('$UName','$Email','$Password','$PinCode','$Name')";
	$run_reg = mysqli_query($link,$get_reg);

	if($run_reg) {
		$data['success'] = true;
		$data['message'] = 'Success!';
	}
	else {
		$data['success'] = false;
		$data['message']  = "Invalid Expression!";
	}

	header('Content-type: application/json');
	echo json_encode($data);
    mysqli_close($link);
?>