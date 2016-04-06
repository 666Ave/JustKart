<?php
	include 'conn.php';
	$data = array();
    $PID = $_POST['pID'];
	$UID = $_POST['userID'];
	$rating = $_POST['rating'];
    $title = $_POST['title'];
	$content = $_POST['content'];
    $time_added = date("Y-m-d H:i:s");

	$get_comment = "insert INTO reviews(pro_ID,review_title,review_userID,review_content,review_date,rating) values ('$PID','$title','$UID','$content','$time_added','$rating')";
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