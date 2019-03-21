<?php
	include 'conn.php';
	$data = array();
	$_POST = json_decode(file_get_contents("php://input"), true);
  $PID = $_POST['pID'];
	$UID = $_POST['userID'];
	$rating = $_POST['rating'];
  $title = $_POST['title'];
	$content = $_POST['content'];
  $time_added = date("Y-m-d H:i:s");

	$get_comment = "update reviews set review_title='$title',review_content='$content',review_date='$time_added',rating='$rating' where review_userID='$UID'";
	$run_comment = mysqli_query($link,$get_comment);

	if($run_comment) {
		$data['success'] = true;
		$data['message'] = 'Success!';
	}
	else {
		$data['success'] = false;
		$data['message']  = "Error!";
	}

	header('Content-type: application/json');
	echo json_encode($data);
    mysqli_close($link);
?>
