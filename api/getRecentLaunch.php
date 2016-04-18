<?php
    include 'conn.php';

	$time_now = date("Y-m-d h:i:s a");
    $get_recent = "SELECT * FROM products where DATEDIFF('$time_now',launch_date) < 20 and Inactive!=1 order by RAND()";
    $run_recent = mysqli_query($link,$get_recent);
    if($run_recent) {
        if(mysqli_num_rows($run_recent)>0){
			$products = array();
            while($row = mysqli_fetch_assoc($run_recent)) {
				$products[] = array(
					'product_id' => $row['product_id'],
					'product_title' => $row['product_title'],
					'product_image' => $row['product_image']
				);
			}
			header('Content-type: application/json');
			echo json_encode($products);
		}
    }
    else {
        echo "Error getting data : ".mysqli_error($link);
    }
    mysqli_close($link);
?>