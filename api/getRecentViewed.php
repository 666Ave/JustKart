<?php
	session_start();
	if(!$_SESSION['recent']){
		$_SESSION['recent'] = []; 
		echo null;
	}
	/* Code for deleting session
	unset($_SESSION);
	session_destroy();
	//Code for deleting session */ 
    ///*
	else {
		$temp = $_SESSION['recent'];
		if($temp == null)
			echo null;
		else{
			header('Content-type: application/json');
			echo json_encode($temp);
		}
	}
	//*/
?>