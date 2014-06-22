<?php

	


	$timer=$_GET["time"];
	$postUrl="http://fm.baidu.com/dev/api/";
	$query="action=userop&tn=userop&_=".$timer;
	$header = array (  
		"POST {$postUrl}?{$query} HTTP/1.1",  
		"Host: fm.baidu.com",  
		"Content-Type: text/xml; charset=utf-8",  
		"Connection: keep-alive",
		"Cache-Control: no-cache",
		"Pragma: no-cache",
		"Origin: http://fm.baidu.com",
		"X-Requested-With: XMLHttpRequest",
		"Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
		'Accept: */*',  
		'User-Agent: Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; SV1)',   
		"Content-length: 380",  
		"Connection: Close"  
	);  

	# Our new data
	$data = array(
	    'action' => 'userop',
	    'tn' => 'userop',
	    '_' => $timer
	);

	# Create a connection
	$url = $postUrl;
	$ch = curl_init($url);

	# Form data string
	$postString = http_build_query($data, '', '&');

	# Setting our options
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $postString);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

	# Get the response
	$response = curl_exec($ch);
	curl_close($ch);
	echo $response;
?>