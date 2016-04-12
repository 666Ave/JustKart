<?php
	include 'conn.php';
	
	$pro_id = $_GET['delete_cart'];
	$uid = $_GET['uID'];

	$delete_products = "update cart set expired=1 where User_ID='$uid' AND pro_id='$pro_id'";
	$run_delete = mysqli_query($link,$delete_products);

	if($run_delete) {
		echo "Item removed succefully!";
	}
	else {
		echo "Error getting data : ".$pro_id.mysqli_error($link);
	}
    mysqli_close($link);
?>