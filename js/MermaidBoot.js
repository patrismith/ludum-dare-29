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
        this.state.add('Lab01', Mer.Lab01Stage);
        this.state.add('Lab02', Mer.Lab02Stage);
        this.state.add('Lab03', Mer.Lab03Stage);
        this.state.add('Lab04', Mer.Lab04Stage);
        this.state.add('Lab05', Mer.Lab05Stage);
        this.state.add('Lab06', Mer.Lab06Stage);
        this.state.add('Lab07', Mer.Lab07Stage);
        this.state.add('Lab08', Mer.Lab08Stage);
        this.state.add('Lab09', Mer.Lab09Stage);
        this.state.add('Lab10', Mer.Lab10Stage);
        this.state.add('Fountain01', Mer.Fountain01Stage);
        this.state.add('Fountain02', Mer.Fountain02Stage);
        this.state.add('Lobby', Mer.LobbyStage);
        this.state.add('Win01', Mer.Win01Stage);
        this.state.add('Win02', Mer.Win02Stage);
        this.state.add('Win03', Mer.Win03Stage);
        this.state.add('Win04', Mer.Win04Stage);
        this.state.add('Win05', Mer.Win05Stage);
        this.state.add('Death', Mer.DeathStage);
        this.state.add('Win', Mer.WinStage);
        this.input.maxPointers = 1;
        this.state.start('Preloader');
    }
};
