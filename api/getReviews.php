<?php
    include 'conn.php';
    $pid=$_GET['pid'];
    $get_reviews = "SELECT * FROM reviews where pro_ID='$pid'";
    $run_reviews = mysqli_query($link,$get_reviews);
    if($run_reviews) {
        $reviews = array();
        while($row = mysqli_fetch_assoc($run_reviews)) {
            $uid = $row['review_userID'];
            $get_user = "SELECT * FROM user where User_ID='$uid'";
            $run_user = mysqli_query($link,$get_user);
            $row2 = mysqli_fetch_assoc($run_user);
			$reviews[] = array(
				'review_title' => $row['review_title'],
                'user_ID' => $uid,
				'user_name' => $row2['fName']." ".$row2['lName'],
				'review_content' => $row['review_content'],
				'review_date' => strtotime($row['review_date']),
                'rating' => $row['rating']
			);
		}	
        header('Content-type: application/json');
        echo json_encode($reviews);
    }
    else {
        echo "Error getting data : ".mysqli_error($link);
    }
    mysqli_close($link);
?>