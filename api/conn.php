<?php
    $link = mysqli_connect('localhost','root','123456','justkart');
        if(!$link)  {
            die('Could not connect to MySQL : '.mysqli_error());
        }
?>