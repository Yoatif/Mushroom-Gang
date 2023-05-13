import {eventsCenter} from "../script.js"

///UI///
export class UiScene extends Phaser.Scene
{
	constructor()
	{
		super({
            key: 'ui-scene',
            physics: {
            default: 'arcade',
            arcade: { 
            gravity: { y: 0 }
            }}
        });
	}

	create()
	{
        this.healthbar = this.physics.add.sprite(0, 0, "spriteHealtBar").setOrigin(0, 0).setScale(0.75);
        this.cadre = this.add.image(0, 0, "cadreVie").setOrigin(0, 0).setScale(0.75);

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


        eventsCenter.on('update-hp', this.updateHp, this);
	}

    updateHp(hp){
        if (hp == 100){
            this.healthbar.anims.play("100");
        }
        else if (hp == 90){
            this.healthbar.anims.play("90");
        }
        else if (hp == 80){
            this.healthbar.anims.play("80");
        }
        else if (hp == 70){
            this.healthbar.anims.play("70");
        }
        else if (hp == 60){
            this.healthbar.anims.play("60");
        }
        else if (hp == 50){
            this.healthbar.anims.play("50");
        }
        else if (hp == 40){
            this.healthbar.anims.play("40");
        }
        else if (hp == 30){
            this.healthbar.anims.play("30");
        }
        else if (hp == 20){
            this.healthbar.anims.play("20");
        }
        else if (hp == 10){
            this.healthbar.anims.play("10");
        }
        else if (hp == 0){
            this.healthbar.anims.play("0");
        }
    }
}