export class AttaqueCAC extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, "attaque_perso");
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.init();
        this.initEvents();
    }

    init() {
        //Parametre
        this.body.setAllowGravity(false);
        this.disapear = false;

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
            key: 'cac_apple',
            frames: [{ key: 'attaque_apple', frame: 0 }],
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
        //this.scene.time.delayedCall(500, ()=>{ this.destroy() }, [], this);
    }

}