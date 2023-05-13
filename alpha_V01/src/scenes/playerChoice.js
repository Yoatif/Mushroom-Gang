class PlayerChoice extends Phaser.Scene{
    constructor(){
        super("PlayerChoice");
    }

    init(){
        this.selectedChara = "";
            
    }
    
    preload(){}

    create(){

        //créer le clicksound
        this.clicksound = this.sound.add("button_sound", {volume: 0.8, loop: false});

        //créer le background
        this.add.image(800,400,"fond_playerChoice");

        

        this.tuxChoice = this.physics.add.sprite(353, 54, 'tux').setInteractive();

        this.tuxButton.on("pointerdown", () => {
            this.clicksound.play()
            this.tuxButton.anims.play("tuxAnims");
            this.selectedChara = "tux";
            //this.playButton.destroy
            //this.playButton = this.add.image(1350,200,"playButton2").setScale(0.5)
            console.log("TUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUX!!!")
        });

        this.windaubeChoice = this.physics.add.sprite(353, 54, 'windaube').setInteractive();

        this.windaubeButton.on("pointerdown", () => {
            this.clicksound.play()
            this.windaubeButton.anims.play("windaubeAnims");
            this.selectedChara = "windaube";
            //this.playButton.destroy
            //this.playButton = this.add.image(1350,200,"playButton2").setScale(0.5)
            console.log("Windaube de ses quarante-deux!!!")
        });

        this.macChoice = this.physics.add.sprite(353, 54, 'mac').setInteractive();

        this.macButton.on("pointerdown", () => {
            this.clicksound.play()
            this.macButton.anims.play("macAnims");
            this.selectedChara = "mac";
            //this.playButton.destroy
            //this.playButton = this.add.image(1350,200,"playButton2").setScale(0.5)
           
            console.log("mac!!!")
               
        });


    }

    update(){

    }

    onEvent(){
        this.scene.start("Titlescreen")
    }
}