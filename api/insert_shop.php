<?php
    include 'conn.php';
    $data = array();
    
    $user_id = $_POST['user_id'];
    $shop_name = $_POST['shop_name'];
    $area_name = $_POST['area_name'];
    $owner_name = $_POST['owner_name'];
    $shop_image = $_POST['shop_image'];
    //$product_image_tmp = $_FILES['product_image']['tmp_name'];
    //$product_image_location = "../images/products/$product_image";

    //move_uploaded_file($product_image_tmp,$product_image_location); 

    $insert_shop = "insert into shops (user_id,shop_name,area_name,owner_name,shop_image,Inactive) values ('$user_id','$shop_name','$area_name','$owner_name','$shop_image',0)";

    $run_shop = mysqli_query($link,$insert_shop);
    if($run_shop){
        $get_shop = "select * from shops where user_id='$user_id'";
        $run_shop = mysqli_query($link,$get_shop);
        if($run_shop){
            $row = mysqli_fetch_assoc($run_shop);
            $shop_id = $row['shop_id'];
            $update_user = "update user set shop_id='$shop_id' where User_ID='$user_id'";
            $run_update = mysqli_query($link,$update_user);
            if($run_update){
                $data['success'] = true;
                $data['message']  = "Success! Now please log in again. ";
            }
            else{
                $data['success'] = false;
                $data['message']  = "Error occured while writing the shop info : ".$update_user."  ".mysqli_error($link);
            }
        }
    }
    else{
        $data['success'] = false;
        $data['message']  = "Error occured while writing the shop info : ".mysqli_error($link);
    }

    header('Content-type: application/json');
	echo json_encode($data);
    mysqli_close($link);
?>