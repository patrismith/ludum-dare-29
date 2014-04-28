Mer.Preloader = function (game) {
    this.ready = false;
};

Mer.Preloader.prototype = {

    preload: function () {

        this.game.debug.text('Loading...', this.world.centerX, this.world.centerY);
        for (var i = 0; i < Mer.Constants.audioList.length; i++) {
            //console.log('adding ' + Mer.Constants.audioList[i]);
            this.load.audio(Mer.Constants.audioList[i],
                                 ['assets/audio/' + Mer.Constants.audioList[i]  + '.ogg']);
        }

        Mer.Constants.currentHealth = Mer.Constants.maxHealth;

        //console.log(Mer.Constants.spriteList.length);
        for (i = 0; i < Mer.Constants.spriteList.length; i++) {
            //console.log('adding ' + Mer.Constants.spriteList[i][0]);
            this.load.spritesheet(Mer.Constants.spriteList[i][0],
                                  'assets/sprites/' + Mer.Constants.spriteList[i][0] + '.png',
                                  Mer.Constants.spriteList[i][1].w,
                                  Mer.Constants.spriteList[i][1].h,
                                  Mer.Constants.spriteList[i][1].no);
        }

        for (i = 0; i < Mer.Constants.imageList.length; i++) {
            this.load.image(Mer.Constants.imageList[i],
                                 'assets/images/' + Mer.Constants.imageList[i]  + '.png');
        }
    },

    isLoaded: function (val) {
        return this.cache.isSoundDecoded(val);
    },

    update: function () {

        if (this.cache.isSoundDecoded('title') && this.cache.isSoundDecoded('theme') && this.ready === false) {
            this.game.debug.text('',this.world.centerX,this.world.centerY);
            this.ready = true;
            //console.log('starting game');
            this.state.start('Menu');
        }
    },
};
