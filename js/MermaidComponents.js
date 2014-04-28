Mer.Components = {};

Mer.Components.grounded = function (obj) {
    return  obj.body.touching.down || obj.body.onFloor();
};

// for mermaids and scientists
Mer.Components.MoveLeft = function (obj) {
    if (obj.grounded(obj)) {
        obj.body.velocity.x = -obj.moveSpeed;
        obj.isFacing = 'left';
        obj.animations.play('moveLeft');
    }
};

Mer.Components.MoveRight = function (obj) {
    if (obj.grounded(obj)) {
        obj.body.velocity.x = obj.moveSpeed;
        obj.isFacing = 'right';
        obj.animations.play('moveRight');
    }
};

// for mermaid's leap/attack
Mer.Components.BashLeft = function (obj) {
    if (obj.grounded(obj)) {
        obj.body.velocity.y = -obj.jumpSpeed;
        obj.body.velocity.x = -Mer.Constants.playerBash;
        obj.animations.play('attackLeft');
    }
};

Mer.Components.BashRight = function (obj) {
    if (obj.grounded(obj)) {
        obj.body.velocity.y = -obj.jumpSpeed;
        obj.body.velocity.x = Mer.Constants.playerBash;
        obj.animations.play('attackRight');
    }
};

// net attack
Mer.Components.Net = function (obj) {
    var net = obj.game.netPool.getFirstDead();
    if (!net) return;
    net.revive();
    net.checkWorldBounds = true;
    net.outOfBoundsKill = true;
    net.reset(obj.x, obj.y);
    net.body.velocity.x = obj.isFacing == 'left' && -Mer.Constants.netVelocityX || Mer.Constants.netVelocityX;
    net.body.velocity.y = -Mer.Constants.netVelocityY;
    net.animations.play('normal');
    net.caughtTimer = obj.game.time.time;
};

// visual change
// for when mermaid rams glass and other things like scientists
Mer.Components.Broken = function (obj, destroy) {

    //obj.game.glass.play('',0,0.5);
    obj.animations.play('broken');
    obj.isBroken = true;
    if (destroy) {
        if (obj.body) {
            obj.body.destroy();
            obj.body = null;
        }

    } else {
        obj.controller = null;
    }
};

// making nets blink before they disappear
Mer.Components.Disappear = function () {};

Mer.Components.Die = function (obj) {
    // TODO: make the death scene more interesting,
    // maybe overlay a giant 'you got caught!'
    // until player hits a key
    Mer.Constants.currentHealth = Mer.Constants.maxHealth;
    Mer.Constants.lastPlayerX = 0;
    Mer.Constants.playMusic = true;
    obj.state.start('Death');
};

// when mermaid gets caught
Mer.Components.Caught = function (player, net) {
    player.inNet = true;
    net.animations.play('caught');
    net.reset(player.x, player.y);
    player.body.velocity.x = 0;
    player.body.velocity.y = 200;
    if (player.game.time.time - net.caughtTimer > Mer.Constants.caughtDelay) {
        net.caughtTimer = 0;
        player.inNet = false;
        net.kill();
    }
};

// for stages, option to stop music
Mer.Components.ExitStage = function () {};

// for making mermaid and scientists move according to triggers
Mer.Components.Controller = function (game, obj, obj2) {
    var action = obj.keys(game, obj);
    if (action == 'attackLeft') obj.attackLeft(obj);
    if (action == 'attackRight') obj.attackRight(obj);
    if (action == 'left') obj.moveLeft(obj);
    if (action == 'right') obj.moveRight(obj);
};

// player triggerer
Mer.Components.PlayerKeys = function (game, obj) {
    if (game.firstStage) {
        if (game.bashButton.isDown) {
            game.firstStage = false;
            game.obstacles = null;
            Mer.Components.Obstacles(game, true);
            return 'attackRight';
        }
    } else {
        if (obj.grounded(obj)) {
            obj.body.velocity.x = 0;
            if (obj.isFacing == 'left')
                obj.animations.play('moveLeft');
            else
                obj.animations.play('moveRight');
        }
        if (game.bashButton.isDown) {
            game.bash.play('',0,0.5);
            return obj.isFacing == 'left' && 'attackLeft' || 'attackRight';
        }
        if (game.cursors.left.isDown) return 'left';
        if (game.cursors.right.isDown) return 'right';
    }
};

