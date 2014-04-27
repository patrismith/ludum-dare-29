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
        // make obstacles
        Mer.Components.Obstacles(this);
        Mer.Components.Player(this);
        Mer.Components.Keys(this);
        // make enemies
        Mer.Components.Enemies(this);
        // make the nets they use
        Mer.Components.NetPool(this);
    }

    function update() {

        // check to see if function should be called

        // player controls
        this.player.controller(this, this.player);
        // ai controls
        this.enemies.forEach(function(item)
                             {if (item.controller)
                                 item.controller(item.game, item, !item.body);}, this, true);
        // collisions
        this.physics.arcade.overlap(this.enemies, this.player,
                                    function (sprite, collidee) {
                                        if (!sprite.grounded(sprite)) {
                                            collidee.broken(collidee, false);}
                                    });
        this.physics.arcade.collide(this.obstacles, this.player,
                                    function (sprite, collidee) {
                                        if (!sprite.grounded(sprite)) {
                                            collidee.broken(collidee, true);}
                                    });
        this.physics.arcade.overlap(this.netPool, this.player,
                                    function (sprite, collidee) {
                                        if (collidee.alive)
                                        sprite.caught(sprite, collidee);
                                    });
    }

    return function (backgroundKey, enemyList, obstacleList) {
        return {
            backgroundKey: backgroundKey,
            enemyList: enemyList,
            obstacleList: obstacleList,
            create: create,
            update: update };
    };
})();
