title: CSS 中的权重问题
date: 2014-09-26 12:23
tag: ["CSS"]
---

> 自己对以后的方向很明确，但是却一直做不到。接连的 rejected 多少对自己有影响。不是自己不去争取，而是真的已经疲了，或者说自己也怂了。面试的时候已经不知道该怎么办，即使自己的知道的问题也只会模棱两可地回答。滚回学校慢慢学吧

如果你现在问我CSS的权重，我也只能说个大概。于是开始整理有关的资料。

##CSS Specificity
有时候你会发现自己辛辛苦苦写的CSS样式不起作用，文件引入了，浏览器也加载了，但就是不按照你想要的方式显示，这个时候你就需要考虑 CSS权重的问题。如果你对权重的工作方式有所了解，将会大大减少调试bug的时间。

如果想解释权重的工作方式，最好的办法就是针对问题来分析。下面就是一个 CSS 样式没有按照期待的方式显示的例子。

一个简单的无序列表

    <ul id="summer-drinks">
       <li class="favorite">Whiskey and Ginger Ale</li>
       <li>Wheat Beer</li>
       <li>Mint Julip</li>
    </ul>
    
而在CSS中，是酱紫的：

    ul#summer-drinks li {
       font-weight: normal;
       font-size: 12px;
       color: black;
    }
    .favorite {
      color: red;
      font-weight: bold;
    }
    
但是你会发现，拥有class为favorite的li元素中的内容并没有像你期待的那样加粗变红。这就是权重引发的“血案“！别急别急，我们可以好好的捋一捋。

####什么是CSS的权重
