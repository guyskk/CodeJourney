/**
 * Created by CrispElite on 2015/2/12 0012.
 */


requirejs.config({
    baseUrl: 'js',
    paths: {

    },
    shim: {

    }
});

require(['app'], function(App){

    window.bTask = new App();

});
