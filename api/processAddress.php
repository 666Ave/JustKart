<?php
	include 'conn.php';
	$data = array();
	$_POST = json_decode(file_get_contents("php://input"), true);
  $address = $_POST['address'];
	$pin = $_POST['pin'];
    $uid = $_POST['userID'];

    $update_address = "update user set Address='$address',Pin_code='$pin' where User_ID='$uid'";
    $run_address = mysqli_query($link,$update_address);

    if($run_address) {
        $data['message']  = "Address Updated!";
    }
    else {
        $data['message']  = "Failed to update...Please try again.";
    }

	header('Content-type: application/json');
	echo json_encode($data);
    mysqli_close($link);
?>
