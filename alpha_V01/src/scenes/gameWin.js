import { eventsCenter } from "../script.js";
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

    init(data){
        this.level = data.level;
        this.listChoice = data.listChoice;
    }
    
    preload(){}
    

    create(){
        this.sound.removeAll()
        this.sound.add("victory", { volume: 0.5 }).play();
        eventsCenter.emit('hide-hp');

        if (this.level != 3){
            this.add.image(0, 0, "gameWin_png").setOrigin(0, 0);
            this.time.delayedCall(5000, this.goToNext, [], this);
        }
        else {
            this.add.image(0, 0, "ecranFinalWin").setOrigin(0, 0);
            this.time.delayedCall(5000, this.goToCredit, [], this);
        }
    }

    update(){

    }

    goToNext(){
        if (this.level == 1){
            this.scene.start("level02", {
                level: this.level + 1,
                listChoice: this.listChoice
            });
        }
        else if (this.level == 2){
            this.scene.start("level03", {
                level: this.level + 1,
                listChoice: this.listChoice
            });
        }
    }

    goToCredit(){
        this.scene.start("credit");
    }
    
    reRunGame(){
        this.scene.start('mainScreen');
    }
}

