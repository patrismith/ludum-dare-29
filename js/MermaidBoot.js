Mer.Boot = function (game) {};

Mer.Boot.prototype = {
    create: function () {
        this.state.add('Boot', Mer.Boot);
        this.state.add('Preloader', Mer.Preloader);
        this.state.add('Menu', Mer.MenuStage);
        this.state.add('Bathroom', Mer.BathroomStage);
        this.state.add('Tank', Mer.TankStage);
        this.state.add('Hallway01', Mer.Hallway01Stage);
        this.state.add('Hallway02', Mer.Hallway02Stage);
        this.state.add('Hallway03', Mer.Hallway03Stage);
        this.state.add('Hallway04', Mer.Hallway04Stage);
        this.input.maxPointers = 1;
        this.state.start('Preloader');
    }
};
