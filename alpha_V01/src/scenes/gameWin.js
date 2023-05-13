export class GameWin extends Phaser.Scene {
    constructor() {
        super({
            key: 'gameWin',
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
        this.add.image(0, 0, "gameWin_png").setOrigin(0, 0);
    }

    update(){

    }
}

