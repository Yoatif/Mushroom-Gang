//Import Scene
import { Preload } from "./scenes/preload.js";
import { MainScreen } from "./scenes/mainScreen.js";
import { Lore } from "./scenes/lore.js";
import { PlayerChoice } from "./scenes/playerChoice.js";
import { SceneTest } from "./scenes/sceneTest.js";
import { Level01 } from "./scenes/level_01.js";
import { Level02 } from "./scenes/level_02.js";
import { Level03 } from "./scenes/level_03.js";
import { UiScene } from "./scenes/uiScene.js";
import { GameOver } from "./scenes/gameOver.js";
import { GameWin } from "./scenes/gameWin.js";
import { Credit } from "./scenes/credit.js";

///EVENT EMITER///
export const eventsCenter = new Phaser.Events.EventEmitter()

//Creation Game
var config = {
    type: Phaser.AUTO,
    width: 1600, height: 1024,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false,
        },
    },
    fps: {target: 60, forceSetTimeOut: true},
    //pixelArt: true,
    scene: [Preload, MainScreen, PlayerChoice, Level01, Level02, Level03, SceneTest, UiScene, GameOver, GameWin, Credit, Lore]
}

export var game = new Phaser.Game(config);