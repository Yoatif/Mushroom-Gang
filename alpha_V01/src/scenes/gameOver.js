export class GameOver extends Phaser.Scene {
    constructor() {
        super({
            key: 'gameOver',
            physics: {
            default: 'arcade',
            arcade: { 
            gravity: { y: 0 }
            }}
        });
    }
    
    preload(){

    }
    

    create(){  
        this.add.image(0, 0, "gameOver_png").setOrigin(0, 0);
    }

    update(){

    }
}

