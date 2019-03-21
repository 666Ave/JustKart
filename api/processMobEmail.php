<?php
	include 'conn.php';
	$data = array();
	$_POST = json_decode(file_get_contents("php://input"), true);
  $mobile = $_POST['mobile'];
	$email = $_POST['email'];
    $uid = $_POST['userID'];

    $update_mobemail = "update user set Mobile_no='$mobile',Email_address='$email' where User_ID='$uid'";
    $run_mobemail = mysqli_query($link,$update_mobemail);

    if($run_mobemail) {
        $data['message']  = "Mobile And Email Updated!";
    }
    else {
        $data['message']  = "Failed to update...Please try again.";
    }

	header('Content-type: application/json');
	echo json_encode($data);
    mysqli_close($link);
?>
