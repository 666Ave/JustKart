<?php
    include 'conn.php';

	$uid = $_GET['uID'];

    $get_cart = "SELECT * FROM cart where User_ID ='$uid'";
    $run_cart = mysqli_query($link,$get_cart);
    if($run_cart) {
        if(mysqli_num_rows($run_cart)>0){
			$products = array();
            while($row = mysqli_fetch_assoc($run_cart)) {
                $pro_id = $row['pro_id'];
				$put_order = "insert INTO orders(pro_id,User_ID) values ('$pro_id','$uid')";
                $run_order = mysqli_query($link,$put_order);
                $delete_products = "delete from cart where User_ID='$uid' AND pro_id='$pro_id'";
	            $run_delete = mysqli_query($link,$delete_products);
			}
			echo ("Success");
		}
    }
    else {
        echo "Error getting data : ".mysqli_error($link);
    }
    mysqli_close($link);
?>