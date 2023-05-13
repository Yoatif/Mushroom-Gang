export class Preload extends Phaser.Scene {
    constructor() {
        super("preload");
    }
    
    preload(){
        //Button
        this.load.image("startButton", "./assets/launchGame.png");

        //SpriteSheet Perso
        this.load.spritesheet('perso', './assets/spriteSheet_Player.png',  
            { frameWidth: 32, frameHeight: 64 });   //Base
        this.load.spritesheet('perso_linux', './assets/spriteSheetTest_Linux.png',
            { frameWidth: 32, frameHeight: 64 });   //Linux
        this.load.spritesheet('perso_windows', './assets/spriteSheetTest_Windows.png',
            { frameWidth: 32, frameHeight: 64 });   //Windows
        this.load.spritesheet('perso_apple', './assets/spriteSheetTest_Apple.png',
            { frameWidth: 32, frameHeight: 64 });   //Apple

        this.load.image("chara_linux", "./assets/linuxChara.png");
        this.load.image("chara_apple", "./assets/appleChara.png");
        this.load.image("chara_windows", "./assets/windowsChara.png");

        //SpriteSheet Attaque CaC
        this.load.spritesheet('attaque_perso', './assets/attaque_perso.png',
            { frameWidth: 32, frameHeight: 16 });
        this.load.spritesheet('attaque_linux', './assets/attaque_linux.png',
            { frameWidth: 32, frameHeight: 16 });
        this.load.spritesheet('attaque_apple', './assets/attaque_apple.png',
            { frameWidth: 32, frameHeight: 16 });
        this.load.spritesheet('attaque_windows', './assets/attaque_windows.png',
            { frameWidth: 32, frameHeight: 16 });

        //SpriteSheet Attaque Distance
        this.load.spritesheet('proj_perso', './assets/proj_perso.png',
            { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('proj_linux', './assets/proj_linux.png',
            { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('proj_apple', './assets/proj_apple.png',
            { frameWidth: 16, frameHeight: 16 });
        this.load.spritesheet('proj_windows', './assets/proj_windows.png',
            { frameWidth: 16, frameHeight: 16 });

        //Barre de vie
        this.load.spritesheet('sprite_hp', './assets/spriteSheetBarVie.png',
            { frameWidth: 1000, frameHeight: 128 });
        this.load.image("cadreVie", "./assets/cadreVie.png");

        //Obstacle
        this.load.spritesheet('barril', './assets/baril_Explo.png',
            { frameWidth: 128, frameHeight: 64 });
        this.load.image("puddle", "./assets/puddle.png");
        this.load.image("preasure", "./assets/preasure.png");
        this.load.image("proj_preasure", "./assets/proj_preasure.png");

        //Game Screen
        this.load.image("gameOver_png", "./assets/gameOver_screen.png")
        this.load.image("gameWin_png", "./assets/gameWin_screen.png");

        //Map
        this.load.image("tileset", "./maps/tilesetPlaceHolder.png");
        this.load.tilemapTiledJSON("level_01", "./assets/json/level_01.json");
        this.load.image("map1", "./assets/map_1.png");
        this.load.tilemapTiledJSON("level_02", "./assets/json/level_02.json");
        this.load.image("map2", "./assets/map_2.png");
        this.load.tilemapTiledJSON("level_03", "./assets/json/level_03.json");
        this.load.image("map3", "./assets/map_3.png");
    }

    create(){
        //Animation Perso
        //linux
        this.anims.create({
            key: 'left_linux',
            frames: [{ key: 'perso_linux', frame: 0 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'right_linux',
            frames: [{ key: 'perso_linux', frame: 1 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'parry_linux',
            frames: [{ key: 'perso_linux', frame: 2 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'shoot_linux',
            frames: [{ key: 'perso_linux', frame: 3 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'cac_linux',
            frames: [{ key: 'perso_linux', frame: 4 }],
            frameRate: 20
        });

        //Windows
        this.anims.create({
            key: 'left_windows',
            frames: [{ key: 'perso_windows', frame: 0 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'right_windows',
            frames: [{ key: 'perso_windows', frame: 1 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'parry_windows',
            frames: [{ key: 'perso_windows', frame: 2 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'shoot_windows',
            frames: [{ key: 'perso_windows', frame: 3 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'cac_windows',
            frames: [{ key: 'perso_windows', frame: 4 }],
            frameRate: 20
        });

        //Apple
        this.anims.create({
            key: 'left_apple',
            frames: [{ key: 'perso_apple', frame: 0 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'right_apple',
            frames: [{ key: 'perso_apple', frame: 1 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'parry_apple',
            frames: [{ key: 'perso_apple', frame: 2 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'shoot_apple',
            frames: [{ key: 'perso_apple', frame: 3 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'cac_apple',
            frames: [{ key: 'perso_apple', frame: 4 }],
            frameRate: 20
        });
        
        //Animation Ennemie

        //Animation Barre de vie
        this.anims.create({
			key: '100',
			frames: [{ key: 'sprite_hp', frame: 0 }],
			frameRate: 20
		});
        this.anims.create({
			key: '90',
			frames: [{ key: 'sprite_hp', frame: 1 }],
			frameRate: 20
		});
        this.anims.create({
			key: '80',
			frames: [{ key: 'sprite_hp', frame: 2 }],
			frameRate: 20
		});
        this.anims.create({
			key: '70',
			frames: [{ key: 'sprite_hp', frame: 3 }],
			frameRate: 20
		});
        this.anims.create({
			key: '60',
			frames: [{ key: 'sprite_hp', frame: 4 }],
			frameRate: 20
		});
        this.anims.create({
			key: '50',
			frames: [{ key: 'sprite_hp', frame: 5 }],
			frameRate: 20
		});
        this.anims.create({
			key: '40',
			frames: [{ key: 'sprite_hp', frame: 6 }],
			frameRate: 20
		});
        this.anims.create({
			key: '30',
			frames: [{ key: 'sprite_hp', frame: 7 }],
			frameRate: 20
		});
        this.anims.create({
			key: '20',
			frames: [{ key: 'sprite_hp', frame: 8 }],
			frameRate: 20
		});
        this.anims.create({
			key: '10',
			frames: [{ key: 'sprite_hp', frame: 9 }],
			frameRate: 20
		});
        this.anims.create({
			key: '0',
			frames: [{ key: 'sprite_hp', frame: 10 }],
			frameRate: 20
		});

        //Animation Obstacle
        this.anims.create({
            key: 'barril_explo',
            frames: this.anims.generateFrameNumbers('barril', {start:0,end:7}),
            frameRate: 10
        });
    }

    update(){
        this.scene.start("mainScreen");
    }
}