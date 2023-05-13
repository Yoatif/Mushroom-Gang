//Import Scene
import { MainScreen } from "./scenes/mainScreen.js";
import { SceneTest } from "./scenes/sceneTest.js";
import { UiScene } from "./scenes/uiScene.js";
import { GameOver } from "./scenes/gameOver.js";
import { GameWin } from "./scenes/gameWin.js";

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
            debug: true,
        },
    },
    fps: {target: 60, forceSetTimeOut: true},
    //pixelArt: true,
    scene: [MainScreen, SceneTest, UiScene, GameOver, GameWin]
}

export var game = new Phaser.Game(config);