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
	 // 解悉url
	$url=$fmUrl;
	 $urlQuery = parse_url($url);
	 $query = isset($urlQuery['query']) ? $urlQuery['query'] : '';
	 $path = isset($urlQuery['path']) ? $urlQuery['path'] : '/';
	 $NetCaseRefer= "http://".$urlQuery['host'];
	 echo "urlQuery : ".$url;
	 echo "query : ".$query;
	 $header = array (
		 "Host: {$urlQuery['host']}",
		 "Content-Type: text/xml; charset=utf-8",
		 'Accept: */*',
		 'Access-Control-Allow-Origin, *',
		 "Referer: http://{$urlQuery['host']}/",
		 'User-Agent: Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1; SV1)',
		 "Content-length: 380",
		 "Connection: Close"
	 );



 // create curl resource
    $ch = curl_init();

    // set url
    curl_setopt($ch, CURLOPT_URL, $fmUrl);

    //return the transfer as a string
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    // curl_setopt($ch, CURLOPT_HTTPHEADER, $header);  //设置头信息的地方

	curl_setopt($ch, CURLOPT_URL, $fmUrl); //你要访问的页面
	curl_setopt($ch, CURLOPT_REFERER, $NetCaseRefer); //伪造来路页面


    curl_setopt($ch,CURLOPT_USERAGENT,'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.13) Gecko/20080311 Firefox/2.0.0.13');



    // $output contains the output string
    $contents = curl_exec($ch);

    // close curl resource to free up system resources
    curl_close($ch);



	echo $contents;


?>