Mer.Preloader = function (game) {
    this.ready = false;
};

Mer.Preloader.prototype = {

    preload: function () {

        this.game.debug.text('Loading...', this.world.centerX, this.world.centerY);
        //for (var i = 0; i > Mer.Constants.audioList.length; i++) {
        //    this.game.load.audio(Mer.Constants.audioList[i],
        //                         ['assets/audio/' + Mer.Constants.audioList[i]  + '.ogg']);
        //}

        console.log(Mer.Constants.spriteList.length);
        for (var i = 0; i < Mer.Constants.spriteList.length; i++) {
            console.log('adding ' + Mer.Constants.spriteList[i][0]);
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

        // instead of a tilemap
        // try rendering game map as whole image, and place invisible barriers
        console.log(this.state.checkState('Bathroom'));

    },

    isLoaded: function (val, i, array) {
        return (this.cache.isSoundDecoded(val));
    },

    update: function () {
        // TODO: make placeholders for music and sfx files
        //       or comment the sound stuff out,
        //       or skip the preloader.
        //if (Mer.Constants.audioList.every(isLoaded) && this.ready = false) {
        this.game.debug.text('',this.world.centerX,this.world.centerY);
            this.ready = true;
        console.log('starting game');
            this.state.start('Menu');
        //}
    //}

    },
};
