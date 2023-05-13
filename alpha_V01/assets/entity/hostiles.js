export class Hostile extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, type, player) {
        super(scene, type, player);
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.init();
        this.initEvents();
    }
    preload() {
        this.load.spritesheet('ennemisCaC', 'Sprite_fish_01.png',
            { frameWidth: 64, frameHeight: 62 });



    }


    create() {


        //position
        this.positionX=x+100
        this.positionY = y+Phaser.Math.Between(0, 500);  //me souviens plus des tailles de map, a corriger

        //gestion du type

        if (this.type=="distance"){
            this.ennemi = this.physics.add.sprite(this.positionX, this.positionY, 'ennemisDistance');

          
        }
        else {
            this.ennemi = this.physics.add.sprite(this.positionX, this.positionY, 'ennemisCaC');
        

        }

        this.ennemi.vie=2;


        //colider avec player
        this.physics.add.collider(this.player, this.ennemi, this.playerHit, null, this);




        //anims
        {
        //anims distance
        {
            this.anims.create({
                key: 'avanceDistance',
                frames: this.anims.generateFrameNumbers('distance', { start: 4, end: 7 }),
                frameRate: 5,
                repeat: -1
            });

            this.anims.create({
                key: 'attaqueDistance',
                frames: this.anims.generateFrameNumbers('distance', { start: 4, end: 7 }),
                frameRate: 5,
                repeat: -1
            });
            this.anims.create({
                key: 'PrendreUnCoupDistance',
                frames: this.anims.generateFrameNumbers('distance', { start: 4, end: 7 }),
                frameRate: 5,
                repeat: -1
            });
            this.anims.create({
                key: 'MortDistance',
                frames: this.anims.generateFrameNumbers('distance', { start: 4, end: 7 }),
                frameRate: 5,
                repeat: -1
            });
        }

        //anims Cac
        {
            this.anims.create({
                key: 'avanceCac',
                frames: this.anims.generateFrameNumbers('Cac', { start: 4, end: 7 }),
                frameRate: 5,
                repeat: -1
            });

            this.anims.create({
                key: 'attaqueCac',
                frames: this.anims.generateFrameNumbers('Cac', { start: 4, end: 7 }),
                frameRate: 5,
                repeat: -1
            });
            this.anims.create({
                key: 'PrendreUnCoupCac',
                frames: this.anims.generateFrameNumbers('Cac', { start: 4, end: 7 }),
                frameRate: 5,
                repeat: -1
            });
            this.anims.create({
                key: 'MortCac',
                frames: this.anims.generateFrameNumbers('Cac', { start: 4, end: 7 }),
                frameRate: 5,
                repeat: -1
            });
        }
    }







    }

    update(){

        //déplacements


        //attaque1

        //attaque2


        //prendreCoup

        //mort


    }


    playerHit(player,ennemi){

        
    }


}