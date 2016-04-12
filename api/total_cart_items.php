<?php
    include 'conn.php';

	$uid = $_GET['uID'];

    $get_total_items = "SELECT * FROM cart where User_ID='$uid' AND expired=0";
    $run_total_items = mysqli_query($link,$get_total_items);
    if($run_total_items) {
		$total_items = mysqli_num_rows($run_total_items);
		echo $total_items;
    }
    else {
        echo "Error getting data : ".mysqli_error($link);
    }
    mysqli_close($link);
?>