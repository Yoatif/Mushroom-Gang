class Info extends Phaser.Scene{
    constructor(){
        super("Info");
    }

    init(){
            
    }
    
    preload(){

        this.load.image("background", "assets/menu/croquis_menu_start.png");
        this.load.spritesheet("menuButton", "../assets/menu/menu_button.png",
                {frameWidth: 128 ,frameHeight:64});
    }

    create(){

        //créer le clicksound
        this.clicksound = this.sound.add("button_sound", {volume: 0.8, loop: false});

        //créer le background
        this.add.image(800,400,"background");

        this.anims.create({
            key: 'titleMenu',
            frames: [{ key: 'menuButton', frame: 1 }],
            frameRate: 20
        });

        this.menuButton = this.physics.add.sprite(353, 54, 'menuButton').setInteractive();

        this.playButton.on("pointerdown", () => {
            this.clicksound.play()
            this.playButton.anims.play("titleMenu");
            //this.playButton.destroy
            //this.playButton = this.add.image(1350,200,"playButton2").setScale(0.5)
            this.time.delayedCall(1000, this.onEvent, [], this);
            console.log("titlescreen button")
               
        });


    }

    update(){

    }

    onEvent(){
        this.scene.start("Titlescreen")
    }
}