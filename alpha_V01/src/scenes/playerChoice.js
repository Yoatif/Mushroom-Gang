export class PlayerChoice extends Phaser.Scene{
    constructor(){
        super("playerChoice");
    }

    init(){
        this.selectedChara = "";
    }
    
    preload(){}

    create(){
        this.linuxChoice = this.add.image(200, 512, 'chara_linux').setInteractive().setScale(5);
        this.windowsChoice = this.add.image(800, 512, 'chara_windows').setInteractive().setScale(5);
        this.appleChoice = this.add.image(1400, 512, 'chara_apple').setInteractive().setScale(5);

        this.linuxChoice.on("pointerdown", () => {
            this.selectedChara = "linux";
            this.scene.start("level01", {
                level: 1,
                playerChoice: this.selectedChara,
                listChoice: ["linux", "apple", "windows"]
            });
        });

        this.windowsChoice.on("pointerdown", () => {
            this.selectedChara = "windows";
            this.scene.start("level01", {
                level: 1,
                playerChoice: this.selectedChara,
                listChoice: ["linux", "apple", "windows"]
            });
        });

        this.appleChoice.on("pointerdown", () => {
            this.selectedChara = "apple";
            this.scene.start("level01", {
                level: 1,
                playerChoice: this.selectedChara,
                listChoice: ["linux", "apple", "windows"]
            });
        });


    }

    update(){

    }

    onEvent(){
        this.scene.start("Titlescreen")
    }
}