title: CSS 的盒模型-过去和将来
date: 2014-10-05 14:30
category: 前端
tags: ["CSS", "笔记"]
___

>CSS 诞生已经二十年了，我接触 CSS 才两年。不说多么的精通，但是自信对基本的常用的 CSS 很熟悉。然而，一直往前赶却忽略了事情的本质。昨天有人问我盒模型，我顿时傻了，但是强作镇定稍微解释了一下，然后甩了几个链接要他自己看。我那个心虚啊……实战起来没有问题，但是却没办法说出个所以然，这其实就是知识的漏洞。这些漏洞往往致命啊，如果面试的时候答不出来，就over了。


## W3C规范

一般来说，页面中的每一个元素都会形成一个矩形盒子，渲染引擎根据给定的样式确定这个盒子的呈现。通俗的来说，页面的布局就是一个个盒子的排列和摆放。掌握了盒子呈现的本质，布局也就轻而易举。

在 W3C 规范中定义了标准的盒模型：

> Each box has a content area (e.g., text, an image, etc.) and optional surrounding padding, border, and margin areas; the size of each area is specified by properties defined below. The following diagram shows how these areas relate and the terminology used to refer to pieces of margin, border, and padding
    
每一个盒子都有一个内容区域（比如：文本，图片.etc）和可选的环绕着内容的内边距（padding），边框（border），外边距（margin）。盒子的大小有这些属性定义。下面这张图很直观的说明了这一点

![W3CR](http://www.w3.org/TR/CSS2/images/boxdim.png)  

使用 firebug 或者 Chrome 的开发者工具，可以酱紫：

![firefox](http://ncuey-crispelite.stor.sinaapp.com/2014-10-12_0946.png)

![Chrome](http://ncuey-crispelite.stor.sinaapp.com/2014-10-12_0948.png)






