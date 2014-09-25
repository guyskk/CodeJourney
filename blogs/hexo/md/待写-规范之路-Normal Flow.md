title: 规范之路-Normal Flow
date: 2014-08-21 20:39
tags: [CSS, 笔记]
---

##Normal Flow

在正常流中的盒子们都是一个格式化上下文（formatting context）中的成员，可以表现成一个block或者inline，但是不能既是block又是inline。block 元素进入块级格式化上下文（block formatting context），inline 元素进入行级格式化上下文（inline formatting context）。

###Block formatting contexts

浮动元素，绝对定位元素，非块级盒子的块级容器（inline-block元素，table-cell元素和table-caption元素）和 overflow 的值不为 visiable的盒子，都会为它们的内容创建一个新的块级格式化上下文（BFC）。

在BFC中，盒子从顶端开始垂直地一个接一个地排列，两个盒子之间的垂直的间隙是由他们的margin 值所决定的。在一个BFC中，两个相邻的块级盒子的垂直外边距会产生折叠。

在BFC中，每一个盒子的左外边缘（margin-left）会触碰到容器的左边缘(padding-left 或者 border-left)（对于从右到左的格式来说，则触碰到右边缘）。

###Inline formatting contexts

在IFC中，盒子从顶端水平地一个接一个地排列。盒子之间的水平的外边距，边框和内边距会起作用。这些可以可以以不同的方式对齐：底部对齐，顶部对齐或者盒子内容中文本的基线对齐。每一行包含的盒子所形成的矩形区域我们称之为“line box”。

通常情况下，一个line box的高度足够容纳它包含的盒子。但是，有可能会比最高的盒子还高。当一个盒子B的高度比包含着它的line box 的高度还要小的时候，盒子B在line box中的垂直对齐由属性 “vertival-align” 决定。当几个行级盒子不能在一个单一的line box中正常地水平排列时，它们会被分配到两个或者多个垂直堆叠（vertical-stacked）的line box中。因此一个段落是line box中一个垂直的堆（vertical stack）。

通常来说，一个line box的左边缘会接触到它的包含块的做边缘，右边缘接触到包含块的右边缘。但是，浮动的盒子可能会出现在line box 的边缘和它的包含块的边缘之间。因此，虽然在同一个IFC中的line box有同样的宽度（取决于包含块的宽度），但是当浮动导致水平方向上可用的空间减少时，它们的宽度会改变。





