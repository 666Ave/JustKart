<?php
    include 'conn.php';
    $sid = $_GET['sid'];

    $get_shop = "SELECT * FROM shops where shop_id = '$sid'";
    $run_shop = mysqli_query($link,$get_shop);
    if($run_shop) {
        if(mysqli_num_rows($run_shop)>0){
            $row = mysqli_fetch_assoc($run_shop);
            $shops[] = array(
                'shop_name' => $row['shop_name'],
                'shop_image' => $row['shop_image'],
                'owner_name' => $row['owner_name']
            );
            header('Content-type: application/json');
            echo json_encode($shops);
        }
    }
    else {
        echo "Error getting data : ".mysqli_error($link);
    }
    mysqli_close($link);
?>