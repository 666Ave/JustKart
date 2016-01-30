<?php
    $client  = @$_SERVER['HTTP_CLIENT_IP'];
	$forward = @$_SERVER['HTTP_X_FORWARDED_FOR'];
	$remote  = $_SERVER['REMOTE_ADDR'];

	if(filter_var($client, FILTER_VALIDATE_IP))
	{
		$user_ip = $client;
	}
	elseif(filter_var($forward, FILTER_VALIDATE_IP))
	{
		$user_ip = $forward;
	}
	else
	{
		$user_ip = $remote;
	}
?>