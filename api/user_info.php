<?php
	include 'conn.php';
	
	$uid = $_GET['uID'];
	$data = array();
	
	$check_user = "select * from user where User_ID='$uid'";
	$run_user = mysqli_query($link,$check_user);

	if($run_user) {
		$data['user'] = true;
        $row = mysqli_fetch_assoc($run_user);
        $data['fName'] = $row['fName'];
        $data['lName'] = $row['lName'];
        $data['Address'] = $row['Address'];
        $data['Pin_code'] = $row['Pin_code'];
        $data['Mobile_no'] = $row['Mobile_no'];
        $data['email'] = $row['Email_address'];
        $data['gender'] = $row['Gender'];
        $data['uname'] = $row['UName'];
	}
	else{
        $data['user'] = false;
	}
	header('Content-type: application/json');
	echo json_encode($data);
    mysqli_close($link);
?>