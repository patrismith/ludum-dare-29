var Mer = {};

Mer.Constants = {};

// TODO: make some kind of record of where the mermaid should spawn
// when states start, they should call on that to place the mermaid
// instead of it being hardcoded

// TODO: make a record of what's been broken in each room
// break that obstacle when room spawns

Mer.Constants.gameScale = 4;

Mer.Constants.gameWidth = 128 * Mer.Constants.gameScale;
Mer.Constants.gameHeight = 120 * Mer.Constants.gameScale;

Mer.Constants.audioList = ['theme',
                           'title',
                           'beach',
                           'glass',
                           'death',
                           'bash',
                           'hit',
                           'net'];

Mer.Constants.spriteList = [ ['mermaid', {w: 24, h: 16, no: 6}],
                             ['scientist', {w: 16,h: 16, no: 5}],
                             ['tank', {w: 40, h: 40, no: 2}],
                             ['fountain', {w: 24, h: 32, no: 2}],
                             ['toilet', {w: 24, h: 32, no: 3}],
                             ['net', {w: 16, h: 16, no: 4}],
                             ['door', {w: 8, h: 16, no: 1}],
                             ['meter', {w: 128, h: 8, no: 1}] ];

Mer.Constants.imageList = ['background',
                           'oceanbg',
                           'tankbg',
                           'death',
                           'bathroom',
                           'hallway01',
                           'hallway02',
                           'hallway03',
                           'hallway04',
                           'fountain01',
                           'fountain02',
                           'lab01',
                           'lab02',
                           'lab03',
                           'lab04',
                           'lab05',
                           'lab06',
                           'lab07',
                           'lab08',
                           'lab09',
                           'lab10',
                           'win01',
                           'win02',
                           'win03',
                           'win04',
                           'win05',
                           'story01',
                           'story02',
                           'story03',
                           'story04',
                           'story05',
                           'lobby'
                          ];

Mer.Constants.gravity = 400;

Mer.Constants.playerSpeed = 300;
Mer.Constants.playerJump = 200;
Mer.Constants.playerMaxJump = 20;
Mer.Constants.playerBash = 400;

Mer.Constants.AISpeed = 50;
Mer.Constants.netDelay = 2000;
Mer.Constants.maxNets = 10;
Mer.Constants.caughtDelay = 2000;

Mer.Constants.netVelocityY = 300;
Mer.Constants.netVelocityX = 400;

Mer.Constants.maxHealth = 100;
Mer.Constants.decreaseDelay = 250;

Mer.Constants.lastPlayerX = 0;
Mer.Constants.playMusic = true;
