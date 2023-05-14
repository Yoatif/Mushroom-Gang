import { eventsCenter } from "../../src/script.js"
import { game } from "../../src/script.js";
export class Preload extends Phaser.Scene {
    constructor() {
        super("preload");
    }

    preload() {
        //Button
        this.load.image("startButton", "./assets/bouton_start.png");
        this.load.image("reRunButton", "./assets/bouton_restart.png");
        this.load.image("nextLevelButton", "./assets/bouton_nextlvl.png");

        //Screen
        this.load.image("title", "./assets/titre.png");
        this.load.image("ecranFinalWin","./assets/gameWin_Final.png");
        this.load.image("ecranStart", "./assets/EcranMenu.png");
        this.load.image("ecranChoose", "./assets/EcranMenuchoose.png");
        this.load.spritesheet("light", "./assets/lightchoose.png",
            { frameWidth: 384, frameHeight: 539 });

        //SpriteSheet Perso
        this.load.spritesheet('perso', './assets/spriteSheet_Player.png',
            { frameWidth: 32, frameHeight: 64 });   //Base
        this.load.spritesheet('linux', './assets/LinuxRobot_sheet.png',
            { frameWidth: 64, frameHeight: 64 });   //Linux
        this.load.spritesheet('windows', './assets/WindowsRobot-sheet.png',
            { frameWidth: 64, frameHeight: 64 });   //Windows
        this.load.spritesheet('apple', './assets/AppleRobot-sheet.png',
            { frameWidth: 32, frameHeight: 64 });   //Apple

        //SpriteSheet Ennemi
        this.load.spritesheet('cac', './assets/Scientistkick-sheet.png',
            { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('dist', './assets/Scientistshoot-sheet.png',
            { frameWidth: 32, frameHeight: 64 });

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
        this.load.spritesheet('sprite_hp', './assets/spriteHealth.png',
            { frameWidth: 720, frameHeight: 128 });

        //Obstacle
        this.load.spritesheet('barril', './assets/baril_Explo.png',
            { frameWidth: 128, frameHeight: 64 });
        this.load.spritesheet('puddle', './assets/spritePuddle.png',
            {frameWidth:32, frameHeight:16 });
        this.load.image("preasure", "./assets/preasure.png");
        this.load.spritesheet("tuyau", "./assets/tuyau.png",
            { frameWidth: 32, frameHeight:32 });
        this.load.spritesheet("roulant", "./assets/roulant.png",
            { frameWidth:32, frameHeight:32 });
        this.load.image("broyeuse", './assets/broyeuse.png');

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

        //Audio
        this.load.audio("theme", ["./sound/theme.ogg", "./sound/theme.mp3"]);

        this.load.audio('defeat', ['./sound/defeat.ogg', "./sound/defeat.mp3"]);
        this.load.audio('defeat_2', ['./sound/defeat_2.ogg', "./sound/defeat_2.mp3"]);
        this.load.audio('victory', ['./sound/victory.ogg', './sound/victory.mp3']);

        this.load.audio("sound_cac_linux", ["./sound/cac_linux.ogg", "./sound/cac_linux.mp3"]);
        this.load.audio("sound_tir_linux", ["./sound/tir_linux.ogg", "./sound/tir_linux.mp3"]);

        this.load.audio("sound_tir_apple", ["./sound/tir_apple.ogg", "./sound/tir_apple.mp3"]);

        this.load.audio('sound_cac_windows', ['./sound/cac_windows.ogg', './sound/cac_windows.mp3']);

        this.load.audio("sound_destroy", ["./sound/destroy.ogg", "./sound/destroy.mp3"]);
        this.load.audio("sound_repair_cac", ["./sound/repair_cac.ogg", "./sound/repair_cac.mp3"]);

        this.load.audio("parry", ["./sound/parry.ogg", "./sound/parry.mp3"]);
    }

    create() {
        //Animation Perso
        //linux
        this.anims.create({
            key: 'left_linux',
            frames: this.anims.generateFrameNumbers('linux', { start: 20, end: 24 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'right_linux',
            frames: this.anims.generateFrameNumbers('linux', { start: 1, end: 5 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'standby_left_linux',
            frames: [{ key: 'linux', frame: 19 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'standby_right_linux',
            frames: [{ key: 'linux', frame: 0 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'shoot_left_linux',
            frames: this.anims.generateFrameNumbers('linux', { start: 26, end: 30 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'shoot_right_linux',
            frames: this.anims.generateFrameNumbers('linux', { start: 7, end: 11 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'cac_left_linux',
            frames: this.anims.generateFrameNumbers('linux', { start: 31, end: 32 }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'cac_right_linux',
            frames: this.anims.generateFrameNumbers('linux', { start: 12, end: 13 }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'destroy_linux',
            frames: [{ key: 'linux', frame: 14 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'repair_linux',
            frames: this.anims.generateFrameNumbers('linux', { start: 15, end: 19 }),
            frameRate: 5
        });
        this.anims.create({
            key: 'parry_left_linux',
            frames: [{ key: 'linux', frame: 34 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'parry_right_linux',
            frames: [{ key: 'linux', frame: 33 }],
            frameRate: 20
        });

        //Windows
        this.anims.create({
            key: 'left_windows',
            frames: this.anims.generateFrameNumbers('windows', { start: 16, end: 20 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'right_windows',
            frames: this.anims.generateFrameNumbers('windows', { start: 1, end: 6 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'standby_left_windows',
            frames: [{ key: 'windows', frame: 14 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'standby_right_windows',
            frames: [{ key: 'windows', frame: 0 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'cac_left_windows',
            frames: this.anims.generateFrameNumbers('windows', { start: 22, end: 27 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'cac_right_windows',
            frames: this.anims.generateFrameNumbers('windows', { start: 8, end: 13 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'destroy_windows',
            frames: this.anims.generateFrameNumbers('windows', { start: 28, end: 32 }),
            frameRate: 5
        });
        this.anims.create({
            key: 'repair_windows',
            frames: this.anims.generateFrameNumbers('windows', { start: 33, end: 34 }),
            frameRate: 5
        });
        this.anims.create({
            key: 'parry_left_windows',
            frames: [{ key: 'windows', frame: 36 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'parry_right_windows',
            frames: [{ key: 'windows', frame: 35 }],
            frameRate: 20
        });

        //Apple
        this.anims.create({
            key: 'left_apple',
            frames: this.anims.generateFrameNumbers('apple', { start: 7, end: 13 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'right_apple',
            frames: this.anims.generateFrameNumbers('apple', { start: 0, end: 6 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'shoot_left_apple',
            frames: this.anims.generateFrameNumbers('apple', { start: 27, end: 21 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'shoot_right_apple',
            frames: this.anims.generateFrameNumbers('apple', { start: 20, end: 14 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'destroy_apple',
            frames: this.anims.generateFrameNumbers('apple', { start: 28, end: 40 }),
            frameRate: 5
        });
        this.anims.create({
            key: 'repair_apple',
            frames: this.anims.generateFrameNumbers('apple', { start: 42, end: 48 }),
            frameRate: 5
        });
        this.anims.create({
            key: 'parry_left_apple',
            frames: this.anims.generateFrameNumbers('apple', { start: 62, end: 67 }),
            frameRate: 10
        });
        this.anims.create({
            key: 'parry_right_apple',
            frames: this.anims.generateFrameNumbers('apple', { start: 56, end: 61 }),
            frameRate: 10
        });

        //Animations Proj
        this.anims.create({
            key: 'dist_perso',
            frames: this.anims.generateFrameNumbers('proj_perso', { start: 0, end: 8 }),
            frameRate: 10
        });
        this.anims.create({
            key: 'dist_linux',
            frames: [{ key: 'proj_linux', frame: 0 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'dist_apple',
            frames: [{ key: 'proj_apple', frame: 0 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'dist_windows',
            frames: [{ key: 'proj_windows', frame: 0 }],
            frameRate: 20
        });

        //Animation Ennemie
        this.anims.create({
            key: 'left_mob_cac',
            frames: this.anims.generateFrameNumbers('cac', { start: 5, end: 9 }),
            frameRate: 5,
            repeat : -1
        });
        this.anims.create({
            key: 'right_mob_cac',
            frames: this.anims.generateFrameNumbers('cac', { start: 0, end: 4 }),
            frameRate: 5,
            repeat : -1
        });
        this.anims.create({
            key: 'left_cac_mob_cac',
            frames: this.anims.generateFrameNumbers('cac', { start: 13, end: 15 }),
            frameRate: 10
        });
        this.anims.create({
            key: 'right_cac_mob_cac',
            frames: this.anims.generateFrameNumbers('cac', { start: 10, end: 12 }),
            frameRate: 10
        });

        this.anims.create({
            key: 'left_mob_dist',
            frames: this.anims.generateFrameNumbers('dist', { start: 5, end: 9 }),
            frameRate: 5,
            repeat : -1
        });
        this.anims.create({
            key: 'right_mob_dist',
            frames: this.anims.generateFrameNumbers('dist', { start: 0, end: 4 }),
            frameRate: 5,
            repeat : -1
        });
        this.anims.create({
            key: 'left_cac_mob_dist',
            frames: this.anims.generateFrameNumbers('dist', { start: 15, end: 19 }),
            frameRate: 5
        });
        this.anims.create({
            key: 'right_cac_mob_dist',
            frames: this.anims.generateFrameNumbers('dist', { start: 10, end: 14 }),
            frameRate: 10
        });


        //Animation Barre de vie
        this.anims.create({
            key: '100',
            frames: [{ key: 'sprite_hp', frame: 10 }],
            frameRate: 20
        });
        this.anims.create({
            key: '90',
            frames: [{ key: 'sprite_hp', frame: 9 }],
            frameRate: 20
        });
        this.anims.create({
            key: '80',
            frames: [{ key: 'sprite_hp', frame: 8 }],
            frameRate: 20
        });
        this.anims.create({
            key: '70',
            frames: [{ key: 'sprite_hp', frame: 7 }],
            frameRate: 20
        });
        this.anims.create({
            key: '60',
            frames: [{ key: 'sprite_hp', frame: 6 }],
            frameRate: 20
        });
        this.anims.create({
            key: '50',
            frames: [{ key: 'sprite_hp', frame: 5 }],
            frameRate: 20
        });
        this.anims.create({
            key: '40',
            frames: [{ key: 'sprite_hp', frame: 4 }],
            frameRate: 20
        });
        this.anims.create({
            key: '30',
            frames: [{ key: 'sprite_hp', frame: 3 }],
            frameRate: 20
        });
        this.anims.create({
            key: '20',
            frames: [{ key: 'sprite_hp', frame: 2 }],
            frameRate: 20
        });
        this.anims.create({
            key: '10',
            frames: [{ key: 'sprite_hp', frame: 1 }],
            frameRate: 20
        });
        this.anims.create({
            key: '0',
            frames: [{ key: 'sprite_hp', frame: 0 }],
            frameRate: 20
        });

        //Animation Obstacle
        this.anims.create({
            key: 'barril_explo',
            frames: this.anims.generateFrameNumbers('barril', { start: 0, end: 7 }),
            frameRate: 10
        });
        this.anims.create({
            key: 'rat',
            frames: this.anims.generateFrameNumbers('roulant', { start: 6, end: 11 }),
            frameRate: 5,
            repeat : -1
        });
        this.anims.create({
            key: 'roue',
            frames: this.anims.generateFrameNumbers('roulant', { start: 0, end: 5 }),
            frameRate: 5,
            repeat : -1
        });


        this.scene.run('ui-scene');
        //this.theme = this.sound.add("theme", { volume: 0.0002, loop: true });
        //if (!this.sound.locked) {
        //    // already unlocked so play
        //    this.theme.play()
        //}
        //else {
        //    // wait for 'unlocked' to fire and then play
        //    this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
        //        this.theme.play()
        //    })
        //}

    }

    update() {
        eventsCenter.emit('hide-hp');
        
        this.scene.start("mainScreen");
    }
}