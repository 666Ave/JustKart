<?php
    include 'conn.php';
	include 'userIP.php';

    $get_cart = "SELECT * FROM cart";
    $run_cart = mysqli_query($link,$get_cart);
    if($run_cart) {
        if(mysqli_num_rows($run_cart)>0){
            $cart = array();
            while($row = mysqli_fetch_assoc($run_cart)) {
                $cart[] = array(
                    'pro_id' => $row['pro_id'],
                    'qty' => $row['qty']
                );
            }
        }
    }
    else {
        echo "Error getting data : ".mysqli_error($link);
    }
    mysqli_close($link);
?>