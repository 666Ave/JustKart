<?php
    include 'conn.php';
	include 'userIP.php';

    $get_total_items = "SELECT * FROM cart where ip_addr='$user_ip'";
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