<?php
	include 'conn.php';
	
	$pro_id = $_GET['add_cart'];
	$pro_qty = $_GET['qty'];
	$uid = $_GET['uID'];
	$data = array();
	
	$check_products = "select * from cart where pro_id='$pro_id' AND User_ID='$uid'";
	$run_check = mysqli_query($link,$check_products);

	if(mysqli_num_rows($run_check)>0) {
		$data['success'] = true;	
	}
	else{
		$insert_products = "insert into cart (pro_id,User_ID,qty) values ('$pro_id','$uid','$pro_qty')";
		$run_insert = mysqli_query($link,$insert_products);
		if($run_insert) {
			$data['success'] = false;
		}
		else {
        	echo "Error getting data : ".$pro_id.mysqli_error($link);
    	}
	}
	header('Content-type: application/json');
	echo json_encode($data);
    mysqli_close($link);
?>