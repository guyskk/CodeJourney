/**
 * Created by CrispElite on 2015/1/29 0029.
 */

//
//(function () {
//    Music.stop = function () {
//        this.source[this.source.stop ? 'stop' : 'noteOff'](0);
//    };
//    Music.pause = function () {
//        this.playing ? this.stop() : this.play();
//        this.playing = !this.playing;
//    };
//})();

var app = (function ($) {
    var _files, _context, _analyser, _ctx, _source, _gainNode, _pannerNode, _init, _loadMusic, _playMusic, _visualizer, _initCanvas;
    var SIZE = 128;
    _init = function () {
        var onListItemClickListener, onPlayButtonClickListener, onVolumeChangeListener, initalizeUi;
        _context = new (window.AudioContext || window.webkitAudioContext )();

        _source = null;
        _analyser = _context.createAnalyser();
        _analyser.fftSize = SIZE * 2;
        _gainNode = _context[_context.createGain ? 'createGain' : 'createGainNode']();
        _analyser.connect(_gainNode);
        _gainNode.connect(_context.destination);

        onListItemClickListener = function (name, url) {
            var a, file;
//            a = $(this);
            file = {
                name: name,
                uri: url
            };
            console.log('loadmusic');
            app.loadMusic(file, function () {
                console.log('loadmusic callback');
                app.playMusic(name);
                app.visualizer();
            });
        };

        onPlayButtonClickListener = function () {
            var url, file;

            url = $('#external').val();

            file = {
                name: 'external',
                uri: url
            };

            app.loadSound(file, function () {
                app.playSound('external');
            });
        };

        onVolumeChangeListener = function () {
            _gainNode.gain.value = parseInt(this.value, 10) / 100;
        };

        initalizeUi = (function () {

            var songListContainer = $('#songList'),
                songListArray = $('li', songListContainer);

            songListContainer.on('click', function (e) {

                var target = e.target;
                if (target.tagName.toLowerCase() !== 'li') {
                    return false;
                }
                songListArray.removeClass('selected');
                $(target).addClass('selected');

                var name = $(target).attr('title');
                var uri = '/static/media/' + name;
                onListItemClickListener(name, uri);
            });
            $('#adjustVol')[0].oninput = onVolumeChangeListener;
        })();
        _initCanvas();
    };

    _initCanvas = function () {
        var canvas = $('#canvas')[0];
        _ctx = canvas.getContext('2d');

        canvas.width = $(window).width();
        canvas.height = $(window).height();

        var line = _ctx.createLinearGradient(0, 0, 0, $(window).height() / 4 * 3);
        line.addColorStop(0, 'red');
        line.addColorStop(0.5, 'yellow');
        line.addColorStop(1, 'green');
        _ctx.fillStyle = line;
    };

    _loadMusic = function (file, successCallback, errorCallback) {
        var xhr,
            isLoaded,
            onRequestLoad,
            onDecodeAudioDataSuccess,
            onDecodeAudioDataError,
            doXHRRequest;

        _files = _files || [];

        successCallback = successCallback || function successCallback() {
        };
        errorCallback = errorCallback || function errorCallback(msg) {
            alert(msg);
        };

        isLoaded = false;
        $.each(_files, function isFileAlreadyLoaded(i) {
            if (_files[i].name === file.name) {
                isLoaded = true;
                return false;
            }
        });

        onDecodeAudioDataSuccess = function (buffer) {
            if (!buffer) {
                errorCallback('Error decoding file ' + file.uri + ' data.');
                return;
            }

            _files.push({
                name: file.name,
                uri: file.uri,
                buffer: buffer
            });
            successCallback();
        };

        onDecodeAudioDataError = function (error) {
            errorCallback('Error decoding file ' + file.uri + ' data.' + error);
        };

        onRequestLoad = function () {
            _context.decodeAudioData(xhr.response, onDecodeAudioDataSuccess, onDecodeAudioDataError);
        };
        onRequestError = function () {
            errorCallback('XHR error when loading file ' + file.uri + '.');
        };

        doXHRRequest = function () {
            xhr = new XMLHttpRequest();
            xhr.open('GET', file.uri, true);
            xhr.responseType = 'arraybuffer';
            xhr.onload = onRequestLoad;
            xhr.onerror = onRequestError;
            xhr.send();
        };
        if (isLoaded) {
            successCallback();
        } else {
            doXHRRequest();
        }
    };

    _playMusic = function (name) {
        if (_source && _source.playbackState === _source.PLAYING_STATE) {
            _source[_source.stop ? 'stop' : 'noteOff'](0); // stop()
            _source = null;
        }

        $.each(_files, function (i, file) {
            if (file.name === name) {
                /* Create SourceNode and add buffer to it. */
                _source = _context.createBufferSource();
                _source.buffer = file.buffer;
                /* Connect the SourceNode to the next node in the routing graph
                 * which is the PannerNode and play the sound. */
                _source.connect(_analyser);
                _source[_source.start ? 'start' : 'noteOn'](0); // start()

                return false;
            }
        });
    };

    _visualizer = function () {
        var arr = new Uint8Array(_analyser.frequencyBinCount);
        _analyser.getByteFrequencyData(arr);
        requestAnimationFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame;
        function draw(points) {
            _ctx.clearRect(0, 0, $(window).width(), $(window).height());
            var w = $(window).width() / SIZE;
            for (var i = 0; i < SIZE; i++) {
                var h = points[i] / 256 * $(window).height();
                _ctx.fillRect(w * i * 1.2, $(window).height() - h, w, h);
            }
        }

        function go() {
            _analyser.getByteFrequencyData(arr);
            draw(arr);
            requestAnimationFrame(go);
        }

        requestAnimationFrame(go);
    };
    return {
        init: _init,
        loadMusic: _loadMusic,
        playMusic: _playMusic,
        visualizer: _visualizer
    }
})(jQuery);

window.onload = function () {
    app.init();
};