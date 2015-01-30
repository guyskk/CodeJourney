/**
 * Created by CrispElite on 2015/1/25 0025.
 */
(function() {
    var go = function() {
        console.log('go');
    };
    var go2 = function() {
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

(function() {
    var Sidebar = Backbone.Model.extend({
        promptColor: function() {
            var cssColor = prompt('请输入一个CSS颜色值：');
            this.set({
                color: cssColor
            });
        }
    });
    window.sidebar = new Sidebar();
    sidebar.bind('change:color', function(model, color) {
        $('#sidebar').css({
            background: color
        });
    });
    sidebar.set({
        color: 'white'
    });

    $("#theme-btn").on('click', function() {
        sidebar.promptColor();
    });
    var Person = Backbone.Model.extend({
        defaults: {
            name: "Fetus",
            age: 0,
            child: ''
        },
        initialize: function(){
            console.log("Welcome to thsi world!!");
            this.on("change:name", function(model){
                var name = model.get('name');
                console.log('Changed my name to ' + name);
            });
        },
        adopt: function(newChildName){
            this.set({child: newChildName});
        }
    });

    var person = new Person;
    person.set({name: "Thomas", age: 27, child: 'Ryan'});
    person.adopt('John Resig');
    console.log(person.get('child'));

    var attr = person.toJSON();
    console.log("attr");
    console.log(attr);
    var attr2 = person.attributes;
    console.log("attr2");
    console.log(attr2);


    var UserModel = Backbone.Model.extend({
        urlRoot: '/user',
        defaults: {
            name: '',
            email: ''
        }
    });
    var user = new UserModel();
    var userDetails = {
        name: 'Thomas',
        email: 'thomasalwyndavis@gmail.com'
    };

    user.save(userDetails, {
        success: function(user){
            alert(user.toJSON()); 
        } 
    });

    // var user = new UserModel({
    //     id: 1,
    //     name: 'Thomas',
    //     email: 'thomasalwyndavis@gmail.com'
    // });

    // user.destroy({
    //     success: function(){
    //         alert('Destroyed!');
    //     }
    // });

    var uer = new UserModel({id: 123});

    user.fetch({
        success: function(user){
            console.log(user.toJSON());
        }
    });

        var user = new UserModel({
        id: 1,
        name: 'Thomas',
        email: 'thomasalwyndavis@gmail.com'
    });

    // Let's change the name and update the server
    // Because there is `id` present, Backbone.js will fire
    // PUT /user/1 with a payload of `{name: 'Davis', email: 'thomasalwyndavis@gmail.com'}`
    user.save({name: 'Davis'}, {
        success: function (model) {
            alert(user.toJSON());
        }
    });

function Line(){
    this.z = 20;
    this.go = Point;
}


function Point(x,y) {
        this.x = x;
        this.y = y;
        console.log(this);
}
var line1 = new Line();

console.log(line1);
line1.go(10, 1000);

})();
