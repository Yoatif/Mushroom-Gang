class Titlescreen extends Phaser.Scene {
    constructor() {
        super("Titlescreen");
        }

        init(){
            this.timedEvent;

        }

        preload(){

            //import BG
            this.load.image("background", "assets/menu/croquis_menu_start.png");

            //import bouton
            this.load.spritesheet("playButton", "../assets/menu/start_button.png",
                {frameWidth: 128 ,frameHeight:64});
            this.load.spritesheet("optionButton", "../assets/menu/option_button.png",
                {frameWidth: 128 ,frameHeight:64});
            this.load.spritesheet("infoButton", "../assets/menu/info_button.png",
                {frameWidth: 128 ,frameHeight:64});
            this.load.spritesheet("quitButton", "../assets/menu/quit_button.png",
                {frameWidth: 128 ,frameHeight:64});
            


            // import audio

            //this.load.audio("theme", ["sound/theme.ogg", "sound/theme.mp3"]);
            this.load.audio("button_sound", ["sound/click_button.ogg", "sound/click_button.mp3"]);

        }

        create(){
            

            //adding theme to Titlescreen
            //this.theme = this.sound.add("theme", {volume: 0.2, loop: true});
            //this.theme.play();

            //button_sound
            this.clicksound = this.sound.add("button_sound", {volume: 0.8, loop: false});
            


            this.add.image(800,400,"background");

            //creating animated button
            this.anims.create({
                key: 'startGame',
                frames: [{ key: 'playButton', frame: 1 }],
                frameRate: 20
            });
            this.anims.create({
                key: 'optionWindow',
                frames: [{ key: 'optionButton', frame: 1 }],
                frameRate: 20
            });
            this.anims.create({
                key: 'infoWindow',
                frames: [{ key: 'infoButton', frame: 1 }],
                frameRate: 20
            });
            this.anims.create({
                key: 'quitGame',
                frames: [{ key: 'quitButton', frame: 1 }],
                frameRate: 20
            });
                
            //creating start button to play game
            this.playButton = this.physics.add.sprite(353, 54, 'playButton').setInteractive();

            this.playButton.on("pointerdown", () => {
                this.clicksound.play()
                this.playButton.anims.play("startGame");
                //this.playButton.destroy
                //this.playButton = this.add.image(1350,200,"playButton2").setScale(0.5)
                this.time.delayedCall(1000, this.eventPlay, [], this);
                console.log("play")
                   
            });
            this.playButton.setScale(0.5);

            //creating exit button which close the game
            this.exitbutton = this.add.image(1350,600, "exitbutton").setInteractive();

            this.exitbutton.on("pointerdown", () => {
                this.clicksound.play()
                this.exitbutton.anims.play("quitButton");
                this.time.delayedCall(1000, this.eventQuit, [], this);
                
                 
            })
            this.exitbutton.setScale(0.5);


            //creating info button who start info scene
            this.infobutton = this.add.image(250,400, "infobutton").setInteractive();

            this.infobutton.on("pointerdown", () => {
                this.clicksound.play()
                this.infobutton.play("infoButton")
                this.time.delayedCall(1000, this.eventInfo, [], this);                
            })
            this.infobutton.setScale(0.5);


            //creating info button who start info scene
            this.optionbutton = this.add.image(250,400, "optionbutton").setInteractive();

            this.optionbutton.on("pointerdown", () => {
                this.clicksound.play()
                this.optionbutton.play("optionButton")
                this.time.delayedCall(1000, this.eventOption, [], this);                
            })
            this.optionbutton.setScale(0.5);

            
        }

        update(){

            /*if (this.cursors.space.isDown){
                this.scene.start("scene1");*/

        }

        eventPlay(){
            this.scene.start("Scene1");
        }

        eventInfo(){
            this.scene.start("Info");
        }
        eventOption(){
            this.scene.start("Option");
        }

        eventQuit(){
            window.close()
        }

      
}