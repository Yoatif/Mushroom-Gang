import { AttaqueCAC } from "./attaque_cac.js";
import { AttaqueDIST } from "./attaque_distance.js";
import { eventsCenter } from "../../src/script.js"
export class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, sprite) {
        super(scene, x, y, sprite);
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
                else if (this.cursors.right.isDown) {
                    this.setVelocityX(this.speed);
                    this.diretion = "right";
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
                else {
                    this.setVelocityX(0);
                    if (this.diretion == "left") {
                        if (this.type == "linux") {
                            this.anims.play("standby_left_linux")
                        }
                        else if (this.type == "windows") {
                            this.anims.play('standby_left_windows', true);
                        }
                        else if (this.type == "apple") {
                            this.anims.play('left_apple', true);
                        }
                    }
                    else if (this.diretion == "right"){
                        if (this.type == "linux") {
                            this.anims.play("standby_right_linux")
                        }
                        else if (this.type == "windows") {
                            this.anims.play('standby_right_windows', true);
                        }
                        else if (this.type == "apple") {
                            this.anims.play('right_apple', true);
                        }
                    }

                }


            }

            //Pary
            if (this.keyE.isDown && this.parry == false && this.inAction == false) {
                this.body.setVelocity(0, 0);
                this.parry = true;
                this.inAction = true;
                if (this.type == "linux") {
                    if (this.diretion == "left"){
                        this.anims.play("parry_left_linux", true);
                    }
                    else if (this.diretion == "right"){
                        this.anims.play("parry_right_linux", true);
                    }
                }
                else if (this.type == "windows") {
                    if (this.diretion == "left"){
                        this.anims.play("parry_left_windows", true);
                    }
                    else if (this.diretion == "right"){
                        this.anims.play("parry_right_windows", true);
                    }
                }
                else if (this.type == "apple") {
                    if (this.diretion == "left"){
                        this.anims.play("parry_left_apple", true);
                    }
                    else if (this.diretion == "right"){
                        this.anims.play("parry_right_apple", true);
                    }
                }
                this.scene.time.delayedCall(500, () => { this.parry = false; this.inAction = false }, [], this);
            }

            //Attaque CaC
            if (this.keyA.isDown && this.inAction == false && this.type != "apple") {
                this.inAction = true;
                this.body.setVelocity(0, 0);
                if (this.type == "linux") {
                    this.scene.sound.play("sound_cac_linux",{volume:0.002});
                    if (this.diretion == "left"){
                        this.anims.play("cac_left_linux", true);
                    }
                    else if (this.diretion == "right"){
                        this.anims.play("cac_right_linux", true);
                    }
                    this.scene.time.delayedCall(500, () => { this.inAction = false }, [], this);
                    this.scene.time.delayedCall(500, () => { this.attaque.destroy(); this.attaque.disapear = false }, [], this);
                }
                else if (this.type == "windows") {
                    this.scene.sound.play("sound_cac_windows",{volume:0.002});
                    if (this.diretion == "left"){
                        this.anims.play("cac_left_windows", true);
                    }
                    else if (this.diretion == "right"){
                        this.anims.play("cac_right_windows", true);
                    }
                    this.scene.time.delayedCall(500, () => { this.inAction = false }, [], this);
                    this.scene.time.delayedCall(500, () => { this.attaque.destroy(); this.attaque.disapear = false }, [], this);
                }
                if (this.diretion == "left") {
                    this.attaque = new AttaqueCAC(this.scene, this.x - (32 * this.scale), this.y - (8 * this.scale), this.type);
                }
                else if (this.diretion == "right") {
                    this.attaque = new AttaqueCAC(this.scene, this.x + (32 * this.scale), this.y - (8 * this.scale), this.type);
                }
                this.attaque.getSkin(this.type, this.diretion)
                this.attaque_cac.add(this.attaque);
            }

            //Attaque Distance
            if (this.keyZ.isDown && this.inAction == false && this.type != "windows") {
                this.inAction = true;
                this.body.setVelocity(0, 0);
                if (this.type == "linux") {
                    this.scene.sound.play("sound_tir_linux",{volume:0.005});
                    if (this.diretion == "left"){
                        this.anims.play("shoot_left_linux", true);
                        this.attaque = new AttaqueDIST(this.scene, this.x - (24 * this.scale), this.y - (8 * this.scale), this.type);
                        this.attaque.setFlipX(true);
                    }
                    else if (this.diretion == "right"){
                        this.anims.play("shoot_right_linux", true);
                        this.attaque = new AttaqueDIST(this.scene, this.x + (24 * this.scale), this.y - (8 * this.scale), this.type);
                    }
                    this.scene.time.delayedCall(500, () => { this.inAction = false }, [], this);
                }
                else if (this.type == "apple") {
                    this.scene.sound.play("sound_tir_apple",{volume:0.02});
                    if (this.diretion == "left"){
                        this.anims.play("shoot_left_apple", true);
                        this.attaque = new AttaqueDIST(this.scene, this.x - (24 * this.scale), this.y + (16 * this.scale), this.type);
                    }
                    else if (this.diretion == "right"){
                        this.anims.play("shoot_right_apple", true);
                        this.attaque = new AttaqueDIST(this.scene, this.x + (24 * this.scale), this.y + (16 * this.scale), this.type);
                    }
                    this.scene.time.delayedCall(700, () => { this.inAction = false }, [], this);
                }
                this.attaque_dist.add(this.attaque);
                this.attaque.getSkin(this.type, this.diretion);
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
            this.sound.play("sound_repair_cac", {volume:0.005});
            player.beHit = true;
            player.hp += 10;
            if (player.hp == 100) {
                this.sound.removeAll()
                player.alive = false;
                eventsCenter.emit('update-hp', player.hp);
                player.inAction = true;
                this.mob.children.each((mob)=>{
                    mob.vivant = false;
                });
                if (player.type == "linux") {
                    player.anims.play('repair_linux', true);
                    this.time.delayedCall(800, ()=>{this.scene.start("gameOver")}, [], this);
                }
                else if (player.type == "windows") {
                    player.anims.play('repair_windows', true);
                    this.time.delayedCall(800, ()=>{this.scene.start("gameOver")}, [], this);
                }
                else if (player.type == "apple") {
                    player.anims.play('repair_apple', true);
                    this.time.delayedCall(1400, ()=>{this.scene.start("gameOver")}, [], this);
                }
            }
            else {
                this.time.delayedCall(200, (player) => { player.beHit = false; }, [player], this);
            }
        }
        proj.disapear = false;
        proj.destroy();
    }

    loseHp() {
        this.scene.sound.play("sound_destroy", {volume:0.001});
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