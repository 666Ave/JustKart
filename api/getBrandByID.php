<?php
    include 'conn.php';
    $brandid=$_GET['brandid'];
    $get_brand = "SELECT * FROM brands where brand_id='$brandid'";
    $run_brand = mysqli_query($link,$get_brand);
    if($run_brand) {
        $row = mysqli_fetch_assoc($run_brand);
        $brands = $row['brand_title'];
        header('Content-type: application/json');
        echo json_encode($brands);
    }
    else {
        echo "Error getting data : ".mysqli_error($link);
    }
    mysqli_close($link);
?>