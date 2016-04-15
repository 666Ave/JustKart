<?php
    include 'conn.php';
    $shopid=$_GET['shopid'];
    $get_shop = "SELECT * FROM shops where shop_id='$shopid'";
    $run_shop = mysqli_query($link,$get_shop);
    if($run_shop) {
        $row = mysqli_fetch_assoc($run_shop);
        $shops = $row['shop_name'];
        header('Content-type: application/json');
        echo json_encode($shops);
    }
    else {
        echo "Error getting data : ".mysqli_error($link);
    }
    mysqli_close($link);
?>