<?php
	include 'conn.php';
	include 'userIP.php';
	
	$pro_id = $_GET['delete_cart'];

	$delete_products = "delete from cart where ip_addr='$user_ip' AND pro_id='$pro_id'";
	$run_delete = mysqli_query($link,$delete_products);

	if($run_delete) {
		echo "Item removed succefully!";
	}
	else {
		echo "Error getting data : ".$pro_id.mysqli_error($link);
	}
    mysqli_close($link);
?>