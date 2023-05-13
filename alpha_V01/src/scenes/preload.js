export class Preload extends Phaser.Scene {
    constructor() {
        super("preload");
    }
    
    preload(){
        
    }

    create(){
        
    }

    update(){
        this.scene.start("mainScreen");
    }
}