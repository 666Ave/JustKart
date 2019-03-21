<?php
	include 'conn.php';
	$data = array();
	$_POST = json_decode(file_get_contents("php://input"), true);

	$fName = $_POST['Rfname'];
	$UName = $_POST['Rusername'];
	$Password = $_POST['Rpassword'];
	$Email = $_POST['Remail'];
	$lName = $_POST['Rlname'];
	$shop_id = '0';
	$Mobile_no = $POST['Rmobno'];
	$Address = $POST['Raddress'];
	$Gender = $POST['gender'];
	$PinCode = $_POST['Rpincode'];
  $type = $_POST['type'];

	$get_reg = "insert INTO user(UName,Email_address,Password,shop_id,Mobile_no,Address,Pin_code,fName,lName,Gender,type,Active) values ('$UName','$Email','$Password','$shop_id','$Mobile_no','$Address','$PinCode','$fName','$lName','$Gender','$type',1)";
	$run_reg = mysqli_query($link,$get_reg);

	if($run_reg) {
		$data['success'] = true;
		$data['message'] = 'Success!';
	}
	else {
		$data['success'] = false;
		$data['message']  = "Invalid Expression!".mysqli_error($link);
	}

	header('Content-type: application/json');
	echo json_encode($data);
    mysqli_close($link);
?>
