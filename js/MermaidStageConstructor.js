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
        // make obstacles
        Mer.Components.Doors(this);
        Mer.Components.Obstacles(this);
        Mer.Components.Player(this);
        Mer.Components.Keys(this);
        // make enemies
        Mer.Components.Enemies(this, this.firstStage);
        // make the nets they use
        Mer.Components.NetPool(this);
        Mer.Components.Meter(this);
        Mer.Constants.nextState = null;
        this.canEnterDoors = true;
        this.startedAt = this.time.time;
        console.log('create done');
    }

    function update() {

        // check to see if function should be called
        if (Mer.Constants.nextState) {
            var nextState = Mer.Constants.nextState;
            Mer.Constants.nextState = null;
            // TODO: fix this!
            this.camera.reset();
            this.background = null;
            this.doors = null;
            this.enemies = null;
            this.player = null;
            this.netPool = null;
            this.obstacles = null;
            this.state.start(nextState);
        }

        if (this.waterSources)
            this.physics.arcade.overlap(this.waterSources, this.player,
                                        function (sprite, collidee) {
                                            Mer.Constants.currentHealth = Mer.Constants.maxHealth;
                                        });

        // player controls
        if (this.player)
            this.player.controller(this, this.player, this.firstStage);
        // ai controls
        if (this.enemies)
        this.enemies.forEach(function(item)
                             {if (item.controller)
                                 item.controller(item.game, item, !item.body);}, this, true);
        // collisions
        if (this.doors && this.canEnterDoors && this.time.time - this.startedAt > 1000)
        this.physics.arcade.overlap(this.doors, this.player,
                                    function (sprite, collidee) {
                                        // TODO: ...?
                                        console.log('door at ' + collidee.body.x + ' collided by sprite at ' + sprite.body.x + ' leading to ' + collidee.leadsTo);
                                        //sprite.game.state.start(collidee.leadsTo);
                                        Mer.Constants.nextState = collidee.leadsTo;
                                        sprite.game.canEnterDoors = false;
                                    });
        if (this.enemies)
        this.physics.arcade.overlap(this.enemies, this.player,
                                    function (sprite, collidee) {
                                        if (!sprite.grounded(sprite)) {
                                            collidee.broken(collidee, false);}
                                        else if (sprite.inNet) {
                                            sprite.die(sprite);
                                        }
                                    });
        if (this.obstacles)
        this.physics.arcade.collide(this.obstacles, this.player,
                                    function (sprite, collidee) {
                                        if (!sprite.grounded(sprite)) {
                                            if (collidee.isWaterSource) {
                                                var member = sprite.game.waterSources.create(collidee.x,collidee.y,collidee.key);
                                                Mer.Components.Scale(member);
                                                member.body.immovable = true;
                                                member.body.allowGravity = false;
                                                member.animations.add('broken',[1]);
                                            }
                                                collidee.broken(collidee, true);}
                                    });
        if (this.netPool)
        this.physics.arcade.overlap(this.netPool, this.player,
                                    function (sprite, collidee) {
                                        if (collidee.alive)
                                        sprite.caught(sprite, collidee);
                                    });
        if (this.meter)
            Mer.Components.decreaseHealth(this);
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
