<?php
	include 'conn.php';
	$data = array();
    $pass = $_POST['password'];
    $uid = $_POST['userID'];
    
    $check_login = "select * from user where User_ID='$uid' && password='$pass'";
    $run_login = mysqli_query($link,$check_login);
    if($run_login){
        $update_address = "update user set Active=0 where User_ID='$uid'";
        $run_address = mysqli_query($link,$update_address);

        if($run_address) {
            $data['success'] = true;
            $data['message']  = "This Account is now deactivated.....Redirecting to home page";
        }
        else {
            $data['success'] = false;
            $data['message']  = "Failed to deactivate...Please try again.";
        }
    }
    else{
        $data['success'] = false;
        $data['message']  = "Wrong Password!!";
    }

	header('Content-type: application/json');
	echo json_encode($data);
    mysqli_close($link);
?>