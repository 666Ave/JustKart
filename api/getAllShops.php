<?php
    include 'conn.php';

    $get_shops = "SELECT * FROM shops where Inactive!=1";
    $run_shops = mysqli_query($link,$get_shops);
    if($run_shops) {
        $shops = array();        
        while($row = mysqli_fetch_assoc($run_shops)){
            $shops[] = array(
                'shop_id' => $row['shop_id'],
                'shop_name' => $row['shop_name'],
                'shop_image' => $row['shop_image'],
                'owner_name' => $row['owner_name']
            );
        }
        header('Content-type: application/json');
        echo json_encode($shops);
    }
    else {
        echo "Error getting data : ".mysqli_error($link);
    }
    mysqli_close($link);
?>