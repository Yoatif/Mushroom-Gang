//Import Scene
import { MainScreen } from "./scenes/mainScreen.js";
import { SceneTest } from "./scenes/sceneTest.js";

///EVENT EMITER///
export const eventsCenter = new Phaser.Events.EventEmitter()

//Creation Game
var config = {
    type: Phaser.AUTO,
    width: 1600, height: 900,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false,
        },
    },
    fps: {target: 60, forceSetTimeOut: true},
    //pixelArt: true,
    scene: [MainScreen, SceneTest]
}

export var game = new Phaser.Game(config);