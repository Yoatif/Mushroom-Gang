export class MainScreen extends Phaser.Scene {
    constructor() {
        super({
            key: 'mainScreen',
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 0 }
                }
            }
        });
    }

    preload() { }


    create() {
        this.sound.add("theme", { volume: 0.0002, loop: true }).play();
        //Add Image
        this.add.image(0, 0,"ecranStart").setOrigin(0,0)
        this.launchButton = this.add.image(800, 700, "startButton").setInteractive().setScale(0.5).setOrigin(0.5, 0.5);

        //Create Interaction
        this.launchButton.on("pointerdown", this.launchGame, this);
    }

    update() {

    }

    launchGame() {
        this.scene.start("playerChoice");
    }
}

