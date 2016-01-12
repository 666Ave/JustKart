<?php
    $link = mysqli_connect('localhost','root','123456','justkart');
    if(!$link)  {
        die('Could not connect to MySQL : '.mysqli_error());
    }
    $get_cats = "SELECT * FROM categories";
    $run_cats = mysqli_query($link,$get_cats);
    if($run_cats) {
        if(mysqli_num_rows($run_cats)>0){
            $cats = array();
            while($row = mysqli_fetch_assoc($run_cats)) {
                $cats[] = array(
                    'cat_id' => $row['cat_id'],
                    'cat_title' => $row['cat_title']
                );
            }
            header('Content-type: application/json');
            echo json_encode($cats);
        }
    }
    else {
        echo "Error getting data : ".mysqli_error($link);
    }
    mysqli_close($link);
?>