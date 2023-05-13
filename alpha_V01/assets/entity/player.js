import { AttaqueCAC } from "./attaque_cac.js";
import { AttaqueDIST } from "./attaque_distance.js";
import { eventsCenter } from "../../src/script.js"
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
        this.alive = true;
        this.hp = 50;
        this.type = "";
        this.speed = 500;
        this.scale = 1;
        this.parry = false;
        this.inAction = false;
        this.diretion = "right";
        this.attaque_cac = new Phaser.GameObjects.Group;
        this.attaque_dist = new Phaser.GameObjects.Group;
        this.attaque = null;

        //Controle
        this.cursors = this.scene.input.keyboard.createCursorKeys(); //Déplacement huit direction
        this.keyA = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A); //Attaque CaC
        this.keyZ = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z); //Attaque Distance
        this.keyE = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E); //Parry

        //Parametre
        this.setOrigin(0.5, 0.5)
        this.body.setMaxSpeed(this.speed);
        this.setCollideWorldBounds(true);

    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update() {
        if (this.alive) {
            eventsCenter.emit('update-hp', this.hp);
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
                    else if (this.type == "windows") {
                        this.anims.play('left_windows', true);
                    }
                    else if (this.type == "apple") {
                        this.anims.play('left_apple', true);
                    }

                }
                else if (this.diretion == "right") {
                    if (this.type == "linux") {
                        this.anims.play('right_linux', true);
                    }
                    else if (this.type == "windows") {
                        this.anims.play('right_windows', true);
                    }
                    else if (this.type == "apple") {
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
                else if (this.type == "windows") {
                    this.anims.play('parry_windows', true);
                }
                else if (this.type == "apple") {
                    this.anims.play('parry_apple', true);
                }
                this.scene.time.delayedCall(500, () => { this.parry = false; this.inAction = false }, [], this);
            }

            //Attaque CaC
            if (this.keyA.isDown && this.inAction == false && this.type != "apple") {
                this.inAction = true;
                this.body.setVelocity(0, 0);
                if (this.type == "linux") {
                    this.anims.play('cac_linux', true);
                }
                else if (this.type == "windows") {
                    this.anims.play('cac_windows', true);
                }
                else if (this.type == "apple") {
                    this.anims.play('cac_apple', true);
                }
                if (this.diretion == "left") {
                    this.attaque = new AttaqueCAC(this.scene, this.x - (32 * this.scale), this.y - (8 * this.scale), this.type);
                }
                else if (this.diretion == "right") {
                    this.attaque = new AttaqueCAC(this.scene, this.x + (32 * this.scale), this.y - (8 * this.scale), this.type);
                }
                this.attaque.getSkin(this.type, this.diretion)
                this.scene.time.delayedCall(500, () => { this.attaque.destroy(); this.attaque.disapear = false }, [], this);
                this.attaque_cac.add(this.attaque);
                this.scene.time.delayedCall(500, () => { this.inAction = false }, [], this);
            }

            //Attaque Distance
            if (this.keyZ.isDown && this.inAction == false && this.type != "windows") {
                this.inAction = true;
                this.body.setVelocity(0, 0);
                if (this.type == "linux") {
                    this.anims.play('shoot_linux', true);
                }
                else if (this.type == "windows") {
                    this.anims.play('shoot_windows', true);
                }
                else if (this.type == "apple") {
                    this.anims.play('shoot_apple', true);
                }
                if (this.diretion == "left") {
                    this.attaque = new AttaqueDIST(this.scene, this.x - (24 * this.scale), this.y - (8 * this.scale), this.type);
                }
                else if (this.diretion == "right") {
                    this.attaque = new AttaqueDIST(this.scene, this.x + (24 * this.scale), this.y - (8 * this.scale), this.type);
                }
                this.attaque_dist.add(this.attaque);
                this.attaque.getSkin(this.type, this.diretion);
                this.scene.time.delayedCall(500, () => { this.inAction = false }, [], this);
            }

            //Gestion taille
            this.scale = (this.y * 2.5) / 1024;
            this.setScale(this.scale);

            this.hitBoxY = (this.y * 64) / 1024;
            this.hitBoxX = (this.y * 32) / 1024;
            this.setSize(this.hitBoxX, this.hitBoxY);
        }



    }

    getType(type) {
        this.type = type;
    }

    gainHp(proj, player) {
        if (player.parry == false) {
            player.beHit = true;
            this.time.delayedCall(200, (player) => { player.beHit = false; }, [player], this);
            player.hp += 10;
            if (player.hp == 100) {
                this.scene.start("gameOver");
            }
        }
        proj.y = -50;
    }

    loseHp() {
        this.hp -= 10
    }

    immune(player) {
        if (player.beHit == true) {
            return false;
        }
        else {
            return true;
        }
    }

}