title: git 使用笔记(三)-分支的使用
date: 2014-09-14 16:06
tag: ["Git", "笔记"]
---

之前说过，每次修改之后，Git 并不是保存这些修改之后的差异变化，实际上就像一个照相机一样，将修改后的文件拍下作为文件快照，记录在一个微型的文件系统中。在 Git 中提交时，会保存一个提交对象，这个对象包含一个暂存内容快照的指针。而 Git 中的分支其本质上是一个指向 commit 对象的可变的指针，使用 master 作为分支的默认名字，通常指向的是最新的一次提交。

每次的提交，Git 把他们穿起来连成一条线，而主分支master就在这条线上随着提交测更新移动，而 HEAD 指向master，表示我们当前处在 master 分支上（不好意思，直接就用廖雪峰老师的图了，他的教程请戳[这里](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)）

![images](http://ncuey-crispelite.stor.sinaapp.com/18333fig0304-tn.png)

创建一个叫做 dev 分支，这个分支默认会只想当前你所处在的提交对象上，切换到这个分支上后，HEAD 便指向了 dev。

![images](http://ncuey-crispelite.stor.sinaapp.com/new-branch-dev.png)

从这个时候开始，对工作区的操作都只是在 dev 分支上发生了，在 dev 的上提交一次之后，master 指向原来的那个提交对象，而 dev 会指向最新的提交对象。我们称：master 落后了 dev 一个 commit。当我们试图将 master 指向 dev 当前的提交时，这个操作就是合并分支。

在上述的这几个过程中，工作区的内容没有变化，整个过程就是修改几个指针而已，几乎就是瞬间完成。

