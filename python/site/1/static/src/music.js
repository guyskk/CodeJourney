/**
 * Created by CrispElite on 2015/1/29 0029.
 */
(function (global) {
    global.AudioContext = window.AudioContext || window.webkitAudioContext;

    var context = new AudioContext(),
        gainNode = context[context.createGain ? 'createGain' : 'createGainNode']();
    gainNode.connect(context.destination);


    function loadMusic(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';

        xhr.onload = function () {
            var data = xhr.response;
            if (Object.prototype.toString.call(callback) === '[object Function]') {
                callback(data);
            }
        };
        xhr.send();
    }

    function playMusic(buffer) {
        var source = context.createBufferSource();

        source.buffer = buffer;
        source.connect(gainNode);

        source[source.start ? 'start':'noteOn'](0);
    }
    function adjustVolume(percent){
        gainNode.gain.value = percent * percent;
    }

    $(document).ready(function () {

        var songListContainer = $('#songList'),
            songListArray = $('li', songListContainer);

        songListContainer.on('click', function (e) {

            var $target = $(e.target);
            songListArray.removeClass('selected');
            $target.addClass('selected');

            var url = '/static/media/' + $target.attr('title');

            loadMusic(url, function (data) {
                console.log(data);
                context.decodeAudioData(data, function (buffer) {
                    playMusic(buffer);
                }, function(err){
                    console.log(err);
                });
            });

        });

        $('#adjustVol')[0].onchange = function(){
            adjustVolume(this.value/this.max);
        };

    });
})(window);