// AI triggerer
Mer.Components.AIKeys = function (game, obj, dead) {
    // basic moves:
    // ai will go towards mermaid for a time
    // ai will pause
    // ai will throw net
    // ai will go towards mermaid
    if (!dead && !obj.still) {
        if (game.time.time - obj.moveTimer > Mer.Constants.netDelay) {
            obj.moveTimer = game.time.time;
            return obj.facing == 'left' && 'attackLeft' || 'attackRight';
        } else {
            if (obj.x - game.player.x < 0) return 'right';
            else return 'left';
        }
    }
};

// dehydration meter
Mer.Components.Meter = function (game, obj) {
    //console.log('adding meter');
    game.meter = game.add.sprite(0,0,'meter');
    Mer.Components.Scale(game.meter);
    game.meter.fixedToCamera = true;
};

Mer.Components.updateMeter = function (game) {
    var cropRect = {x: 0, y: 0, width: (128 * Mer.Constants.currentHealth / Mer.Constants.maxHealth), height: 8};
    game.meter.crop(cropRect);
};

Mer.Components.decreaseHealth = function (game) {
    if (game.time.time - game.startedAt > Mer.Constants.decreaseDelay) {
        game.startedAt = game.time.time;
        Mer.Constants.currentHealth--;
    }
    if (Mer.Constants.currentHealth > 0) {
        Mer.Components.updateMeter(game);
    }
    if (Mer.Constants.currentHealth <= 1) {
        game.sound.pauseAll();
        game.player.die(game);
    }
};

Mer.Components.Player = function (game) {
    //console.log('adding player to' + Mer.Constants.lastPlayerX);
    game.player = game.add.sprite(Mer.Constants.lastPlayerX * Mer.Constants.gameScale,
                                  104 * Mer.Constants.gameScale,
                                  'mermaid');
    Mer.Components.Scale(game.player);
    game.camera.follow(game.player, Phaser.Camera.FOLLOW_PLATFORMER);
    game.physics.enable(game.player, Phaser.Physics.ARCADE);
    game.player.isPlayer = true;
    game.player.body.bounce.y = 0.5;
    game.player.body.bounce.x = 0.5;
    game.player.body.collideWorldBounds = true;
    game.player.body.setSize(24,16,0,0);
    game.player.game = game;
    game.player.controller = Mer.Components.Controller;
    game.player.keys = Mer.Components.PlayerKeys;
    game.player.moveLeft = Mer.Components.MoveLeft;
    game.player.moveRight = Mer.Components.MoveRight;
    game.player.attackLeft = Mer.Components.BashLeft;
    game.player.attackRight = Mer.Components.BashRight;
    game.player.moveSpeed = Mer.Constants.playerSpeed;
    game.player.jumpSpeed = Mer.Constants.playerJump;
    game.player.maxJump = Mer.Constants.maxJump;
    game.player.grounded = Mer.Components.grounded;
    game.player.caught = Mer.Components.Caught;
    game.player.die = Mer.Components.Die;
    game.player.animations.add('attackLeft', [4]);
    game.player.animations.add('attackRight', [5]);
    game.player.animations.add('moveLeft', [0,1], 10, true);
    game.player.animations.add('moveRight', [2,3], 10, true);
    game.player.isFacing = 'right';
};

