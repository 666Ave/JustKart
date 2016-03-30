<?php
    include 'conn.php';

	$uid = $_GET['uID'];

    $get_order = "SELECT * FROM orders where User_ID ='$uid'";
    $run_order = mysqli_query($link,$get_order);
    if($run_order) {
        if(mysqli_num_rows($run_order)>0){
			$products = array();
            while($row = mysqli_fetch_assoc($run_order)) {
                $pro_id = $row['pro_id'];
				$get_order_items = "SELECT * FROM products where product_id='$pro_id'";
				$run_order_items = mysqli_query($link,$get_order_items);
				$product = array();
				while($row2 = mysqli_fetch_assoc($run_order_items)) {
					$product[] = array(
						'product_id' => $row2['product_id'],
						'product_title' => $row2['product_title'],
						'product_image' => $row2['product_image']
					);
					$products = array_merge($products,$product);
				}
			}
			header('Content-type: application/json');
			echo json_encode($products);
		}
    }
    else {
        echo "Error getting data : ".mysqli_error($link);
    }
    mysqli_close($link);
?>