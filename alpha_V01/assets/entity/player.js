export class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "perso");
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.init();
        this.initEvents();
    }

    init() {
        //Variable 
        this.speed = 300;
        this.scale = 1;

        //Controle
        this.cursors = this.scene.input.keyboard.createCursorKeys(); //Déplacement huit direction
        this.keyA = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A); //Attaque CaC
        this.keyZ = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z); //Attaque Distance
        this.keyE = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E); //Parry
        
        //Parametre
        this.body.setMaxSpeed(300);
        this.setScale(2.5)
        this.setCollideWorldBounds(true);
    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update() {
        //Déplacement Vertical
        if (this.cursors.up.isDown){
            this.setVelocityY(-this.speed)
        }
        else if (this.cursors.down.isDown){
            this.setVelocityY(this.speed)
        }
        else {
            this.setVelocityY(0);
        }

        //Déplacement Horizontal
        if (this.cursors.left.isDown){
            this.setVelocityX(-this.speed)
        }
        else if (this.cursors.right.isDown){
            this.setVelocityX(this.speed)
        }
        else {
            this.setVelocityX(0);
        }

        //Gestion taille
        this.scale = (this.y * 2.5) / 1024
        this.setScale(this.scale)

    }


}