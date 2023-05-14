export class AttaqueDIST extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, type) {
        super(scene, x, y, "proj_perso");
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.skin = type;

        this.init();
        this.initEvents();
    }

    init() {
        //Parametre
        this.body.setAllowGravity(false);
        this.disapear = true;
        this.skin = null;
        this.spawnX = this.x;

    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update() {
        //Gestion taille
        this.scale = (this.y * 2.5) / 1024;
        this.setScale(this.scale);

        //Gestion Skin
        if (this.skin == "linux" && this.disapear) {
            this.anims.play('dist_linux');
        }
        else if (this.skin == "windows" && this.disapear){
            this.anims.play('dist_windows', true);
        }
        else if (this.skin == "apple" && this.disapear){
            this.anims.play('dist_apple', true);
        }
        else if (this.skin == "dist" && this.disapear){
            this.anims.play('dist_perso', true);
        }

        if (this.direction == "left" && this.disapear && this.skin != "dist"){
            this.setVelocityX(-500);
        }
        else if (this.direction == "right" && this.disapear && this.skin != "dist"){
            this.setVelocityX(500);
        }
        else if (this.direction == "right" && this.disapear){
            this.setVelocityX(200);
        }
        else if (this.direction == "left" && this.disapear){
            this.setVelocityX(-200);
        }

        if (this.skin != "dist"){
            if (Phaser.Math.Distance.Between(this.spawnX, this.y, this.x, this.y) > 400){
                this.disapear = false;
                this.destroy();
            }
        }
    }

    getSkin(skin, direction){
        this.skin = skin;
        this.direction = direction;
    }
}