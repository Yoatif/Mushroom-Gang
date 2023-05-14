export class Lore extends Phaser.Scene {
    constructor() {
        super({
            key: 'lore',
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

        this.add.image(0, 0, "ecranLore").setOrigin(0, 0);
        this.restart = this.add.image(1380, 950, "startButton").setInteractive().setOrigin(0,0).setScale(0.15);
        this.restart.on("pointerdown", this.start,this)

    }

    update(){

    }

    start(){
        this.scene.start('playerChoice');
    }
}

