<?php
	include 'conn.php';
	$data = array();
	$_POST = json_decode(file_get_contents("php://input"), true);
  $UName = $_POST['Lname'];
  $Password = $_POST['Lpassword'];

	$check_login = "SELECT * FROM user where UName='$UName' AND Password='$Password' AND Active=1";
	$run_login = mysqli_query($link,$check_login);

	if(mysqli_num_rows($run_login) == 1) {
		$row = mysqli_fetch_assoc($run_login);
		$data['success'] = true;
		$data['message'] = 'Success!';
		$data['user'] = $row['fName']." ".$row['lName'];
		$data['uid'] = $row['User_ID'];
    $data['uaddress'] = $row['Address'];
    $data['type'] = $row['type'];
    if($data['type'] == "seller" && $row['shop_id'])
        $data['shop_id'] = $row['shop_id'];
    else
        $data['shop_id'] = 0;
	}
	else {
		$data['success'] = false;
		$data['message']  = "Invalid UserName or Password!";
		$data['user'] = "Login";
	}

	header('Content-type: application/json');
	echo json_encode($data);
    mysqli_close($link);
?>
