Mer.MenuStage = function (game) {};
Mer.TankStage = function (game) {};
Mer.HallwayStage01 = function (game) {};
Mer.LoseStage = function (game) {};
Mer.WinStage = function (game) {};

Mer.MenuStage.prototype = Mer.StageConstructor.Menu();
Mer.LoseStage.prototype = Mer.StageConstructor.Menu();
Mer.WinStage.prototype = Mer.StageConstructor.Menu();

Mer.TankStage.prototype = Mer.StageConstructor.Lab();
Mer.HallwayStage01.prototype = Mer.StageConstructor.Lab();
