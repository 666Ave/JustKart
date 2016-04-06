<?php
    include 'conn.php';
    if(isset($_POST['insert_post'])) {
        $product_title = $_POST['product_title'];
        $product_cat = $_POST['product_cat'];
        $product_brand = $_POST['product_brand'];
        $product_price = $_POST['product_price'];
        $product_desc = $_POST['product_desc'];
		$time_added = date("Y-m-d h:i:s a");
        $product_keywords = $_POST['product_keywords'];
        $shop_id = $_POST['shop_id'];
        $launch_date = $_POST['launch_date'];
        $product_image = $_FILES['product_image']['name'];
        $product_image_tmp = $_FILES['product_image']['tmp_name'];
        $product_image_location = "../images/products/$product_image";
        
        move_uploaded_file($product_image_tmp,$product_image_location); 

        $insert_product_old = "insert into products (product_cat,product_brand,product_title,product_price,product_descrp,product_image,time_added,product_keywords) values ('$product_cat','$product_brand','$product_title','$product_price','$product_desc','$product_image','$time_added','$product_keywords')";
        $insert_product_new = filter_var($insert_product_old, FILTER_SANITIZE_STRING);
        
        $run_product = mysqli_query($link,$insert_product_new);
        if($run_product){
            echo "Data added successfully.";
        }
        else{
            echo "Error occured while writing the product info : ".$insert_product_new.mysqli_error($link);
        }
    }
    mysqli_close($link);
?>