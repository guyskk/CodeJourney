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

    var user = new UserModel({
        id: 1,
        name: 'Thomas',
        email: 'thomasalwyndavis@gmail.com'
    });

    user.destroy({
        success: function(){
            alert('Destroyed!');
        }
    });

})();
