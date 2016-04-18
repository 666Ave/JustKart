<?php
	include 'conn.php';
	
	$shop_id = $_GET['shopid'];

	$delete_shop = "update shops set Inactive=1 where shop_id='$shop_id'";
	$run_delete = mysqli_query($link,$delete_shop);

	if($run_delete) {
		echo "Shop removed succefully!";
	}
	else {
		echo "Error getting data : ".$pro_id.mysqli_error($link);
	}
    mysqli_close($link);
?>