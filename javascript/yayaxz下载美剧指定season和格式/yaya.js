(function(season, format) {
    var $dataList = $(".resource-list");
    var episodeArr = [];

    (function isEpisode(list) {
        $.each(list, function(i, item) {
            var reg = /第\d季/g;
            var txt = $(item).find("dt>h2>span").html();
            if (reg.test(txt) == true) {
                episodeArr.push(item);
            }
        });
        console.log(episodeArr.length);
    })($dataList);

    if (length < season) {
        console.log("这部剧没有这么多季啦，现在只有 %d 季", length);
    } else {
        episodeArr = $(episodeArr).eq(episodeArr.length - season);
    }
    console.log(episodeArr);
    var $formatSetted = $(episodeArr).find("dd[data-format=" + format + "]");

    var edkLinks = $formatSetted.find("a[data-download-type=1]");

    var result = "";

    $.each(edkLinks, function(i, item) {
        result += $(item).attr("href") + "\n";
    });

    console.log(result);
})(1, "HDTV")
