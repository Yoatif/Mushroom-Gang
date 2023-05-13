import { AttaqueCAC } from "./attaque_cac.js";
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
        this.type = "";
        this.speed = 300;
        this.scale = 1;
        this.parry = false;
        this.inAction = false;
        this.diretion = "right";
        this.attaque_cac = new Phaser.GameObjects.Group;
        this.attaque = null;

        //Controle
        this.cursors = this.scene.input.keyboard.createCursorKeys(); //Déplacement huit direction
        this.keyA = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A); //Attaque CaC
        this.keyZ = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z); //Attaque Distance
        this.keyE = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E); //Parry

        //Parametre
        this.setOrigin(0.5, 0.5)
        this.body.setMaxSpeed(300);
        this.setCollideWorldBounds(true);

        //Animation
        if (true) {
            //linux
            this.anims.create({
                key: 'left_linux',
                frames: [{ key: 'perso_linux', frame: 0 }],
                frameRate: 20
            });
            this.anims.create({
                key: 'right_linux',
                frames: [{ key: 'perso_linux', frame: 1 }],
                frameRate: 20
            });
            this.anims.create({
                key: 'parry_linux',
                frames: [{ key: 'perso_linux', frame: 2 }],
                frameRate: 20
            });
            this.anims.create({
                key: 'shoot_linux',
                frames: [{ key: 'perso_linux', frame: 3 }],
                frameRate: 20
            });
            this.anims.create({
                key: 'cac_linux',
                frames: [{ key: 'perso_linux', frame: 4 }],
                frameRate: 20
            });

            //Windows
            this.anims.create({
                key: 'left_windows',
                frames: [{ key: 'perso_windows', frame: 0 }],
                frameRate: 20
            });
            this.anims.create({
                key: 'right_windows',
                frames: [{ key: 'perso_windows', frame: 1 }],
                frameRate: 20
            });
            this.anims.create({
                key: 'parry_windows',
                frames: [{ key: 'perso_windows', frame: 2 }],
                frameRate: 20
            });
            this.anims.create({
                key: 'shoot_windows',
                frames: [{ key: 'perso_windows', frame: 3 }],
                frameRate: 20
            });
            this.anims.create({
                key: 'cac_windows',
                frames: [{ key: 'perso_windows', frame: 4 }],
                frameRate: 20
            });

            //Apple
            this.anims.create({
                key: 'left_apple',
                frames: [{ key: 'perso_apple', frame: 0 }],
                frameRate: 20
            });
            this.anims.create({
                key: 'right_apple',
                frames: [{ key: 'perso_apple', frame: 1 }],
                frameRate: 20
            });
            this.anims.create({
                key: 'parry_apple',
                frames: [{ key: 'perso_apple', frame: 2 }],
                frameRate: 20
            });
            this.anims.create({
                key: 'shoot_apple',
                frames: [{ key: 'perso_apple', frame: 3 }],
                frameRate: 20
            });
            this.anims.create({
                key: 'cac_apple',
                frames: [{ key: 'perso_apple', frame: 4 }],
                frameRate: 20
            });
        }

    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update() {
        if (this.inAction == false) {
            //Déplacement Vertical
            if (this.cursors.up.isDown) {
                this.setVelocityY(-this.speed)
            }
            else if (this.cursors.down.isDown) {
                this.setVelocityY(this.speed)
            }
            else {
                this.setVelocityY(0);
            }

            //Déplacement Horizontal
            if (this.cursors.left.isDown) {
                this.setVelocityX(-this.speed)
                this.diretion = "left";
            }
            else if (this.cursors.right.isDown) {
                this.setVelocityX(this.speed);
                this.diretion = "right";
            }
            else {
                this.setVelocityX(0);
            }

            //Anims
            if (this.diretion == "left") {
                if (this.type == "linux") {
                    this.anims.play('left_linux', true);
                }
                else if (this.type == "windows"){
                    this.anims.play('left_windows', true);
                }
                else if (this.type == "apple"){
                    this.anims.play('left_apple', true);
                }

            }
            else if (this.diretion == "right") {
                if (this.type == "linux") {
                    this.anims.play('right_linux', true);
                }
                else if (this.type == "windows"){
                    this.anims.play('right_windows', true);
                }
                else if (this.type == "apple"){
                    this.anims.play('right_apple', true);
                }
            }
        }

        //Pary
        if (this.keyE.isDown && this.parry == false && this.inAction == false) {
            this.body.setVelocity(0, 0);
            this.parry = true;
            this.inAction = true;
            if (this.type == "linux") {
                this.anims.play('parry_linux', true);
            }
            else if (this.type == "windows"){
                this.anims.play('parry_windows', true);
            }
            else if (this.type == "apple"){
                this.anims.play('parry_apple', true);
            }
            this.scene.time.delayedCall(500, () => { this.parry = false; this.inAction = false }, [], this);
        }

        //Attaque CaC
        if (this.keyA.isDown && this.inAction == false){
            this.inAction = true;
            this.body.setVelocity(0, 0);
            if (this.type == "linux") {
                this.anims.play('shoot_linux', true);
                if (this.diretion == "left"){
                    this.attaque = new AttaqueCAC(this.scene, this.x, this.y);
                }
                else if (this.diretion == "right"){
                    this.attaque = new AttaqueCAC(this.scene, this.x, this.y);
                }
                this.scene.time.delayedCall(500, ()=>{ this.attaque.destroy() }, [], this);
                this.attaque_cac.add(this.attaque);
            }
            else if (this.type == "windows"){
                this.anims.play('shoot_windows', true);
            }
            else if (this.type == "apple"){
                this.anims.play('shoot_apple', true);
            }
            this.scene.time.delayedCall(500, () => { this.inAction = false }, [], this);
        }

        //Gestion taille
        this.scale = (this.y * 2.5) / 1024;
        this.setScale(this.scale);

        this.hitBoxY = (this.y * 64) / 1024;
        this.hitBoxX = (this.y * 32) / 1024;
        this.setSize(this.hitBoxX, this.hitBoxY);

    }

    getType(type) {
        this.type = type;
    }

}