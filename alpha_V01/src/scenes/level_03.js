import { Player } from "../../assets/entity/player.js";
import { Hostile } from "../../assets/entity/hostiles.js";

export class Level03 extends Phaser.Scene {
    constructor() {
        super("level03");
    }
    
    init(data){
        this.level = data.level;
        this.listChoice = data.listChoice
    }

    preload(){}

    create(){
        //Load Tiled
        this.carteDuNiveau = this.add.tilemap("level_03");
        this.tileset = this.carteDuNiveau.addTilesetImage( "tileset", "tileset" );

        this.fond = this.carteDuNiveau.createLayer( "fond", this.tileset );
        this.sol = this.carteDuNiveau.createLayer( "sol", this.tileset );
        this.limite = this.carteDuNiveau.createLayer('limite', this.tileset);
        this.mobPlace = this.carteDuNiveau.getObjectLayer('mob');
        this.obsPlace = this.carteDuNiveau.getObjectLayer('obstacle');
        
        //SetCollision
        this.limite.setCollisionByProperty({estSolide: true});
        this.add.image(0, 0, "map3").setOrigin(0, 0).setScale(4);

        //Creation Joueur
        this.player = new Player(this, 150, 700);
        this.player.getType(this.listChoice[0]);

        //Placement Mob
        this.mob = this.physics.add.group();
        this.mobPlace.objects.forEach(spawn => {
            let poMob = new Hostile(this, spawn.x, spawn.y, spawn.type);
            poMob.getPlayer(this.player);
            this.mob.add(poMob);
        });

        //Placement Obstacle
        this.barril = this.physics.add.group();
        this.puddle = this.physics.add.group();
        this.preasure = this.physics.add.group();
        this.ball = this.physics.add.group();
        this.proj = this.physics.add.group();
        this.obsPlace.objects.forEach(spawn =>{
            let poObs;
            let scale = (spawn.y * 2.5) / 1024;
            if (spawn.type == "barril"){
                poObs = this.physics.add.sprite(spawn.x, spawn.y, "barril");
                poObs.setFrame(0);
                poObs.setSize(16, 16);
                this.barril.add(poObs);
            }
            else if (spawn.type == "puddle"){
                poObs = this.puddle.create(spawn.x, spawn.y, "puddle");
            }
            else if (spawn.type == "preasure"){
                poObs = this.preasure.create(spawn.x, spawn.y, "preasure");
            }
            else if (spawn.type == "ball"){
                poObs = this.ball.create(spawn.x, spawn.y, "preasure");
            }
            poObs.setScale(scale);
        });
        this.barril.children.each(function (barril) {
            barril.alive = true;
        });

        //Fin Niveau
        this.broyeuse = this.physics.add.sprite(9952, 732, "broyeuse")

        //Création Collision
        this.physics.add.overlap(this.mob, this.player.attaque_cac, this.ennemiTouche, null, this);
        this.physics.add.overlap(this.mob, this.player.attaque_dist, this.ennemiTouche, null, this);
        this.physics.add.collider(this.mob, this.limite);

        this.physics.add.overlap(this.player, this.barril, this.barrilExplode, this.player.immune, this);
        this.physics.add.overlap(this.player, this.puddle, this.puddleDmg, this.player.immune, this);
        this.physics.add.overlap(this.player, this.preasure, this.preasureActivate, null, this);
        this.physics.add.overlap(this.player, this.ball, this.ballActivate, null, this);
        this.physics.add.overlap(this.player, this.proj, this.projActivate, null, this);
        this.physics.add.overlap(this.player, this.mob.attaque_mob, this.player.gainHp, this.player.immune, this);
        this.physics.add.collider(this.player, this.broyeuse, this.nextLevel, null, this);
        this.physics.add.collider(this.player, this.limite);
        

        //Création Caméra
        this.physics.world.setBounds(0, 0, 10080, 1024);
        this.cameras.main.setBounds(0, 0, 10080, 1024);
        this.cameras.main.startFollow(this.player);
    }

    update(){}

    nextLevel(){
        this.player.alive = false;
        this.scene.start("gameWin", {
            level: this.level,
            listChoice: this.listChoice
        });
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

    barrilExplode(player, barril){
        player.beHit = true;
        if (barril.alive){
            barril.anims.play("barril_explo");
        }
        barril.alive = false;
        this.time.delayedCall(800, ()=>{ barril.destroy(); player.beHit = false }, [barril, player], this);
        player.loseHp();
        if (player.hp == 0){
            this.scene.start("gameWin", {
                level: this.level
            });
        }
    }

    puddleDmg(player, puddle){
        player.loseHp();
        if (player.hp == 0){
            this.nextLevel()
        }
        player.beHit = true;
        puddle.destroy();
        this.time.delayedCall(200, ()=>{ player.beHit = false }, [player], this);
    }

    preasureActivate(player, preasure){
        let proj = this.proj.create(preasure.x, -50, "proj_preasure");
        proj.setVelocityY(800);
        proj.setScale((preasure.y * 2.5) / 1024);
        preasure.destroy();
    }

    projActivate(player, proj){
        player.loseHp();
        if (player.hp == 0){
            this.nextLevel()
        }
        player.beHit = true;
        proj.destroy();
        this.time.delayedCall(200, ()=>{ player.beHit = false }, [player], this);
    }

    ballActivate(player, ball){
        let proj = this.proj.create(ball.x + 1600, ball.y, "proj_preasure");
        proj.setVelocityX(-800);
        proj.setScale((ball.y * 2.5) / 1024);
        ball.destroy();
    }


}