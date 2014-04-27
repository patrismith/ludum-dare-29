Mer.MenuStage = function (game) {};
Mer.TankStage = function (game) {};
Mer.HallwayStage01 = function (game) {};
Mer.LoseStage = function (game) {};
Mer.WinStage = function (game) {};
Mer.BathroomStage = function (game) {};

Mer.MenuStage.prototype = Mer.StageConstructor.Menu('background');
Mer.LoseStage.prototype = Mer.StageConstructor.Menu('background');
Mer.WinStage.prototype = Mer.StageConstructor.Menu('background');

Mer.TankStage.prototype = Mer.StageConstructor.Lab('background',
                                                   {x:0,y:104},
                                                   [{x:70,y:100},{x:80,y:100}],
                                                   [{name: 'tank', x: 0, y: 80}],
                                                   [{leadsTo: 'Bathroom', x: 200, y:104}],
                                                   true);

Mer.HallwayStage01.prototype = Mer.StageConstructor.Lab('background');

Mer.BathroomStage.prototype = Mer.StageConstructor.Lab('background',
                                                      {x:20,y:104},
                                                      [],
                                                      [{name:'toilet',x:60,y:90}],
                                                      [{leadsTo: 'Tank',x:0,y:104}],
                                                      false);
