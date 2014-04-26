Mer.Components = {}

// for mermaids and scientists
Mer.Components.MoveLeft = function (obj) {
    obj.body.velocity.x = -obj.moveSpeed;
    obj.animations.play('left');
};

Mer.Components.MoveRight = function (obj) {
    obj.body.velocity.x = obj.moveSpeed;
    obj.animations.play('right');
};

// for mermaid's leap/attack
Mer.Components.Bash = function () {
    obj.animations.play('attack');
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
    if (action == 'left') obj.moveLeft(obj);
    if (action == 'right') obj.moveRight(obj);
    if (action == 'attack') obj.attack(obj);
};

// player triggerer
Mer.Components.PlayerKeys = function (game, obj) {
    obj.body.velocity.x = 0;
    if (game.cursors.left.isDown) return 'left';
    if (game.cursors.right.isDown) return 'right';
    if (game.bashButton.isDown) return 'attack';
};

// AI triggerer
Mer.Components.AIKeys = function () {};

Mer.Components.Player = function (game) {
    game.player = game.add.sprite(0,0,'mermaid');
    Mer.Components.Scale(game.player);
    game.physics.enable(game.player, Phaser.Physics.ARCADE);
    game.player.body.bounce.y = 0.1;
    game.player.body.collideWorldBounds = true;
    game.player.body.setSize(24,16,0,0);
    game.player.controller = Mer.Components.Controller;
    game.player.keys = Mer.Components.PlayerKeys;
    game.player.moveLeft = Mer.Components.MoveLeft;
    game.player.moveRight = Mer.Components.MoveRight;
    game.player.attack = Mer.Components.Bash;
    game.player.moveSpeed = Mer.Constants.playerSpeed;
    game.player.animations.add('left', [0,1], 10, true);
    game.player.animations.add('right', [2,3], 10, true);
    game.player.animations.add('attack', [4], 20, true);
};

Mer.Components.Scientist = function () {};

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
