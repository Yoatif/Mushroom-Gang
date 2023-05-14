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
        this.healthbar = this.physics.add.sprite(0, 0, "sprite_hp").setOrigin(0, 0).setScale(0.75);

        eventsCenter.on('update-hp', this.updateHp, this);
        eventsCenter.on('hide-hp', this.hideHp, this);
        eventsCenter.on('show-hp', this.showHp, this);
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
    hideHp(){
        this.healthbar.setVisible(false);
    }
    showHp(){
        this.healthbar.setVisible(true);
    }
}