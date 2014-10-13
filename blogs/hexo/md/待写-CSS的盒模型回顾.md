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

在CSS中定义的宽和高，其实都是内容区域的宽和高，padding，border 和 margin 被排除在盒子尺寸之外。

所以对于一个定义了宽度的盒子来说，其尺寸的计算方式：

    实际宽度 = margin(left+right) + border(left+right) + padding(left+right) + width(定义的值)
    
    实际高度 = margin(top+bottom) + border(top+bottom) + padding(top+bottom) + height(定义的值)
    
可以利用margin调整两个元素之间的距离，用padding调整内容与元素边框之间的距离（留白）。这是标准的盒模型

## IE6 中的盒模型

那么问题来了，当元素定义了一个固定的宽度（高度）值后，如果修改padding，元素在页面上所占的宽度（高度）也会随着padding的值的变化而变化。同理，当你想调整内容与边框之间的距离而修改了padding后，为了保持元素在页面上所占的宽度（高度）固定，还需要修改定义的内容的宽度。如此的麻烦。

再举个例子，日常生活中的盒子，当我们定义它的大小时，绝对不会使用盒子中存放的物品的尺寸来定义盒子的大小。对于这个盒子来说，外围的挡板可以看成border，防止物品破损的填充物可以看成padding，在现实中，当我们说一个盒子有多大时，指的就是它的实际大小，也就是 `“border+padding+contentWidth”`。这种设定似乎是更贴合实际也更容易理解和接受。

在IE的quirks模式下，其盒模型的解释正是如此。

## box-sizing
不过在新的 CSS3 中，推出了一个新的属性 `box-sizing` 。有两个可选值，一个是默认的 content-box 一个是 border-box，选用后者，盒子模型将按 IE6 的方式进行处理

##margin的重叠


>参考：  
[box model (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/box_model)  
[The CSS Box Model](http://css-tricks.com/the-css-box-model/)  
[IE盒模型缺陷](http://zh.wikipedia.org/wiki/IE%E7%9B%92%E6%A8%A1%E5%9E%8B%E7%BC%BA%E9%99%B7)  
[box model](http://www.w3.org/TR/CSS2/box.html#box-dimensions)