Mer.Components.Enemies = function (game, still) {
    //console.log('adding enemies');
    game.enemies = game.add.group();
    game.enemies.enableBody = true;
    game.enemies.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < game.enemyList.length; i++) {
        // TODO: design enemyList
        var member = game.enemies.create(game.enemyList[i].x * Mer.Constants.gameScale,
                                         game.enemyList[i].y * Mer.Constants.gameScale,
                                         'scientist');
        Mer.Components.Scale(member);
        member.body.bounce.y = 0.5;
        member.body.collideWorldBounds = true;
        member.body.setSize(16,16,0,0);
        member.controller = Mer.Components.Controller;
        member.keys = Mer.Components.AIKeys;
        member.moveLeft = Mer.Components.MoveLeft;
        member.moveRight = Mer.Components.MoveRight;
        member.attackLeft = Mer.Components.Net;
        member.attackRight = Mer.Components.Net;
        member.game = game;
        member.grounded = Mer.Components.grounded;
        member.moveSpeed = Mer.Constants.AISpeed;
        member.moveTimer = game.time.time;
        member.broken = Mer.Components.Broken;
        member.still = still;
        member.animations.add('broken',[4]);
        member.animations.add('moveLeft', [0,1], 10, true);
        member.animations.add('moveRight', [2,3], 10, true);
        member.isFacing = 'left';
        member.name = 'member' + i;
    }
};

Mer.Components.NetPool = function (game) {
    //console.log('adding nets');
    game.netPool = game.add.group();
    game.netPool.enableBody = true;
    game.netPool.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < Mer.Constants.maxNets; i++) {
        var net = game.netPool.create(0,0,'net');
        net.kill();
        Mer.Components.Scale(net);
        net.animations.add('caught', [1]);
        net.animations.add('normal', [0]);
        net.caughtTimer = 0;
    }
};

Mer.Components.Obstacles = function (game, alreadyBroken) {
    //console.log('adding obstacles');
    game.obstacles = game.add.group();
    game.obstacles.enableBody = true;
    game.obstacles.physicsBodyType = Phaser.Physics.ARCADE;
    game.waterSources = game.add.group();
    game.waterSources.enableBody = true;
    game.waterSources.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < game.obstacleList.length; i++) {
        var member;
        if (game.obstacleList[i].name == 'fountain') {
            member = game.waterSources.create(game.obstacleList[i].x * Mer.Constants.gameScale,
                                                  game.obstacleList[i].y * Mer.Constants.gameScale,
                                                  game.obstacleList[i].name);
        } else {
            member = game.obstacles.create(game.obstacleList[i].x * Mer.Constants.gameScale,
                                               game.obstacleList[i].y * Mer.Constants.gameScale,
                                               game.obstacleList[i].name);
        }
        Mer.Components.Scale(member);
        member.body.immovable = true;
        member.body.allowGravity = false;
        member.game = game;
        member.broken = Mer.Components.Broken;
        member.animations.add('regular', [0]);
        member.animations.add('broken', [1]);
        if (!alreadyBroken) {
            member.animations.play('regular');
        }
        if (game.obstacleList[i].water) {
            member.isWaterSource = true;
        }
    }
};

Mer.Components.Doors = function (game) {
    //console.log('adding doors');
    game.doors = game.add.group();
    game.doors.enableBody = true;
    game.doors.physicsBodyType = Phaser.Physics.ARCADE;
    for (var i = 0; i < game.doorList.length; i++) {
        var member = game.doors.create(game.doorList[i].x * Mer.Constants.gameScale,
                                       game.doorList[i].y * Mer.Constants.gameScale,
                                       'door');
        Mer.Components.Scale(member);
        member.body.immovable = true;
        member.body.allowGravity = false;
        member.leadsTo = game.doorList[i].leadsTo;
        member.playerX = game.doorList[i].playerX;
    }
};

Mer.Components.Scale = function (image) {
    image.scale.x = Mer.Constants.gameScale;
    image.scale.y = Mer.Constants.gameScale;
};


Mer.Components.Background = function (game, noScale) {
    game.stage.smoothed = false;
    //game.bbg = game.add.tileSprite(0,0,256,120,'oceanbg');
    //game.bbg.fixedToCamera = true;
    game.bg = game.add.sprite(0,0,game.backgroundKey);
    if (!noScale)
    Mer.Components.Scale(game.bg);
};

Mer.Components.StartPhysics = function (game) {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = Mer.Constants.gravity;
};

Mer.Components.Keys = function (game) {
    game.cursors = game.input.keyboard.createCursorKeys();
    game.bashButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
};
