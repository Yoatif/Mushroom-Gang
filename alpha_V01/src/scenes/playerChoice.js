export class PlayerChoice extends Phaser.Scene{
    constructor(){
        super("playerChoice");
    }

    init(){
        this.selectedChara = "";
    }
    
    preload(){}

    create(){
        this.add.image(0,0,"ecranChoose").setOrigin(0,0);
        this.linuxChoice = this.physics.add.sprite(200, 600, 'linux').setInteractive().setScale(5);
        this.windowsChoice = this.physics.add.sprite(800, 600, 'windows').setInteractive().setScale(5);
        this.appleChoice = this.physics.add.sprite(1400, 600, 'apple').setInteractive().setScale(5);

        this.linuxLight = this.physics.add.sprite(200, 550, "light");
        this.linuxLight.setFrame(1);

        this.windowsLight = this.physics.add.sprite(800, 550, "light");
        this.windowsLight.setFrame(1);

        this.appleLight = this.physics.add.sprite(1400, 550, "light");
        this.appleLight.setFrame(1);

        this.linuxChoice.on("pointerdown", () => {
            this.selectedChara = "linux";
            this.scene.start("level01", {
                level: 1,
                playerChoice: this.selectedChara,
                listChoice: ["linux", "apple", "windows"]
            });
        });

        this.linuxChoice.on("pointerover", () => {
            this.linuxChoice.anims.play("right_linux", true);
            this.linuxLight.setFrame(0);
        });
        this.linuxChoice.on("pointerout", () => {
            this.linuxChoice.anims.stop();
            this.linuxChoice.setFrame(0);
            this.linuxLight.setFrame(1);
        });

        this.windowsChoice.on("pointerdown", () => {
            this.selectedChara = "windows";
            this.scene.start("level01", {
                level: 1,
                playerChoice: this.selectedChara,
                listChoice: ["linux", "apple", "windows"]
            });
        });

        this.windowsChoice.on("pointerover", () => {
            this.windowsChoice.anims.play("right_windows", true);
            this.windowsLight.setFrame(0);
        });
        this.windowsChoice.on("pointerout", () => {
            this.windowsChoice.anims.stop();
            this.windowsChoice.setFrame(0);
            this.windowsLight.setFrame(1);
        });

        this.appleChoice.on("pointerdown", () => {
            this.selectedChara = "apple";
            this.scene.start("level01", {
                level: 1,
                playerChoice: this.selectedChara,
                listChoice: ["linux", "apple", "windows"]
            });
        });

        this.appleChoice.on("pointerover", () => {
            this.appleChoice.anims.play("right_apple", true);
            this.appleLight.setFrame(0);
        });
        this.appleChoice.on("pointerout", () => {
            this.appleChoice.anims.stop();
            this.appleChoice.setFrame(0);
            this.appleLight.setFrame(1);
        });


    }

    update(){

    }

    onEvent(){
        this.scene.start("Titlescreen")
    }
}