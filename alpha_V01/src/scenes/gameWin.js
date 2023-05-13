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
        this.add.image(0, 0, "gameWin_png").setOrigin(0, 0);

        if (this.level != 3){
            this.nextLevel = this.add.image(100, 500, "startButton").setInteractive();
            this.nextLevel.on("pointerdown", this.goToNext, this);
        }
        else {
            this.reRun = this.add.image(500, 900, "reRunButton").setInteractive();
            this.reRun.on("pointerdown", this.reRunGame, this);
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
    
    reRunGame(){
        this.scene.start('mainScreen');
    }
}

