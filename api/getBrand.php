<?php
    include 'conn.php';
    $get_brands = "SELECT * FROM brands";
    $run_brands = mysqli_query($link,$get_brands);
    if($run_brands) {
        if(mysqli_num_rows($run_brands)>0){
            $brands = array();
            while($row = mysqli_fetch_assoc($run_brands)) {
                $brands[] = array(
                    'brand_id' => $row['brand_id'],
                    'brand_title' => $row['brand_title']
                );
            }
            header('Content-type: application/json');
            echo json_encode($brands);
        }
    }
    else {
        echo "Error getting data : ".mysqli_error($link);
    }
    mysqli_close($link);
?>