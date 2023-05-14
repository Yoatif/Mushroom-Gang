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
        this.add.image(0, 0, "reRunButton").setInteractive().setOrigin(0,0);
    }

    update(){

    }

    reRunGame(){
        this.scene.start('mainScreen');
    }
}

