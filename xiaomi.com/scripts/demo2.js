(function() {
    //命令数组
    var COMMANDS = [
        "About",
        "Bookmarks: Clean All",
        "Bookmarks: Select All",
        "Bookmarks: Select Next",
        "Bookmarks: Select Previous",
        "Convert Case: Lower Case",
        "Convert Case: Upper Case",
        "File: Close All",
        "File: Revert",
        "File: Save All"
    ];

    var MYAPP = MYAPP || {};
    MYAPP.subl = {};
    MYAPP.subl.listContainer = $("#orderList");

    MYAPP.subl.addListener = null;

    if (typeof window.addEventListener === "function") {
        MYAPP.subl.addListener = function(elem, type, handler) {
            elem.addEventListener(type, handler, false);
        }
    } else if (typeof document.attachEvent === "function") {
        MYAPP.subl.addListener = function(elem, type, handler) {
            elem.attachEvent("on" + type, handler);
        }
    } else {
        MYAPP.subl.addListener = function(elem, type, handler) {
            elem["on" + type] = handler;
        }
    }

    MYAPP.subl.autoLoadCommand = function(commands) {
        var length = commands.length,
            currentCommand = commands[0],
            html = "<li class=\"current\">" + currentCommand + "</li>"
        for (var i = 1; i < length; i++) {
            html += ("<li>" + commands[i] + "</li>");
        }
        this.listContainer.html(html);
    }

    MYAPP.subl.togglePanel = function(panel, event) {
        var $panel=$(panel);
        if (event.ctrlKey && event.shiftKey && event.keyCode == 80) {
            if ($panel.css("display") == "none") {
                $panel.show();
            } else {
                $panel.hide();
            }
            event.preventDefault();
        }
        if (event.keyCode == 27) {
            $panel.hide();
        }

    };


    MYAPP.subl.selectCommand = function(commandList,key) {

        var $list = $(commandList),
            $commands=$("li",$list);
            length = $commands.size(),
            currentLine = $(".current", $list),
            count = $list.index($(currentLine));

        if (key == 38 && count > 0) {
            currentLine.removeClass("current");
            currentLine.prev().addClass("current");
        } else if (key == 40 && count >= 0 && count < length) {
            currentLine.removeClass("current");
            currentLine.next().addClass("current");
        } else {
            return false;
        }

    };

    //查找 字符所在的位置，高亮，返回高亮之后的字符串

    MYAPP.subl.highlightChar = function(targetStr, referStr) {
        var refLen = referStr.length,
            tarLen = targetStr.length;

        for (var j = 0; j < refLen; j++) {
            var pattern = new RegExp(referStr[j],"g");
            targetStr = targetStr.replace(pattern, "<b>" + referStr[j] + "</b>");
        }

        return targetStr;
    };


    MYAPP.subl.filterCommand = function(commandsContainer,commands,value) {

        var list = $(COMMANDS),
            length = list.size(),
            i = 0;
        var commandStore = []; //存放匹配到的li

        //检查输入的字符，外层循环命令中的字符串，每个字符与value的每个字符匹配
        while (i < length) {
            var cur = list[i],
                node={}; //保存相关信息
            node.matchNum = 0; //匹配的次数
            node.index = []; //每次匹配到的位置
            var pos = -1;
            for (var j = 0; j < value.length; j++) {
                pos = cur.indexOf(value[j], pos + 1);

                if (pos !== -1) {

                    node.matchNum++;
                    node.index.push(pos);
                }

            }
            //如果匹配到的次数小于查询字符串的长度，则mark为false，不存入数组;
            node.mark = (node.matchNum == value.length);
            if (node.mark) {
                node.dom = "<li>"+this.highlightChar(cur, value)+"</li>";
                commandStore.push(node);
            }
            i++;
        }
        //将匹配的字符 重新排序
        var reOrder = function(commandArr) {
            var length = commandArr.length;
            var frag = document.createDocumentFragment();

            //冒泡排序
            for (var i = 0; i < length - 1; i++) {
                for (var j = 0; j < length - 1 - i; j++) {

                    var a = commandArr[j],
                        b = commandArr[j + 1];

                    if (a.matchNum < b.matchNum) {
                        var c = a;
                        commandArr[j] = b;
                        commandArr[j + 1] = c;
                    }
                }

            }

            var html="";
            for (var i = 0; i < length; i++) {
                html+=commandArr[i].dom;
            }
            commandsContainer.innerHTML=html;
        }

        reOrder(commandStore);

    }



    var appInit = function() {

        MYAPP.subl.autoLoadCommand(COMMANDS);

        var input = document.getElementById("input"),
            commandList=document.getElementById("orderList"),
            commands=commandList.getElementsByTagName("li"),
            panel=document.getElementById("panel");;
        //ctrl+shift+P 显示面板。esc退出
        MYAPP.subl.addListener(document, "keydown", function(event) {
            MYAPP.subl.togglePanel(panel, event);
            MYAPP.subl.selectCommand(commandList, event.keyCode);
            // console.log(event.keyCode);
            // if(event.keyCode == "8"){
            //     var value=input.value;
            //     MYAPP.subl.filterCommand(commandList,commands,value);
            // }
        });
        //
        MYAPP.subl.addListener(input, "input", function() {
            var value = this.value;
            MYAPP.subl.filterCommand(commandList, commands,value);
        });
    }

    MYAPP.subl.addListener(window, "load", appInit);

})();
