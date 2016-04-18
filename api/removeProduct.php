<?php
	include 'conn.php';
	
	$pro_id = $_GET['proid'];

	$delete_products = "update products set Inactive=1 where product_id='$pro_id'";
	$run_delete = mysqli_query($link,$delete_products);

	if($run_delete) {
		echo "Item removed succefully!";
	}
	else {
		echo "Error getting data : ".$pro_id.mysqli_error($link);
	}
    mysqli_close($link);
?>