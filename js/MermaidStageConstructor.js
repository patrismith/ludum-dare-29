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
        this.world.setBounds(0,0,1000,120 * Mer.Constants.gameScale);
        Mer.Components.Background(this);
        Mer.Components.StartPhysics(this);
        Mer.Components.Doors(this);
        // make obstacles
        Mer.Components.Obstacles(this);
        Mer.Components.Player(this);
        Mer.Components.Keys(this);
        // make enemies
        Mer.Components.Enemies(this, this.firstStage);
        // make the nets they use
        Mer.Components.NetPool(this);
    }

    function update() {

        // check to see if function should be called

        // player controls
        this.player.controller(this, this.player, this.firstStage);
        // ai controls
        this.enemies.forEach(function(item)
                             {if (item.controller)
                                 item.controller(item.game, item, !item.body);}, this, true);
        // collisions
        this.physics.arcade.overlap(this.doors, this.player,
                                    function (sprite, collidee) {
                                        // TODO: ...?
                                        sprite.game.state.start(collidee.leadsTo);
                                    })
        this.physics.arcade.overlap(this.enemies, this.player,
                                    function (sprite, collidee) {
                                        if (!sprite.grounded(sprite)) {
                                            collidee.broken(collidee, false);}
                                        else if (sprite.inNet) {
                                            sprite.die(sprite);
                                        }
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

    return function (backgroundKey, playerData, enemyList, obstacleList, doorList, firstStage) {
        return {
            backgroundKey: backgroundKey,
            doorList: doorList,
            enemyList: enemyList,
            obstacleList: obstacleList,
            playerData: playerData,
            firstStage: firstStage,
            create: create,
            update: update };
    };
})();
