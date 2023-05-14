import { AttaqueDIST } from "./attaque_distance.js";
import { AttaqueCAC } from "./attaque_cac.js";
export class Hostile extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, typeE) {
        super(scene, x, y, "perso");
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.typeE = typeE;
        this.init();
        this.initEvents();
    }

    init() {
        this.player = null;
        this.ennemiTouche = false;
        this.vie = 3;
        this.vivant = true;
        this.attaque = null;
        this.cdAttack = true;
        this.start = true;
    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update() {
        if (this.start) {
            this.setVelocityY(100);
            this.setCollideWorldBounds(true);
            this.start = false;
        }
        //création en fonction du type
        if (this.vivant) {
            //Gestion taille
            this.scale = (this.y * 2.5) / 1024;
            this.setScale(this.scale);

            this.hitBoxY = (this.y * 64) / 1024;
            this.hitBoxX = (this.y * 32) / 1024;
            this.setSize(this.hitBoxX, this.hitBoxY);

            //calcul distance avec joueur
            const distance = Phaser.Math.Distance.Between(this.x, this.y, this.player.x, this.player.y);

            if (this.typeE == "cac") {
                if (distance < 80) {
                    this.setVelocityY(0)
                    this.setVelocityX(0)
                    if (this.cdAttack) {
                        if (this.x > this.player.x) {
                            this.attaque = new AttaqueCAC(this.scene, this.x - (32 * this.scale), this.y - (8 * this.scale), this.typeE);
                            this.attaque.getSkin(this.type, "left");
                        }
                        else {
                            this.attaque = new AttaqueCAC(this.scene, this.x + (32 * this.scale), this.y - (8 * this.scale), this.type);
                            this.attaque.getSkin(this.type, "right");
                        }
                        this.cdAttack = false;
                        this.scene.time.delayedCall(2000, () => { this.cdAttack = true }, [], this);
                        this.scene.physics.add.overlap(this.attaque, this.scene.player, this.scene.player.gainHp, this.scene.player.immune, this.scene);
                        this.scene.time.delayedCall(500, () => { this.attaque.destroy(); this.attaque.disapear = false }, [], this);
                    }

                }

                else if (distance < 400) { //mettre une detection plus loin ?
                    this.body.setVelocity(this.player.x - this.x, this.player.y - this.y);
                }
                else if (this.body.blocked.down) {
                    this.setVelocityY(-100)
                    this.setVelocityX(0)
                }
                else if (this.body.blocked.up) {
                    this.body.setVelocityY(100)
                    this.setVelocityX(0)

                } else {
                    this.setVelocityX(0)
                }
            }
            else if (this.typeE == "dist") {
                if (distance < 700) { //mettre une detection plus loin ?
                    this.setVelocityY(this.player.y - this.y);
                }
                else if (this.body.blocked.down) {
                    this.setVelocityY(-100)
                }
                else if (this.body.blocked.up) {
                    this.body.setVelocityY(100)
                }

                if (this.ennemiTouche == false) {
                    this.setVelocityX(0);
                }
                if (distance < 700) {
                    if ((-30 < this.player.y - this.y) && (this.player.y - this.y < 30)) {
                        if (this.cdAttack) {
                            if (this.x > this.player.x) {
                                this.attaque = new AttaqueDIST(this.scene, this.x - (32 * this.scale), this.y - (8 * this.scale), this.typeE);
                                this.attaque.getSkin(this.typeE, "left");
                            }
                            else {
                                this.attaque = new AttaqueDIST(this.scene, this.x + (32 * this.scale), this.y - (8 * this.scale), this.typeE);
                                this.attaque.getSkin(this.typeE, "right");
                            }
                            this.cdAttack = false;
                            this.scene.physics.add.overlap(this.attaque, this.scene.player, this.scene.player.gainHp, this.scene.player.immune, this.scene);
                            this.scene.time.delayedCall(2000, () => { this.cdAttack = true }, [], this);
                        }
                    }

                }
            }

            if (this.vie <= 0) {
                this.vivant = false;
                this.destroy()
            }
        }
    }

    getPlayer(player) {
        this.player = player
    }

}