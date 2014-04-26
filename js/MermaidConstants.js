var Mer = {};

Mer.Constants = {};

Mer.Constants.gameScale = 4;

Mer.Constants.gameWidth = 128 * Mer.Constants.gameScale;
Mer.Constants.gameHeight = 120 * Mer.Constants.gameScale;

Mer.Constants.audioList = ['theme',
                           'title',
                           'beach',
                           'glass',
                           'bash'];

Mer.Constants.spriteList = [ ['mermaid', {w: 24, h: 16, no: 5}],
                             ['scientist', {w: 16,h: 16, no: 4}],
                             ['tank', {w: 40, h: 40, no: 2}],
                             ['fountain', {w: 24, h: 32, no: 2}],
                             ['toilet', {w: 24, h: 32, no: 3}] ];

Mer.Constants.imageList = ['background'];

Mer.Constants.gravity = 100;

Mer.Constants.playerSpeed = 400;
