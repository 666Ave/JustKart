<?php
    include 'conn.php';
    $brandid=$_GET['brandid'];
    $get_products = "SELECT * FROM products where product_brand='$brandid'";
    $run_products = mysqli_query($link,$get_products);
    if($run_products) {
        $products = array();
        while($row = mysqli_fetch_assoc($run_products)) {
                $products[] = array(
                    'product_id' => $row['product_id'],
                    'product_cat' => $row['product_cat'],
                    'product_brand' => $row['product_brand'],
                    'product_title' => $row['product_title'],
                    'product_price' => $row['product_price'],
                    'product_descrp' => $row['product_descrp'],
                    'product_image' => $row['product_image'],
                    'product_keywords' => $row['product_keywords']
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