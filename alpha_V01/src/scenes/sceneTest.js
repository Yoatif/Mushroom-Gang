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

        this.hostile = new Hostile(this, 500, 200,"Caddc");
        this.tir = this.physics.add.sprite(-50,-50,'perso')
        this.tir.setScale(0.5)

        this.hostile.getPlayer(this.player);

        this.hostile.getTir(this.tir);

        this.physics.add.overlap(this.player, this.tir, this.playerFrappTouchePartir, null, this);

        //Création Caméra
        this.physics.world.setBounds(0, 0, 1600, 1024);
        this.cameras.main.setBounds(0, 0, 1600, 1024);
        this.cameras.main.startFollow(this.player);

        //Création Collision
        this.physics.add.collider(this.player, this.limite);

    }

    update(){
        
    }

    playerFrappTouchePartir(hostile, tir){
        console.log("tir touche")
        this.tir.y=-50
    }

}