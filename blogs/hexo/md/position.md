title: 是时候撸一把标准了-CSS 中的定位
date: 
tags: ["CSS", "笔记"]

---

在 CSS2.1 中，一个盒子会根据下面三种定位方案进行排列：

* 标准流（Normal flow）：在 CSS2.1 中包括 块级盒子形成的块级格式化上下文（block formatting context），行级格式化上下文（inline formatting context）和采用了绝对定位（relative positioning）的盒子。
* 浮动（Floats）：在浮动模型中，盒子先按照正常标准流（normal flow）排列，然后从 normal flow 中取出，将它尽可能的移动到左边或者右边
* 绝对定位（Absoulte positioning）：整个盒子都将被从标准流中移出，相对于一个包含块（containing block）指定它自己的位置。将不会对它的兄弟元素有任何的影响。

如果一个元素被浮动或者进行了绝对定位，或者元素本身是文档的根元素（root element）我们就可以说这个元素脱离了文档流（out of flow）。与 `out-of-flow` 相对的是 `in-flow`。元素A的流（the flow of an element A）是一个集合，这个集合包含了A本身和那些以A作为最近的脱离文档流的祖先元素的所有 in-flow 元素。

![look at this](http://ncuey-crispelite.stor.sinaapp.com/QQ20140912-1.png)

`position` 和 `float` 采用不同的方式来计算盒子的位置

##position

position可以应用在任何元素上，它 的值有：static | relative | absolute | fixed | inherit|，默认值是 static。

**static**  
	元素按标准流排列，'top', 'right', 'bottom', and 'left' 对元素没有影响。  
	
**relative**
	元素的位置按照标准流（中的位置）计算（the position in normal flow），然后盒子相对它标准流中的位置偏移。比如B元素相对原来的位置发生偏移之后，它后面的元素的位置计算不会受到影响，就像B元素一直在原来的位置上呆着一样。对于 table-row-group, table-header-group, table-footer-group, table-row, table-column-group, table-column, table-cell, and table-caption 这些元素，没有定义 `position:relative`。  
	
**absolute**  
	盒子的位置由'top', 'right', 'bottom', and 'left' 指定。这四个值指定的偏移都是相对于盒子的包含块（containing block）。绝对定位的盒子从标准流中被移除，这一位置它们不会对接下来的相邻元素的布局产生影响。同时绝对定位的元素也有 magin ，不会与任何的 元素发生 margin坍塌现象。  

**fixed**  

	
	