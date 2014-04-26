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
        obj.body.velocity.x = -800;
        obj.animations.play('attackLeft');
    }
};

Mer.Components.BashRight = function (obj) {
    if (obj.grounded(obj)) {
        obj.body.velocity.y = -obj.jumpSpeed;
        obj.body.velocity.x = 800;
        obj.animations.play('attackRight');
    }
};


// visual change
// for when mermaid rams glass and other things like scientists
Mer.Components.Break = function () {};

// making nets blink before they disappear
Mer.Components.Disappear = function () {};

// for scientists' attack
Mer.Components.ThrowNet = function () {};

// so scientists will face and follow mermaid
Mer.Components.TrackMermaid = function () {};

// ensures that scientists stop moving and attacking when dead
Mer.Components.Die = function () {};

// when mermaid is slowed in net
Mer.Components.Stuck = function () {};

// when mermaid gets caught
Mer.Components.Caught = function () {};

// for stages, option to stop music
Mer.Components.ExitStage = function () {};

// for making mermaid and scientists move according to triggers
Mer.Components.Controller = function (game, obj) {
    var action = obj.keys(game, obj);
    if (action == 'attackLeft') obj.attackLeft(obj);
    if (action == 'attackRight') obj.attackRight(obj);
    if (action == 'left') obj.moveLeft(obj);
    if (action == 'right') obj.moveRight(obj);
};

// player triggerer
Mer.Components.PlayerKeys = function (game, obj) {
    if (obj.grounded(obj)) {
        obj.body.velocity.x = 0;
        if (obj.isFacing == 'left')
            obj.animations.play('moveLeft')
        else
            obj.animations.play('moveRight')
    }
    if (game.bashButton.isDown) {
        return obj.isFacing == 'left' && 'attackLeft' || 'attackRight';
    }
    if (game.cursors.left.isDown) return 'left';
    if (game.cursors.right.isDown) return 'right';
};

// AI triggerer
Mer.Components.AIKeys = function () {};


Mer.Components.Player = function (game) {
    console.log('adding player');
    game.player = game.add.sprite(0,0,'mermaid');
    Mer.Components.Scale(game.player);
    game.physics.enable(game.player, Phaser.Physics.ARCADE);
    game.player.body.bounce.y = 0.5;
    game.player.body.collideWorldBounds = true;
    game.player.body.setSize(24,16,0,0);
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
    game.player.animations.add('moveLeft', [0,1], 10, true);
    game.player.animations.add('moveRight', [2,3], 10, true);
    game.player.animations.add('attackLeft', [4], 20, true);
    game.player.animations.add('attackRight', [5], 20, true);
    game.player.isFacing = 'right';
};

Mer.Components.Scientist = function () {};

Mer.Components.Enemies = function (game) {
    console.log('adding enemies');
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
        member.body.controller = Mer.Components.Controller;
        member.body.keys = Mer.Components.AIKeys;
        member.body.moveLeft = Mer.Components.MoveLeft;
        member.body.moveRight = Mer.Components.MoveRight;
        member.body.attackLeft = Mer.Components.Net;
        member.body.attackRight = Mer.Components.Net;
        member.body.moveSpeed = Mer.Constants.AISpeed;
        member.animations.add('moveLeft', [0,1], 10, true);
        member.animations.add('moveRight', [2,3], 10, true);
        member.isFacing = 'left';
        member.name = 'member' + i;
    }
};

// net missile
// try net.outOfBoundsKill = true
Mer.Components.Net = function () {};

Mer.Components.Scale = function (image) {
    image.scale.x = Mer.Constants.gameScale;
    image.scale.y = Mer.Constants.gameScale;
};


Mer.Components.Background = function (game) {
    game.stage.smoothed = false;
    game.bg = game.add.sprite(0,0,game.backgroundKey);
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
