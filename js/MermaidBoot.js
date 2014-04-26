Mer.Boot = function (game) {};

Mer.Boot.prototype = {
    create: function () {
        this.input.maxPointers = 1;
        this.state.start('Preloader');
    }
};
