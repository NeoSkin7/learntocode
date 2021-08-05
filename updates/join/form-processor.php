<?php
	if(!isset($_POST['submit']))
	{
		echo "Error, this page should not be directly accessed";
	}
	$name = $_POST['name'];
	$visitor_email = $_POST['email'];
	
	$email_from = 'skinnerfamilyinc.outlook.com';
	$email_subject = "New message received";
	$email_body = "New email signup from $name.\n".
		"Email address: $visitor_email\n".
		
	$to = "neo.ski@outlook.com";
	$headers = "From: $email_from \r\n";
	$headers .= "Reply-To: $visitor_email \r\n";

	function IsInjected($str)
	{
		$injections = array('(\n+)',
			   '(\r+)',
			   '(\t+)',
			   '(%0A+)',
			   '(%0D+)',
			   '(%08+)',
			   '(%09+)'
			   );
				   
		$inject = join('|', $injections);
		$inject = "/$inject/i";
		
		if(preg_match($inject,$str))
		{
		  return true;
		}
		else
		{
		  return false;
		}
	}

	if(IsInjected($visitor_email))
	{
		echo "Bad email value submitted.";
		exit;	
	}
	
	mail($to,$email_subject,$email_body,$headers);
	header('Location: updates_join_successful.html');
?>