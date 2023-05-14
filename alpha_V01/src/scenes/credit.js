export class Credit extends Phaser.Scene {
    constructor() {
        super({
            key: 'credit',
            physics: {
            default: 'arcade',
            arcade: { 
            gravity: { y: 0 }
            }}
        });
    }

    preload(){}
    

    create(){
        this.sound.removeAll()

        this.add.image(0, 0, "ecranCredit").setOrigin(0, 0);
        this.restart = this.add.image(1380, 950, "reRunButton").setInteractive().setOrigin(0,0).setScale(0.15);
        this.restart.on("pointerdown", this.reRunGame, this)

    }

    update(){

    }

    reRunGame(){
        this.scene.start('mainScreen');
    }
}

