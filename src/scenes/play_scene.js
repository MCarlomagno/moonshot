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

        // floor
        this.floor = this.add.rectangle(this.width/2, this.height-15, this.width, 30, 0xff00FF00);
        this.physics.add.existing(this.floor);
        this.floor.body.allowGravity = false;
        this.floor.body.setCollideWorldBounds(true);

        // keyboard initialization
        this.cursor = this.input.keyboard.createCursorKeys();
    
        // rocket properties
        this.rocket = this.physics.add.sprite(this.width/2, this.height-200, "rocket");
        this.rocket.setScale(0.2);
        this.rocket.setCollideWorldBounds(true);
        
        // moon properties
        this.moon = this.physics.add.staticImage(this.width/2, this.height/3, "moon");
        this.moon.body.allowGravity = false;
        this.moon.body.setCircle(100);
        this.moon.setCollideWorldBounds(true);
    }
    
    update(time, delta) {
        this.background.tilePositionY -= 0.5;
        this.handleKeyboard(this.cursor, this.rocket);
        this.physics.collide(this.rocket, this.moon);
        this.physics.collide(this.rocket, this.floor);
    }
    
    handleKeyboard(cursor, rocket) {

        if(cursor.down.isDown) {
            rocket.y += this.rocketVelocity;
        }
        if(cursor.up.isDown) {
            rocket.y -= this.rocketVelocity;
        }
    }
}
