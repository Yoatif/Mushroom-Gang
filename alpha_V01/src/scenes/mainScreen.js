export class MainScreen extends Phaser.Scene {
    constructor() {
        super({
            key: 'mainScreen',
            physics: {
            default: 'arcade',
            arcade: { 
            gravity: { y: 0 }
            }}
        });
    }
    
    preload(){
        //Mainscreen
        this.load.image("startButton", "./assets/launchGame.png");

        //SpriteSheet
        this.load.spritesheet('perso', './assets/spriteSheet_Player.png',
            { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('perso_linux', './assets/spriteSheetTest_Linux.png',
            { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('perso_windows', './assets/spriteSheetTest_Windows.png',
            { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('perso_apple', './assets/spriteSheetTest_Apple.png',
            { frameWidth: 32, frameHeight: 64 });

        this.load.spritesheet('attaque_perso', './assets/spriteSheetTest_Apple.png',
            { frameWidth: 32, frameHeight: 16 });
        this.load.spritesheet('attaque_apple', './assets/spriteSheetTest_Apple.png',
            { frameWidth: 32, frameHeight: 16 });
        this.load.spritesheet('attaque_apple', './assets/spriteSheetTest_Apple.png',
            { frameWidth: 32, frameHeight: 16 });
        this.load.spritesheet('attaque_apple', './assets/spriteSheetTest_Apple.png',
            { frameWidth: 32, frameHeight: 16 });
    }

    create(){
        //Add Image
        this.launchButton = this.add.image(350, 500, "startButton").setInteractive().setScale(1.25).setOrigin( 0, 0);

        //Create Interaction
        this.launchButton.on("pointerdown", this.launchGame, this);
    }

    update(){

    }

    launchGame() {
        this.scene.start("sceneTest");
    }
}

