<?php
    include 'conn.php';
    $sid = $_GET['shopid'];
    $i=0;
    $ratings = 0;

    $get_shop = "SELECT * FROM shops where shop_id like '$sid'";
    $run_shop = mysqli_query($link,$get_shop);
    if($run_shop) {
        if(mysqli_num_rows($run_shop)>0){
            $row0 = mysqli_fetch_assoc($run_shop);
            $get_products = "SELECT * FROM products where shop_id='$sid' and Inactive!=1";
            $run_products = mysqli_query($link,$get_products);
            if($run_products) {
                if(mysqli_num_rows($run_products)>0){
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
                        $pid = $row['product_id'];
                        $get_reviews = "SELECT * FROM reviews where pro_ID='$pid'";
                        $run_reviews = mysqli_query($link,$get_reviews);
                        if(mysqli_num_rows($run_reviews)>0) {
                            while($row1 = mysqli_fetch_assoc($run_reviews)){
                                $ratings += $row1['rating'];
                                $i++;
                            }
                        }
                    }
                    if($i==0)
                        $total_rating = 0;
                    else
                        $total_rating = $ratings/$i;
                    $products['area_name'] = $row0['area_name'];
                    $products['owner_name'] = $row0['owner_name'];
                    $products['shop_image'] = $row0['shop_image'];
                    $products['reviews'] = $i;
                    $products['rating'] = $total_rating;
                    header('Content-type: application/json');
                    echo json_encode($products);
                }
            }
            else {
                echo "Error getting data : ".mysqli_error($link);
            }
        }
    }
    else {
        echo "Error getting data : ".mysqli_error($link);
    }
    mysqli_close($link);
?>