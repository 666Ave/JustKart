<?php
	session_start();
    include 'conn.php';

    $get_products = "SELECT * FROM products where Inactive!=1";
    $run_products = mysqli_query($link,$get_products);
    if($run_products) {
        $products = array();
        while($row = mysqli_fetch_assoc($run_products)) {
			$products[] = array(
				'product_id' => $row['product_id'],
				'product_title' => $row['product_title'],
				'product_price' => $row['product_price'],
				'product_image' => $row['product_image']
			);
		}
		
        header('Content-type: application/json');
        echo json_encode($products);
    }
    else {
        echo "Error getting data : ".mysqli_error($link);
    }
    mysqli_close($link);
?>