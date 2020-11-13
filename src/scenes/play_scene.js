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
        this.rocketImage = this.load.image("rocket", "assets/rocket.png");
        this.load.image("background", "assets/background.jpg");
        this.load.image("moon", "assets/moon.png")
    }
    
    create() {
        // background
        this.background = this.add.tileSprite(0, 0, this.width*2, this.height*2, "background");

        // keyboard initialization
        this.cursor = this.input.keyboard.createCursorKeys();
    
        // rocket properties
        this.rocket = this.physics.add.sprite(this.width/2, this.height-200, "rocket");
        this.rocket.setScale(0.2);
        this.rocket.setCollideWorldBounds(true);
        this.rocket.body.drag.set(0.99);
        this.rocket.setAngle(-90);
        this.rocket.body.maxVelocity.set(200);
        
        // moon properties
        this.moon = this.physics.add.staticImage(this.width/2, this.height/3, "moon");
        this.moon.body.allowGravity = false;
        this.moon.body.setCircle(100);
        this.moon.setCollideWorldBounds(true);
    }
    
    update(time, delta) {
        this.background.tilePositionY -= 0.5;
        this.handleKeyboard();
        this.physics.collide(this.rocket, this.moon);
    }
    
    handleKeyboard() {

        if (this.cursor.up.isDown){
            this.physics.velocityFromRotation(this.rocket.rotation, 300, this.rocket.body.acceleration);
        } else {
            this.rocket.setAcceleration(0);
        }
    
        if (this.cursor.left.isDown){
            this.rocket.setAngularVelocity(-300);
        } else if (this.cursor.right.isDown){
            this.rocket.setAngularVelocity(300);
        } else{
            this.rocket.setAngularVelocity(0);
        }
    }
}
