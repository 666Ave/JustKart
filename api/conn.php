<?php
    $link = mysqli_connect('localhost','root','','justkart');
        if(!$link)  {
            die('Could not connect to MySQL : '.mysqli_error());
        }
?>