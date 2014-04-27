Mer.MenuStage = function (game) {};
Mer.TankStage = function (game) {};
Mer.HallwayStage01 = function (game) {};
Mer.LoseStage = function (game) {};
Mer.WinStage = function (game) {};

Mer.MenuStage.prototype = Mer.StageConstructor.Menu('background');
Mer.LoseStage.prototype = Mer.StageConstructor.Menu('background');
Mer.WinStage.prototype = Mer.StageConstructor.Menu('background');

Mer.TankStage.prototype = Mer.StageConstructor.Lab('background',
                                                   [{x:20,y:20},{x:80,y:80}],
                                                   [{name: 'tank', x: 40, y: 80}]);

Mer.HallwayStage01.prototype = Mer.StageConstructor.Lab('background');
