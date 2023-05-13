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
        //Add Image
        this.launchButton = this.add.image(800, 600, "startButton").setInteractive().setScale(0.5).setOrigin(0.5, 0.5);

        //Create Interaction
        this.launchButton.on("pointerdown", this.launchGame, this);
    }

    update() {

    }

    launchGame() {
        this.scene.start("playerChoice");
    }
}

