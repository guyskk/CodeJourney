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
//echo $fmUrl;
$contents = file_get_contents($fmUrl); 
        
	echo $contents;
  
?>