Mer.MenuStage = function (game) {};
Mer.TankStage = function (game) {};
Mer.Hallway01Stage = function (game) {};
Mer.Hallway02Stage = function (game) {};
Mer.Hallway03Stage = function (game) {};
Mer.Hallway04Stage = function (game) {};
Mer.LoseStage = function (game) {};
Mer.WinStage = function (game) {};
Mer.BathroomStage = function (game) {};

Mer.MenuStage.prototype = Mer.StageConstructor.Menu('Menu','background', 'Tank');
Mer.LoseStage.prototype = Mer.StageConstructor.Menu('background');
Mer.WinStage.prototype = Mer.StageConstructor.Menu('background');

Mer.TankStage.prototype = Mer.StageConstructor.Lab('Tank','background',
                                                   [{x:70,y:100},{x:80,y:100}],
                                                   [{name: 'tank', x: 0, y: 80, water: true}],
                                                   [{leadsTo: 'Hallway01', x: 220, y:104, playerX: 10}],
                                                   true);
// make exits teleport the player to specific x y coords in the next room
Mer.Hallway01Stage.prototype = Mer.StageConstructor.Lab('Hallway01','background',
                                                   [{x:70,y:100},{x:80,y:100}],
                                                   [],
                                                   [{leadsTo: 'Bathroom', x: 100, y:104, playerX: 10},
                                                    {leadsTo: 'Tank', x: 0, y:104, playerX: 200}],
                                                   true);

Mer.BathroomStage.prototype = Mer.StageConstructor.Lab('Bathroom','background',
                                                      //{x:20,y:104},
                                                      [],
                                                      [{name:'toilet',x:60,y:90, water:true}],
                                                      [{leadsTo: 'Hallway01',x:0,y:104, playerX: 100}],
                                                      false);
