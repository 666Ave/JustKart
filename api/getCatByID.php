<?php
    include 'conn.php';
    $catid=$_GET['catid'];
    $get_cat = "SELECT * FROM categories where cat_id='$catid'";
    $run_cat = mysqli_query($link,$get_cat);
    if($run_cat) {
        $row = mysqli_fetch_assoc($run_cat);
        $cats = $row['cat_title'];
        header('Content-type: application/json');
        echo json_encode($cats);
    }
    else {
        echo "Error getting data : ".mysqli_error($link);
    }
    mysqli_close($link);
?>