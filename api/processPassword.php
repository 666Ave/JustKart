<?php
	include 'conn.php';
	$data = array();
	$_POST = json_decode(file_get_contents("php://input"), true);
  $oldpass = $_POST['oldpassword'];
	$pass = $_POST['password'];
    $uid = $_POST['userID'];

    $get_password = "select * from user where User_ID='$uid'";
	$run_password = mysqli_query($link,$get_password);
    $row = mysqli_fetch_assoc($run_password);

    if($row['Password']==$oldpass){
        $update_password = "update user set Password='$pass' where User_ID='$uid'";
        $run_password2 = mysqli_query($link,$update_password);

        if($run_password2) {
            $data['message']  = "Password Updated!";
        }
        else {
            $data['message']  = "Failed to update...Please try again.";
        }
    }
    else {
        $data['message']  = "The current Password entered is wrong.";
    }

	header('Content-type: application/json');
	echo json_encode($data);
    mysqli_close($link);
?>
