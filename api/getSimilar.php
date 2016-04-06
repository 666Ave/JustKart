<?php
    include 'conn.php';

	$pid = $_GET['pid'];
    $get_product = "SELECT * FROM products where product_id='$pid'";
    $run_product = mysqli_query($link,$get_product);
    if($run_product) {
        $row = mysqli_fetch_assoc($run_product);
        $product_brand =$row['product_brand'];
        $product_keywords =$row['product_keywords'];
        $get_products = "SELECT * FROM products where product_brand='$product_brand' AND product_id!='$pid'";
        $run_products = mysqli_query($link,$get_products);
        if($run_products){
			$products = array();
            while($row2 = mysqli_fetch_assoc($run_products)) {
				$products[] = array(
					'product_id' => $row2['product_id'],
					'product_title' => $row2['product_title'],
					'product_image' => $row2['product_image'],
                    'product_price' => $row2['product_price']
				);
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