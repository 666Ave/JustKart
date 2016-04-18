<?php
    include 'conn.php';
    $data = array();

    $product_title = $_POST['product_title'];
    $product_cat = $_POST['product_cat'];
    $product_brand = $_POST['product_brand'];
    $product_price = $_POST['product_price'];
    $product_desc = $_POST['product_desc'];
    $time_added = date("Y-m-d h:i:s a");
    $product_keywords = $_POST['product_keywords'];
    $shop_id = $_POST['shop_id'];
    $launch_date = $_POST['dt'];
    $product_image = $_POST['product_image'];
    //$product_image_tmp = $_FILES['product_image']['tmp_name'];
    //$product_image_location = "../images/products/$product_image";

    //move_uploaded_file($product_image_tmp,$product_image_location); 

    $insert_product_old = "insert into products (product_cat,product_brand,product_title,product_price,shop_id,product_descrp,product_image,time_added,product_keywords,Inactive) values ('$product_cat','$product_brand','$product_title','$product_price','$shop_id','$product_desc','$product_image','$time_added','$product_keywords',0)";
    $insert_product_new = filter_var($insert_product_old, FILTER_SANITIZE_STRING);

    $run_product = mysqli_query($link,$insert_product_old);
    if($run_product){
        $data['success'] = true;
        $data['message']  = "Success!";
    }
    else{
        $data['success'] = false;
        $data['message']  = "Error occured while writing the product info : ".mysqli_error($link);
    }

    header('Content-type: application/json');
	echo json_encode($data);
    mysqli_close($link);
?>