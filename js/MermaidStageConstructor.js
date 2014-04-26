Mer.StageConstructor = {};

Mer.StageConstructor.Menu = (function () {

    function create() {

        console.log('menu create');
        Mer.Components.Background(this);
        this.spaceKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    }

    function update() {

        if (this.input.activePointer.isDown || this.spaceKey.isDown) {
            this.state.start(this.nextStage);
        }

    }

    return function (backgroundKey) {
        return {
            backgroundKey: backgroundKey,
            nextStage: 'Tank',
            create: create,
            update: update };
    };
})();

Mer.StageConstructor.Lab = (function () {

    function create() {

        console.log('lab create');
        Mer.Components.Background(this);
        Mer.Components.StartPhysics(this);
        Mer.Components.Player(this);
        Mer.Components.Keys(this);
        // make enemies
        Mer.Components.Enemies(this);
        // make the nets they use
        Mer.Components.NetPool(this);
        // make obstacles

    }

    function update() {

        // check to see if function should be called

        // player controls
        this.player.controller(this, this.player);
        // ai controls
        this.enemies.forEach(function(item)
                             {item.controller(item.game, item);}, this, true);
        // collisions

    }

    return function (backgroundKey, enemyList) {
        return {
            backgroundKey: backgroundKey,
            enemyList: enemyList,
            create: create,
            update: update };
    };
})();
