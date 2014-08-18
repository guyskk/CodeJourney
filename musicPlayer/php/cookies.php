<?php
    header('Content-Type: text/html; charset=utf-8');
    
    $url="http://fm.baidu.com";
    // 保存cookie
    function saveCookie($url){
        $cookie_file = dirname(__FILE__)."/cookie.txt";
        $ch=curl_init($url);
        curl_setopt($ch, CURLOPT_HEADER, 0); // 不返回 header
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); // 返回字符串
        curl_setopt($ch, CURLOPT_COOKIEJAR, $cookie_file);
        $response = curl_exec($ch);
        curl_exec($ch);
        curl_close($ch);
    }

    // 返回 用户ID 和hasd_code
    function getUserCount(){
        $userCount="http://fm.baidu.com/dev/api/?tn=usercounts&_=".time();
        $ch = curl_init($userCount);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_COOKIEFILE, $cookie_file); //使用上面获取的cookies
        $response = curl_exec($ch);
        curl_close($ch);
        return $response;
    }
     
    $channelId="";
    $songIdList="http://fm.baidu.com/dev/api/?tn=playlist&id="+$channelId+"&special=flash&prepend=&format=json&_="+time();

    // 设置cookies

    function getCookie($url){
        // 初始化CURL
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        // 获取头部信息
        curl_setopt($ch, CURLOPT_HEADER, 1);
        // 返回原生的（Raw）输出
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        // 执行并获取返回结果
        $content = curl_exec($ch);
        // 关闭CURL
        curl_close($ch);
        // 解析HTTP数据流
        list($header, $body) = explode("\r\n\r\n", $content);
        // 解析COOKIE
        preg_match("/set\-cookie:([^\r\n]*)/i", $header, $matches);
        // 后面用CURL提交的时候可以直接使用
        // curl_setopt($ch, CURLOPT_COOKIE, $cookie);
        $cookie = $matches[1];
        return $cookie;
    }

    $baiduCookie=getCookie($url);
    echo $baiduCookie;
?>