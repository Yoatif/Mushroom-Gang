import { Player } from "../../assets/entity/player.js";
import { Hostile } from "../../assets/entity/hostiles.js";

export class Level02 extends Phaser.Scene {
    constructor() {
        super("level02");
    }

    init(data){
        this.level = data.level;
    }
    
    preload(){
        //Map Tiled
        this.load.image("tileset", "./maps/tilesetPlaceHolder.png");
        this.load.tilemapTiledJSON("level_02", "./assets/json/level_02.json");

        this.load.image("map2", "./assets/map_2.png");

    }

    create(){
        this.scene.run("ui-scene");
        //Load Tiled
        this.carteDuNiveau = this.add.tilemap("level_02");
        this.tileset = this.carteDuNiveau.addTilesetImage( "tileset", "tileset" );

        this.fond = this.carteDuNiveau.createLayer( "fond", this.tileset );
        this.sol = this.carteDuNiveau.createLayer( "sol", this.tileset );
        this.limite = this.carteDuNiveau.createLayer('limite', this.tileset);
        
        //SetCollision
        this.limite.setCollisionByProperty({estSolide: true});
        this.add.image(0, 0, "map2").setOrigin(0, 0).setScale(4);

        //Creation Joueur
        this.player = new Player(this, 150, 700);
        this.player.getType("linux");

        //affichage et fonction d'UN ennemi, code à regrouper avec des childrens pour en faire plusieurs
        {
        this.hostile1 = new Hostile(this, 500, 200,"Caccc");
        this.tir1 = this.physics.add.sprite(-50,-50,'perso')
        this.tir1.setScale(0.5)
        this.hostile1.getPlayer(this.player);
        this.hostile1.getTir(this.tir1);
        }

        //Fin Niveau
        this.broyeuse = this.physics.add.sprite(9952, 732, "broyeuse")

        //Création Collision
        this.physics.add.overlap(this.hostile1, this.player.attaque_cac, this.ennemiTouche, null, this);
        this.physics.add.overlap(this.hostile1, this.player.attaque_dist, this.ennemiTouche, null, this);
        this.physics.add.overlap(this.player, this.tir1, this.player.gainHp, this.player.immune, this);
        this.physics.add.collider(this.player, this.broyeuse, this.nextLevel, null, this);
        this.physics.add.collider(this.player, this.limite);

        //Création Caméra
        this.physics.world.setBounds(0, 0, 10080, 1024);
        this.cameras.main.setBounds(0, 0, 10080, 1024);
        this.cameras.main.startFollow(this.player);
    }

    update(){
        
    }

    nextLevel(){
        this.player.alive = false;
        this.scene.start("gameWin", {
            level: this.level+1
        });
    }

    playerFrappTouchePartir(hostile1, tir){
        console.log("tir ennemi touche")
        this.tir1.y=-50
    }

    ennemiTouche(hostile1, attaque){
        if(!hostile1.ennemiTouche){
            hostile1.ennemiTouche=true
            console.log("ennemi touche")
            hostile1.vie=hostile1.vie-1
            hostile1.setVelocityX(50)
            hostile1.setVelocityY(-50)
            setTimeout(() => {
                hostile1.ennemiTouche=false;


            }, 500);
        
        }
    }
}