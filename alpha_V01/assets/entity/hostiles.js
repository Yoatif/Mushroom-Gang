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
        this.player = null

        this.setScale(2)
        this.setCollideWorldBounds(true);
        this.setVelocityY(50)
    }

    initEvents() {
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    }

    update() {


        

        const distance = Phaser.Math.Distance.Between(this.x, this.y, this.player.x, this.player.y);

        if (this.typeE == "Cac") {
            if (distance < 80) {
                this.setVelocityY(0)
                this.setVelocityX(0)
                console.log("touche !")
                //play anim frappe



            }


            else if (distance < 250) { //mettre une detection plus loin ?
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


        } else {
            if (distance < 500) { //mettre une detection plus loin ?
                this.setVelocityY( this.player.y - this.y);
            }

            else if (this.body.blocked.up) {
                this.body.setVelocityY(100)
                this.setVelocityX(0)

            } else {
                this.setVelocityX(0)

            }

            if((-20<this.player.y-this.y) && (this.player.y-this.y<20)){
                console.log("qdghquifgjqsbgqghbqjkgbkjbf")

            }


        }


    }

    getPlayer(player) {

        this.player = player
    }


}