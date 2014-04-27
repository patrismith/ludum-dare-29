Mer.Boot = function (game) {};

Mer.Boot.prototype = {
    create: function () {
        this.state.add('Boot', Mer.Boot);
        this.state.add('Preloader', Mer.Preloader);
        this.state.add('Menu', Mer.MenuStage);
        this.state.add('Bathroom', Mer.BathroomStage);
        this.state.add('Tank', Mer.TankStage);
        this.state.add('Hallway01', Mer.HallwayStage01);
        this.input.maxPointers = 1;
        this.state.start('Preloader');
    }
};
