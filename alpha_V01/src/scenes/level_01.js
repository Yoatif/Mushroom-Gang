import { Player } from "../../assets/entity/player.js";
import { Hostile } from "../../assets/entity/hostiles.js";

export class Level01 extends Phaser.Scene {
    constructor() {
        super("level01");
    }
    
    init(data){
        this.level = data.level;
    }

    preload(){
        //Map Tiled
        this.load.image("tileset", "./maps/tilesetPlaceHolder.png");
        this.load.tilemapTiledJSON("level_01", "./assets/json/level_01.json");

        this.load.image("map1", "./assets/map_1.png");

    }

    create(){
        this.scene.run("ui-scene");
        //Load Tiled
        this.carteDuNiveau = this.add.tilemap("level_01");
        this.tileset = this.carteDuNiveau.addTilesetImage( "tileset", "tileset" );

        this.fond = this.carteDuNiveau.createLayer( "fond", this.tileset );
        this.sol = this.carteDuNiveau.createLayer( "sol", this.tileset );
        this.limite = this.carteDuNiveau.createLayer('limite', this.tileset);
        this.mobPlace = this.carteDuNiveau.getObjectLayer('mob');
        
        //SetCollision
        this.limite.setCollisionByProperty({estSolide: true});
        this.add.image(0, 0, "map1").setOrigin(0, 0).setScale(4);

        //Creation Joueur
        this.player = new Player(this, 150, 700);
        this.player.getType("linux");

        //affichage et fonction d'UN ennemi, code à regrouper avec des childrens pour en faire plusieurs

        this.mob = this.physics.add.group();
        this.mobPlace.objects.forEach(spawn => {
            let poMob = new Hostile(this, spawn.x, spawn.y, spawn.type);
            poMob.getPlayer(this.player);
            this.mob.add(poMob);
        });

        //Fin Niveau
        this.broyeuse = this.physics.add.sprite(9952, 732, "broyeuse")

        //Création Collision
        this.physics.add.overlap(this.mob, this.player.attaque_cac, this.ennemiTouche, null, this);
        this.physics.add.overlap(this.mob, this.player.attaque_dist, this.ennemiTouche, null, this);
        this.physics.add.overlap(this.player, this.mob.attaque_mob, this.player.gainHp, this.player.immune, this);
        this.physics.add.collider(this.player, this.broyeuse, this.nextLevel, null, this);
        this.physics.add.collider(this.player, this.limite);
        this.physics.add.collider(this.mob, this.limite);

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

    ennemiTouche(attaque, mob){
        console.log(mob)
        if (mob.ennemiTouche == false){
            mob.ennemiTouche = true;
            mob.vie -= 1;
            mob.setVelocityX(50);
            mob.setVelocityY(50);
            this.time.delayedCall(500, (mob)=>{ mob.ennemiTouche = false }, [mob], this);
        }
    }
}