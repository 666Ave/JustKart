<?php
    include 'conn.php';

    $get_users = "SELECT * FROM user where Active!=0 AND type!='admin'";
    $run_users = mysqli_query($link,$get_users);
    if($run_users) {
        $users = array();        
        while($row = mysqli_fetch_assoc($run_users)){
            $users[] = array(
                'User_id' => $row['User_ID'],
                'UName' => $row['UName'],
                'Name' => $row['fName'].$row['lName'],
                'type' => $row['type']
            );
        }
        header('Content-type: application/json');
        echo json_encode($users);
    }
    else {
        echo "Error getting data : ".mysqli_error($link);
    }
    mysqli_close($link);
?>