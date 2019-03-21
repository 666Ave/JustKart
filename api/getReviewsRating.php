<?php
    include 'conn.php';
    $uid=$_GET['uID'];
    $get_reviews = "SELECT * FROM reviews where review_userID='$uid'";
    $run_reviews = mysqli_query($link,$get_reviews);
    if($run_reviews) {
        $reviews = array();
        $get_user = "SELECT * FROM user where User_ID='$uid'";
        $run_user = mysqli_query($link,$get_user);
        $row2 = mysqli_fetch_assoc($run_user);
        $username = $row2['fName']." ".$row2['lName'];
        while($row = mysqli_fetch_assoc($run_reviews)) {
            $pid = $row['pro_ID'];

            $get_product = "SELECT * FROM products where product_id='$pid'";
            $run_product = mysqli_query($link,$get_product);
            $row3 = mysqli_fetch_assoc($run_product);

			array_push($reviews,array(
				'review_title' => $row['review_title'],
        'product_title'=> $row3['product_title'],
        'product_id'=> $pid,
				'user_name' => $username,
				'review_content' => $row['review_content'],
				'review_date' => strtotime($row['review_date']),
        'rating' => $row['rating']
			));
		}
        header('Content-type: application/json');
        echo json_encode($reviews);
    }
    else {
        echo "Error getting data : ".mysqli_error($link);
    }
    mysqli_close($link);
?>
