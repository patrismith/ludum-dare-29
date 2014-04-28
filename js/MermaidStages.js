Mer.MenuStage = function (game) {};
Mer.TankStage = function (game) {};
Mer.Hallway01Stage = function (game) {};
Mer.Hallway02Stage = function (game) {};
Mer.Hallway03Stage = function (game) {};
Mer.Hallway04Stage = function (game) {};
Mer.Lab01Stage = function (game) {};
Mer.Lab02Stage = function (game) {};
Mer.Lab03Stage = function (game) {};
Mer.Lab04Stage = function (game) {};
Mer.Lab05Stage = function (game) {};
Mer.Lab06Stage = function (game) {};
Mer.Lab07Stage = function (game) {};
Mer.Lab08Stage = function (game) {};
Mer.Lab09Stage = function (game) {};
Mer.Lab10Stage = function (game) {};
Mer.Fountain01Stage = function (game) {};
Mer.Fountain02Stage = function (game) {};
Mer.LobbyStage = function (game) {};
Mer.BeachStage = function (game) {};
Mer.DeathStage = function (game) {};
Mer.Win01Stage = function (game) {};
Mer.Win02Stage = function (game) {};
Mer.Win03Stage = function (game) {};
Mer.Win04Stage = function (game) {};
Mer.Win05Stage = function (game) {};
Mer.BathroomStage = function (game) {};
Mer.Story01Stage = function (game) {};
Mer.Story02Stage = function (game) {};
Mer.Story03Stage = function (game) {};
Mer.Story04Stage = function (game) {};
Mer.Story05Stage = function (game) {};

Mer.MenuStage.prototype = Mer.StageConstructor.Menu('Menu','background', 'Story01', 'title', true);
Mer.DeathStage.prototype = Mer.StageConstructor.Menu('Death', 'death', 'Menu', 'death', false, true);
Mer.Win01Stage.prototype = Mer.StageConstructor.Menu('Win01', 'win01', 'Win02', 'beach', true);
Mer.Win02Stage.prototype = Mer.StageConstructor.Menu('Win02', 'win02', 'Win03', null, true);
Mer.Win03Stage.prototype = Mer.StageConstructor.Menu('Win03', 'win03', 'Win04', null, true);
Mer.Win04Stage.prototype = Mer.StageConstructor.Menu('Win04', 'win04', 'Win05', null, true);
Mer.Win05Stage.prototype = Mer.StageConstructor.Menu('Win05', 'win05', 'Menu', null, false);
Mer.Story01Stage.prototype = Mer.StageConstructor.Menu('Story01', 'story01', 'Story02', null, true);
Mer.Story02Stage.prototype = Mer.StageConstructor.Menu('Story02', 'story02', 'Story03', null, true);
Mer.Story03Stage.prototype = Mer.StageConstructor.Menu('Story03', 'story03', 'Story04', null, true);
Mer.Story04Stage.prototype = Mer.StageConstructor.Menu('Story04', 'story04', 'Story05', null, true);
Mer.Story05Stage.prototype = Mer.StageConstructor.Menu('Story05', 'story05', 'Tank', null, true);


Mer.TankStage.prototype = Mer.StageConstructor.Lab('Tank','tankbg', 256,
                                                   [{x:70,y:100},{x:100,y:100}],
                                                   [{name: 'tank', x: 0, y: 80, water: true}],
                                                   [{leadsTo: 'Hallway01', x: 224, y:104, playerX: 10}],
                                                   true);
// make exits teleport the player to specific x y coords in the next room
Mer.Hallway01Stage.prototype = Mer.StageConstructor.Lab('Hallway01','hallway01', 512,
                                                   [{x:70,y:100},{x:100,y:100},{x:400,y:100}],
                                                   [],
                                                   [{leadsTo: 'Bathroom', x: 200, y:104, playerX: 10},
                                                    {leadsTo: 'Tank', x: 0, y:104, playerX: 224},
                                                    {leadsTo: 'Lab01', x: 500, y:104, playerX: 10}]);

Mer.Hallway02Stage.prototype = Mer.StageConstructor.Lab('Hallway02','hallway02', 512,
                                                   [{x:100,y:100},{x:200,y:100},{x:300,y:100},{x:400,y:100}],
                                                   [],
                                                   [{leadsTo: 'Lab03', x: 384, y:104, playerX: 10},
                                                    {leadsTo: 'Lab01', x: 0, y:104, playerX: 224},
                                                    {leadsTo: 'Lab02', x: 504, y:104, playerX: 10}]);

Mer.Hallway03Stage.prototype = Mer.StageConstructor.Lab('Hallway03','hallway03', 512,
                                                   [{x:30,y:100},{x:80,y:100},{x:400,y:100},{x:450,y:100}],
                                                   [],
                                                   [{leadsTo: 'Fountain01', x: 0, y:104, playerX: 224},
                                                    {leadsTo: 'Lab04', x: 504, y:104, playerX: 128}]);

Mer.Hallway04Stage.prototype = Mer.StageConstructor.Lab('Hallway04','hallway04', 512,
                                                   [{x:350,y:100},{x:400,y:100},{x:450,y:100},{x:500,y:100}],
                                                   [],
                                                   [{leadsTo: 'Lab10', x: 0, y:104, playerX: 120},
                                                    {leadsTo: 'Lobby', x: 500, y:104, playerX: 10}]);

