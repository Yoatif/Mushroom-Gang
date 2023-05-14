export class AttaqueCAC extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, type) {
        super(scene, x, y, "attaque_perso");
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.skin = type;

        this.init();
        this.initEvents();
    }

    init() {
        //Parametre
        this.body.setAllowGravity(false);
        this.setVisible(false);
        this.disapear = true;

        //Anims
        this.anims.create({
            key: 'cac_perso',
            frames: [{ key: 'attaque_perso', frame: 0 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'cac_linux',
            frames: [{ key: 'attaque_linux', frame: 0 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'cac_windows',
            frames: [{ key: 'attaque_windows', frame: 0 }],
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
            this.anims.play('cac_linux');
        }
        else if (this.skin == "windows" && this.disapear){
            this.anims.play('cac_windows', true);
        }
        else if (this.skin == "mobCaC" && this.disapear){
            this.anims.play('cac_perso', true);
        }
    }

    getSkin(skin, direction){
        this.skin = skin;
        this.direction = direction;
    }
}