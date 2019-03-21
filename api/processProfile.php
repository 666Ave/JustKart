<?php
	include 'conn.php';
	$data = array();
	$_POST = json_decode(file_get_contents("php://input"), true);
	$fName = $_POST['fName'];
    $lName = $_POST['lName'];
    $gender = $_POST['gender'];
    $uid = $_POST['userID'];

	$update_profile = "update user set fName='$fName', lName='$lName', Gender='$gender' where User_ID='$uid'";
	$run_profile = mysqli_query($link,$update_profile);

	if($run_profile) {
		$data['success'] = true;
		$data['message']  = "Profile Updated!";
	}
	else {
		$data['success'] = false;
		$data['message']  = "Failed to update...Please try again.";
	}

	header('Content-type: application/json');
	echo json_encode($data);
    mysqli_close($link);
?>
