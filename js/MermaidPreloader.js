Mer.Preloader = function (game) {
    this.ready = false;
};

Mer.Preloader.prototype = {
    preload: function () {
        for (var i = 0; i > Mer.Constants.audioList; i++) {
            this.game.load.audio(Mer.Constants.audioList[i],
                                 ['assets/audio/' + Mer.Constants.audioList[i]  + '.ogg']);
        }
    },
    isLoaded: function (val, i, array) {
        return (this.cache.isSoundDecoded(val);
    },

    update: function () {
        // TODO: make placeholders for music and sfx files
        //       or comment the sound stuff out,
        //       or skip the preloader.
        if (Mer.Constants.audioList.every(isLoaded) && this.ready = false) {
            this.ready = true;
            this.state.start('Menu');
        }
    }

    },
};
