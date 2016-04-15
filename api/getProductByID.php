<?php
	session_start();
    include 'conn.php';
    $pid=$_GET['pid'];
    $get_products = "SELECT * FROM products where product_id='$pid'";
    $run_products = mysqli_query($link,$get_products);
    if($run_products) {
        $products = array();
        while($row = mysqli_fetch_assoc($run_products)) {
			$products[] = array(
				'product_id' => $row['product_id'],
                'shop_id' => $row['shop_id'],
				'product_cat' => $row['product_cat'],
				'product_brand' => $row['product_brand'],
				'product_title' => $row['product_title'],
				'product_price' => $row['product_price'],
				'product_descrp' => $row['product_descrp'],
				'product_image' => $row['product_image'],
				'product_keywords' => $row['product_keywords']
			);
		}
		//For storing recently viewed items
		if(!$_SESSION['recent']){ 
			$temp[] = $products;
			$_SESSION['recent'] = $temp;
		}
		else{
			$ch = 0;
			$temp = $_SESSION['recent'];
			for($i=0; $i<sizeof($temp); $i++) {
				if($temp[$i][0]['product_id'] == $products[0]['product_id']){
				 	$ch = 1;
					break;
				}
			}
			if($ch!==1){
				array_push($temp,$products);
				$_SESSION['recent'] = $temp;
			}
		}//end of the storing items
		
        header('Content-type: application/json');
        echo json_encode($products);
    }
    else {
        echo "Error getting data : ".mysqli_error($link);
    }
    mysqli_close($link);
?>