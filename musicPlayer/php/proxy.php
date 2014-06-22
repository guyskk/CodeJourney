<?php
	
	$fmUrl=$_GET["url"]."&";//webservice
	$paraGeted=$_GET;
	$len=count($paraGeted);
	$temp='';
	foreach($paraGeted as $key=>$value){
		if($key != "url"){
			$temp.=$key."=".$value;
		}
	}
	$fmUrl=$fmUrl.$temp;
	// $contents = file_get_contents($fmUrl); 

 // create curl resource
    $ch = curl_init();

    // set url
    curl_setopt($ch, CURLOPT_URL, $fmUrl);

    //return the transfer as a string
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch,CURLOPT_USERAGENT,'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13');

    // $output contains the output string
    $contents = curl_exec($ch);

    // close curl resource to free up system resources
    curl_close($ch); 


        
	echo $contents;

  
?>