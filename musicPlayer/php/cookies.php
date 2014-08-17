<?php
    header('Content-Type: text/html; charset=utf-8');
    $cookie_file = dirname(__FILE__)."/cookie.txt";
    $url="http://fm.baidu.com";
    echo
    $ch=curl_init($url);

    curl_setopt($ch, CURLOPT_HEADER, 0); // 不返回 header
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // 返回字符串
    curl_setopt($ch, CURLOPT_COOKIEJAR, $cookie_file);
    curl_exec($ch);
    curl_close($ch);

    //使用上面保存的cookies再次访问

    //返回 用户ID 和hasd_code
    $userCount="http://fm.baidu.com/dev/api/?tn=usercounts&_=".time();
    $ch = curl_init($userCount);
    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_COOKIEFILE, $cookie_file); //使用上面获取的cookies
    $response = curl_exec($ch);
    curl_close($ch);

    $channelId="";
    $songIdList="http://fm.baidu.com/dev/api/?tn=playlist&id="+$channelId+"&special=flash&prepend=&format=json&_="+time();

    // 设置cookies



?>