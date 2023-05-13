import { Player } from "../../assets/entity/player.js";
import { Hostile } from "../../assets/entity/hostiles.js";

export class SceneTest extends Phaser.Scene {
    constructor() {
        super("sceneTest");
    }
    
    preload(){
        //Map Tiled
        this.load.image("tileset", "./maps/tilesetPlaceHolder.png");
        this.load.tilemapTiledJSON("sceneTest", "./assets/json/mapTest.json");

    }

    create(){
        //Load Tiled
        this.carteDuNiveau = this.add.tilemap("sceneTest");
        this.tileset = this.carteDuNiveau.addTilesetImage( "tileset", "tileset" );

        this.fond = this.carteDuNiveau.createLayer( "fond", this.tileset );
        this.sol = this.carteDuNiveau.createLayer( "sol", this.tileset );
        this.limite = this.carteDuNiveau.createLayer('limite', this.tileset);
        
        //SetCollision
        this.limite.setCollisionByProperty({estSolide: true});

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



  //      this.physics.add.overlap(this.player, this.tir1, this.playerFrappTouchePartir, null, this);
        
        this.physics.add.overlap(this.hostile1, this.player.attaque_cac, this.ennemiTouche, null, this);
        this.physics.add.overlap(this.hostile1, this.player.attaque_dist, this.ennemiTouche, null, this);
    



        //Création Caméra
        this.physics.world.setBounds(0, 0, 1600, 1024);
        this.cameras.main.setBounds(0, 0, 1600, 1024);
        this.cameras.main.startFollow(this.player);

        //Création Collision
        this.physics.add.collider(this.player, this.limite);
        

    }

    update(){
        
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
            setTimeout(() => {
                hostile1.ennemiTouche=false;



            }, 500);
        
        }
    }
}