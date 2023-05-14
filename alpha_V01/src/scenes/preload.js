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

        //SpriteSheet Perso
        this.load.spritesheet('perso', './assets/spriteSheet_Player.png',
            { frameWidth: 32, frameHeight: 64 });   //Base
        this.load.spritesheet('linux', './assets/LinuxRobot_sheet.png',
            { frameWidth: 64, frameHeight: 64 });   //Linux
        this.load.spritesheet('windows', './assets/spriteSheetTest_Windows.png',
            { frameWidth: 32, frameHeight: 64 });   //Windows
        this.load.spritesheet('apple', './assets/AppleRobot-sheet.png',
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
        this.load.spritesheet('sprite_hp', './assets/spriteHealth.png',
            { frameWidth: 720, frameHeight: 128 });

        //Obstacle
        this.load.spritesheet('barril', './assets/baril_Explo.png',
            { frameWidth: 128, frameHeight: 64 });
        this.load.image("puddle", "./assets/puddle.png");
        this.load.image("preasure", "./assets/preasure.png");
        this.load.image("proj_preasure", "./assets/proj_preasure.png");
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

        this.load.audio("sound_cac_linux", ["./sound/cac_linux.ogg", "./sound/cac_linux.mp3"]);
        this.load.audio("sound_tir_linux", ["./sound/tir_linux.ogg", "./sound/tir_linux.mp3"]);

        this.load.audio("sound_tir_apple", ["./sound/tir_apple.ogg", "./sound/tir_apple.mp3"]);

        this.load.audio("sound_destroy", ["./sound/destroy.ogg", "./sound/destroy.mp3"]);
        this.load.audio("sound_repair_cac", ["./sound/repair_cac.ogg", "./sound/repair_cac.mp3"]);
    }

    create() {
        //Animation Perso
        //linux

        this.anims.create({
            key: 'left_linux',
            frames: this.anims.generateFrameNumbers('linux', { start: 20, end: 24 }),
            frameRate: 1,
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
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'shoot_right_linux',
            frames: this.anims.generateFrameNumbers('linux', { start: 7, end: 11 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'cac_left_linux',
            frames: this.anims.generateFrameNumbers('linux', { start: 31, end: 32 }),
            frameRate: 2,
            repeat: -1
        });
        this.anims.create({
            key: 'cac_right_linux',
            frames: this.anims.generateFrameNumbers('linux', { start: 12, end: 13 }),
            frameRate: 2,
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
            key: 'parry_linux',
            frames: [{ key: 'linux', frame: 2 }],
            frameRate: 20
        });

        //Windows
        this.anims.create({
            key: 'left_windows',
            frames: [{ key: 'windows', frame: 0 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'right_windows',
            frames: [{ key: 'windows', frame: 1 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'parry_windows',
            frames: [{ key: 'windows', frame: 2 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'shoot_windows',
            frames: [{ key: 'windows', frame: 3 }],
            frameRate: 20
        });
        this.anims.create({
            key: 'cac_windows',
            frames: [{ key: 'windows', frame: 4 }],
            frameRate: 20
        });

        //Apple
        this.anims.create({
            key: 'left_apple',
            frames: this.anims.generateFrameNumbers('apple', { start: 7, end: 13 }),
            frameRate: 1,
            repeat: -1
        });
        this.anims.create({
            key: 'right_apple',
            frames: this.anims.generateFrameNumbers('apple', { start: 0, end: 6 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'shoot_left_apple',
            frames: this.anims.generateFrameNumbers('apple', { start: 27, end: 21 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'shoot_right_apple',
            frames: this.anims.generateFrameNumbers('apple', { start: 20, end: 14 }),
            frameRate: 5,
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
            key: 'parry_apple',
            frames: [{ key: 'apple', frame: 0 }],
            frameRate: 20
        });


        //Animation Ennemie

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

        this.scene.run('ui-scene');

        this.theme = this.sound.add("theme", { volume: 0.0002, loop: true });
        if (!this.sound.locked) {
            // already unlocked so play
            this.theme.play()
        }
        else {
            // wait for 'unlocked' to fire and then play
            this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
                this.theme.play()
            })
        }

    }

    update() {
        eventsCenter.emit('hide-hp');
        this.scene.start("mainScreen");
    }
}