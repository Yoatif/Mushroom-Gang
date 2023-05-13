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

        //Création Caméra
        this.physics.world.setBounds(0, 0, 1600, 1024);
        this.cameras.main.setBounds(0, 0, 1600, 1024);

    }

    update(){
        
    }
}