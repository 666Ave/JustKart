<?php
	include 'conn.php';
	include 'userIP.php';
	
	$pro_id = $_GET['add_cart'];
	$pro_qty = $_GET['qty'];

	$check_products = "select * from cart where ip_addr='$user_ip' AND pro_id='$pro_id'";
	$run_check = mysqli_query($link,$check_products);

	if(mysqli_num_rows($run_check)>0) {
		echo "Product already present in cart";	
	}
	else{
		$insert_products = "insert into cart (pro_id,ip_addr,qty) values ('$pro_id','$user_ip','$pro_qty')";
		$run_insert = mysqli_query($link,$insert_products);
		if($run_insert) {
			echo "Item added succefully!";
		}
		else {
        	echo "Error getting data : ".$pro_id.mysqli_error($link);
    	}
	}
    mysqli_close($link);
?>