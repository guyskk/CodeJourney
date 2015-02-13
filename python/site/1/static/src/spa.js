/**
 * Created by CrispElite on 2015/1/25 0025.
 */
(function () {
    var go = function () {
        console.log('go');
    };
    var go2 = function () {
        console.log("go2");
    };
    var obj = {};
    _.extend(obj, Backbone.Events);
    obj.bind('alert', go);
    obj.bind('alert', go2);
    obj.trigger('alert', 'Mother Fucker!');
    obj.unbind('alert', go);
    obj.trigger('alert', 'Mother Fucker!');
})();

(function () {
    var Sidebar = Backbone.Model.extend({
        promptColor: function () {
            var cssColor = prompt('请输入一个CSS颜色值：');
            this.set({
                color: cssColor
            });
        }
    });
    window.sidebar = new Sidebar();
    sidebar.bind('change:color', function (model, color) {
        $('#sidebar').css({
            background: color
        });
    });
    sidebar.set({
        color: 'white'
    });

    $("#theme-btn").on('click', function () {
        sidebar.promptColor();
    });

    var Man = Backbone.Model.extend({
        url: '/user',
        initialize: function () {
            console.log('Hey, you create me!');
            this.bind('change:name', function () {
                var name = this.get('name');
                console.log('you change the name as:' + name);
            });
            this.bind('error', function (model, error) {
                console.log(error);
            });
        },
        default: {
            name: '张伦',
            age: '21'
        },
        validate: function (attributes) {
            if (attributes.name == '') {
                return "name 不能为空！"
            }
        },
        aboutMe: function () {
            return 'My name is' + this.get('name') + ', I am ' + this.get('age') + " years old.";
        }
    });

    var man = new Man();
    man.set({name: 'CrispElite', age: 21});
    man.save();


    var man1 = new Man;
    man1.fetch({url: '/user/'});
    man1.fetch();
    man1.fetch({
        url: '/user/',
        success: function (model, response) {
            console.log('success');
            console.log(model.get('0')['name']);
        },
        error: function () {
            console.error(error);
        }
    });


    var Book = Backbone.Model.extend({
        default: {
            title: 'default'
        },
        initialize: function () {
            console.log('Hey, you create me!');
        }
    });

    var BookShelf = Backbone.Collection.extend({
        model: Book
    });

    var book1 = new Book({title: 'book1'});
    var book2 = new Book({title: 'book2'});
    var book3 = new Book({title: 'book3'});

    var bookShelf = new BookShelf;

    bookShelf.add(book1);
    bookShelf.add(book2);
    bookShelf.add(book3);
    bookShelf.remove(book3);

    bookShelf.each(function (book) {
        console.log(book.get('title'));
    });


})();
$(document).ready(function () {

    var SearchView = Backbone.View.extend({
        initialize: function () {
            alert('Alerts suck!');
            this.render();
        },
        render: function () {
            var template = _.template($("#search_template").html(), {});
            this.$el.html(template);
        },
        events: {
            "click input[type=button]": 'doSearch'
        },
        doSearch: function () {
            alert("Search for " + $("#search_input").val());
        }
    });

    var search_view = new SearchView({
        el: $("#search_container")
    });

    var AppRouter = Backbone.Router.extend({
        routes: {
//            "*actions": "defaultRoute",
            "posts/:id": "getPost",
            "download/*path": "downloadFiles",
            ":route/:action": "loadView"
        }
    });

    var app_router = new AppRouter();
    app_router.on("route:defaultRoute", function (actions) {
        console.log(actions);
    });
    app_router.on("route:getPost", function (id) {
        console.log(id);
    });
    app_router.on("route:downloadFiles", function (path) {
        console.log(path);
    });
    app_router.on("route:loadView", function (route, action) {
        console.log(route + "___" + action);
    });

    Backbone.history.start();


    var Song = Backbone.Model.extend({
        default: {
            name: 'Not specified',
            artist: 'Not specified'
        },
        initialize: function () {
            console.log("Music is the answer!");
        }
    });

    var Album = Backbone.Collection.extend({
        model: Song
    });

    var song1 = new Song({name: "How Bizarre", artist: "OMC"});
    var song2 = new Song({name: "Sexual Healing", artist: "Marvin Gaye"});
    var myAlbum = new Album([song1, song2]);
    console.log(myAlbum.models[0].get("name"));


});
