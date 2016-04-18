<?php
    include 'conn.php';
    $loc = $_GET['loc'];
    
    $get_shop = "SELECT * FROM shops where area_name like '$loc'";
    $run_shop = mysqli_query($link,$get_shop);
    if($run_shop) {
        if(mysqli_num_rows($run_shop)>0){
            while($row = mysqli_fetch_assoc($run_shop)) {
                $shop_id = $row['shop_id'];
                $get_products = "SELECT * FROM products where shop_id='$shop_id' and Inactive!=1 order by RAND()";
                $run_products = mysqli_query($link,$get_products);
                if($run_products) {
                    if(mysqli_num_rows($run_products)>0){
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
                }
                else {
                    echo "Error getting data : ".mysqli_error($link);
                }
            }
        }
    }
    else {
        echo "Error getting data : ".mysqli_error($link);
    }
    mysqli_close($link);
?>