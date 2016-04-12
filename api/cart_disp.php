<?php
    include 'conn.php';

	$uid = $_GET['uID'];

    $get_cart = "SELECT * FROM cart where User_ID ='$uid' AND expired=0";
    $run_cart = mysqli_query($link,$get_cart);
    if($run_cart) {
        if(mysqli_num_rows($run_cart)>0){
			$products = array();
            while($row = mysqli_fetch_assoc($run_cart)) {
                $pro_id = $row['pro_id'];
				$get_cart_items = "SELECT * FROM products where product_id='$pro_id'";
				$run_cart_items = mysqli_query($link,$get_cart_items);
				$product = array();
				while($row2 = mysqli_fetch_assoc($run_cart_items)) {
					$product[] = array(
						'product_id' => $row2['product_id'],
						'product_cat' => $row2['product_cat'],
						'product_brand' => $row2['product_brand'],
						'product_title' => $row2['product_title'],
                        'product_price' => $row2['product_price'],
			 			'product_descrp' => $row2['product_descrp'],
						'product_image' => $row2['product_image'],
						'product_keywords' => $row2['product_keywords'],
						'quantity' => $row['qty']
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