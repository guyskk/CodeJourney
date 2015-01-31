/**
 * Created by CrispElite on 2015/1/29 0029.
 */
(function (global) {
    global.AudioContext = window.AudioContext || window.webkitAudioContext;

    var context = new AudioContext(),
        gainNode = context[context.createGain ? 'createGain' : 'createGainNode']();
    gainNode.connect(context.destination);

    var SIZE = 128;
    var analyser = context.createAnalyser();
    analyser.fftSize =  SIZE * 2;
    analyser.connect(gainNode);


    function initCanvas() {
        var canvas = $('#canvas')[0],
            ctx = canvas.getContext('2d');

        canvas.width = $(window).width();
        canvas.height = $(window).height();

        var line = ctx.createLinearGradient(0, 0, 0, $(window).height()/4 * 3);
        line.addColorStop(0, 'red');
        line.addColorStop(0.5, 'yellow');
        line.addColorStop(1, 'green');
        ctx.fillStyle = line;
        window.ctx = ctx;
        return ctx;
    }


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
        source.connect(analyser);

        source[source.start ? 'start' : 'noteOn'](0);

    }

//    visualizer();
    function adjustVolume(percent) {
        gainNode.gain.value = percent * percent;
    }

    function visualizer() {
        var arr = new Uint8Array(analyser.frequencyBinCount);
        console.log(arr);
        analyser.getByteFrequencyData(arr);
        requestAnimationFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame;

        function go() {
            analyser.getByteFrequencyData(arr);
//            console.log(arr);
            draw(arr);
            requestAnimationFrame(go);
        }

        requestAnimationFrame(go);
    }
    function draw(arr){
        ctx.clearRect(0, 0, $(window).width(), $(window).height());
        var w = $(window).width() / SIZE;
        for (var i = 0; i < SIZE; i++){
            var h = arr[i] /256 * $(window).height();
            ctx.fillRect(w * i * 1.2, $(window).height()-h, w , h);
        }
    }

    $(document).ready(function () {
        var ctx = initCanvas();
        var songListContainer = $('#songList'),
            songListArray = $('li', songListContainer);

        songListContainer.on('click', function (e) {

            var $target = $(e.target);
            songListArray.removeClass('selected');
            $target.addClass('selected');

            var url = '/static/media/' + $target.attr('title');

            loadMusic(url, function (data) {
                context.decodeAudioData(data, function (buffer) {
                    playMusic(buffer);
                    visualizer();
                }, function (err) {
                    console.log(err);
                });
            });

        });

        $('#adjustVol')[0].oninput = function () {
            adjustVolume(this.value / this.max);
        };

    });
})(window);


(function () {

    var Music = function (buffer) {
        this.buffer = buffer;
    };

    Music.play = function () {
        this.gainNode = context[context.createGain ? 'createGain' : 'createGainNode']();
        var source = context.createBufferSource();
        source.buffer = this.buffer;
        source.connect(analyser);
//        source.connect(this.gainNode);
        this.gainNode.connect(context.destination);
        source[source.start ? 'start' : 'noteOn'](0);
        this.source = source;
    };
    Music.adjustVolume = function (value) {
        var fraction = parseInt(value) / 100;
        this.gainNode.gain.value = fraction * fraction;
    };

    Music.stop = function () {
        this.source[this.source.stop ? 'stop' : 'noteOff'](0);
    };

    Music.pause = function () {
        this.playing ? this.stop() : this.play();
        this.playing = !this.playing;
    };

})();