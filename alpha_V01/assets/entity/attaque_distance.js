export class AttaqueDIST extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "proj_perso");
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.init();
        this.initEvents();
    }

    init() {
        //Parametre
        this.body.setAllowGravity(false);
        this.disapear = true;
        this.skin = null;
        this.spawnX = this.x;

        //Anims
        this.anims.create({
            key: 'dist_perso',
            frames: [{ key: 'proj_perso', frame: 0 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'dist_linux',
            frames: [{ key: 'proj_linux', frame: 0 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'dist_apple',
            frames: [{ key: 'proj_apple', frame: 0 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'dist_windows',
            frames: [{ key: 'proj_windows', frame: 0 }],
            frameRate: 20
        });
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

        if (this.direction == "left" && this.disapear){
            this.setVelocityX(-500);
        }
        else if (this.direction == "right" && this.disapear){
            this.setVelocityX(500);
        }

        if (Phaser.Math.Distance.Between(this.spawnX, this.y, this.x, this.y) > 400){
            this.disapear = false;
            this.destroy();
        }
    }

    getSkin(skin, direction){
        this.skin = skin;
        this.direction = direction;
    }
}