Mer.Lab01Stage.prototype = Mer.StageConstructor.Lab('Lab01','lab01', 128,
                                                   [{x:70,y:100},{x:100,y:100}],
                                                   [],
                                                   [{leadsTo: 'Hallway02', x: 120, y:104, playerX: 10},
                                                    {leadsTo: 'Hallway01', x: 0, y:104, playerX: 490}]);

Mer.Lab02Stage.prototype = Mer.StageConstructor.Lab('Lab02','lab02', 128,
                                                   [{x:70,y:100}],
                                                   [],
                                                   [{leadsTo: 'Hallway02', x: 0, y:104, playerX: 500}]);

Mer.Lab03Stage.prototype = Mer.StageConstructor.Lab('Lab03','lab03', 128,
                                                   [{x:70,y:100}],
                                                   [],
                                                   [{leadsTo: 'Fountain01', x: 120, y:104, playerX: 10},
                                                    {leadsTo: 'Hallway02', x: 0, y:104, playerX: 384}]);

Mer.Lab04Stage.prototype = Mer.StageConstructor.Lab('Lab04','lab04', 256,
                                                   [{x:70,y:100},{x:200,y:100},{x:150,y:100}],
                                                   [],
                                                   [{leadsTo: 'Hallway03', x: 112, y:104, playerX: 500},
                                                    {leadsTo: 'Lab05', x: 0, y:104, playerX: 224},
                                                    {leadsTo: 'Lab08', x: 240, y:104, playerX: 10}]);

Mer.Lab05Stage.prototype = Mer.StageConstructor.Lab('Lab05','lab05', 256,
                                                   [{x:40,y:100},{x:90,y:100},{x:140,y:100}],
                                                   [],
                                                   [{leadsTo: 'Lab06', x: 56, y:104, playerX: 10},
                                                    {leadsTo: 'Lab07', x: 0, y:104, playerX: 120},
                                                    {leadsTo: 'Lab04', x: 240, y:104, playerX: 10}]);

Mer.Lab06Stage.prototype = Mer.StageConstructor.Lab('Lab06','lab06', 128,
                                                   [],
                                                   [],
                                                   [{leadsTo: 'Lab05', x: 0, y:104, playerX: 128}]);


Mer.Lab07Stage.prototype = Mer.StageConstructor.Lab('Lab07','lab07', 128,
                                                   [{x:70,y:100}],
                                                   [],
                                                   [{leadsTo: 'Lab05', x: 120, y:104, playerX: 10}]);


Mer.Lab08Stage.prototype = Mer.StageConstructor.Lab('Lab08','lab08', 128,
                                                   [{x:80,y:100}],
                                                   [],
                                                   [{leadsTo: 'Lab09', x: 120, y:104, playerX: 10},
                                                    {leadsTo: 'Lab04', x: 0, y:104, playerX: 236}]);


Mer.Lab09Stage.prototype = Mer.StageConstructor.Lab('Lab09','lab09', 128,
                                                   [{x:70,y:100},{x:90,y:100}],
                                                   [],
                                                   [{leadsTo: 'Fountain02', x: 120, y:104, playerX: 10},
                                                    {leadsTo: 'Lab08', x: 0, y:104, playerX: 120}]);


Mer.Lab10Stage.prototype = Mer.StageConstructor.Lab('Lab10','lab10', 128,
                                                   [{x:50,y:100},{x:120,y:100}],
                                                   [],
                                                   [{leadsTo: 'Hallway04', x: 120, y:104, playerX: 10},
                                                    {leadsTo: 'Fountain02', x: 0, y:104, playerX: 236}]);


Mer.BathroomStage.prototype = Mer.StageConstructor.Lab('Bathroom','bathroom', 128,
                                                      [],
                                                      [{name:'toilet',x:88,y:88, water:true},
                                                       {name:'toilet',x:112,y:88, water:true}],
                                                      [{leadsTo: 'Hallway01',x:0,y:104, playerX: 200}],
                                                      false);

Mer.BeachStage.prototype = Mer.StageConstructor.Lab('Beach','beachbg', 128,
                                                   [{x:70,y:100},{x:80,y:100}],
                                                   [],
                                                   []);


Mer.LobbyStage.prototype = Mer.StageConstructor.Lab('Lobby','lobby', 256,
                                                   [{x:70,y:100},{x:100,y:100},{x:200,y:100}],
                                                   [],
                                                   [{leadsTo: 'Win01', x: 248, y:104, playerX: 10},
                                                    {leadsTo: 'Hallway04', x: 0, y:104, playerX: 500}]);


Mer.Fountain01Stage.prototype = Mer.StageConstructor.Lab('Fountain01','fountain01', 128,
                                                   [{x:70,y:100},{x:120,y:100}],
                                                   [{name:'fountain',x:52,y:88, water:true}],
                                                   [{leadsTo: 'Hallway03', x: 120, y:104, playerX: 10},
                                                    {leadsTo: 'Lab03', x: 0, y:104, playerX: 224}]);


Mer.Fountain02Stage.prototype = Mer.StageConstructor.Lab('Fountain02','fountain02', 256,
                                                   [{x:100,y:100},{x:200,y:100}],
                                                   [{name:'fountain',x:112,y:90, water:true}],
                                                   [{leadsTo: 'Lab10', x: 248, y:104, playerX: 10},
                                                    {leadsTo: 'Lab09', x: 0, y:104, playerX: 120}]);
