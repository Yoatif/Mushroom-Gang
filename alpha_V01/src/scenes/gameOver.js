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

        this.reRun = this.add.image(800, 600, "reRunButton").setInteractive().setScale(0.5).setOrigin(0.5, 0.5);
            this.reRun.on("pointerdown", this.reRunGame, this);
    }

    update(){

    }

    reRunGame(){
        this.scene.start('mainScreen');
    }
}

