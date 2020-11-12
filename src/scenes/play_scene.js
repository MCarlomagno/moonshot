//import Moon from './objects/moon';

class PlayScene extends Phaser.Scene {

    width = window.innerWidth;
    height = window.innerHeight;
    rocketVelocity = 5;


    constructor() {
        super({key: "play_scene"});
    }

    preload() {
        // assets
        this.load.image("rocket", "assets/rocket.png");
        this.load.image("background", "assets/background.jpg");
        this.load.image("moon", "assets/moon.png")
    }
    
    create() {
        // background
        this.background = this.add.tileSprite(0, 0, this.width*2, this.height*2, "background");
        
        // keyboard initialization
        this.cursor = this.input.keyboard.createCursorKeys();
    
        // rocket properties
        this.rocket = this.physics.add.sprite(this.width/2, this.height/2, "rocket");
        this.rocket.setScale(0.2);
        this.rocket.setCollideWorldBounds(true);
        
        // moon initialization
        this.moon = new Moon(this, this.width/2, this.height-150, "moon");
    }
    
    update(time, delta) {
        this.background.tilePositionY -= 0.5;
        this.handleKeyboard(this.cursor, this.rocket);

        this.physics.collide(this.rocket, this.moon);

        // this.physics.moveTo(this.rocket, this.game.input.mousePointer.x,
        //    this.game.input.mousePointer.y, 100);


    }
    
    handleKeyboard(cursor, rocket) {
        if(cursor.right.isDown) {
            rocket.rotation += 0.1;
        }
        if (cursor.left.isDown) {
            rocket.rotation -= 0.1;
        }
        if(cursor.down.isDown) {
            rocket.y += this.rocketVelocity;
        }
        if(cursor.up.isDown) {
            rocket.y -= this.rocketVelocity;
        }
    }
}
