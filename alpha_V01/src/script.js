//Import Scene
import { Preload } from "scenes/preload.js";
import { MainScreen } from "scenes/mainScreen.js";

///EVENT EMITER///
export const eventsCenter = new Phaser.Events.EventEmitter()

//Creation Game
var config = {
    type: Phaser.AUTO,
    width: 1600, height: 900,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false,
        },
    },
    fps: {target: 60, forceSetTimeOut: true},
    //pixelArt: true,
    scene: [Preload, MainScreen]
}

export var game = new Phaser.Game(config);