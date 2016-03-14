<?php
	header('Content-type: application/json');
	$status = array(
		'type'=>'success',
		'message'=>'Thank you for subscribing to us.'
	);

    $email_to = "Admin@JustKart.com";//@trim(stripslashes($_POST['email'])); 
    $subject    = "Subscribtion to our newsletter"; 
	$headers = "From: avian.silveira@gmail.com";
    $body = "Thank you for subscribing to us '".$email_to."'. We are happy to give you news about our latest offers and products.";

    $success = @mail($email_to, $subject, $body,$headers);
	if($success)
    	echo json_encode($status);
	else
		echo "Failed";
?>