<?php
    include 'conn.php';
    $data = array();
    $_POST = json_decode(file_get_contents("php://input"), true);
    $brand_title = $_POST['brand_title'];

    $insert_brand = "insert into brands (brand_title) values ('$brand_title')";

    $run_brand = mysqli_query($link,$insert_brand);
    if($run_brand){
        $data['success'] = true;
        $data['message']  = "Success!";
    }
    else{
        $data['success'] = false;
        $data['message']  = "Error occured while writing the brand info : ".mysqli_error($link);
    }

    header('Content-type: application/json');
	echo json_encode($data);
    mysqli_close($link);
?>
