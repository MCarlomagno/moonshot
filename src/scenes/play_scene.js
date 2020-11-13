//import Moon from './objects/moon';

class PlayScene extends Phaser.Scene {

    width = window.innerWidth;
    height = window.innerHeight;

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
        this.ship = this.physics.add.sprite(this.width/2, this.height-200, "rocket");
        this.ship.setScale(0.2);
        this.ship.setCollideWorldBounds(true);
        this.ship.body.drag.set(0.99);
        this.ship.setAngle(-90);
        this.ship.body.maxVelocity.set(200);
        
        // moon properties
        this.moon = this.physics.add.staticImage(this.width/2, this.height/3, "moon");
        this.moon.body.allowGravity = false;
        this.moon.body.setCircle(100);
        this.moon.setCollideWorldBounds(true);
    }
    
    update(time, delta) {
        this.background.tilePositionY -= 0.5;
        this.handleKeyboard();
        this.physics.collide(this.ship, this.moon);
    }
    
    handleKeyboard() {

        if (this.cursor.up.isDown){
            this.physics.velocityFromRotation(this.ship.rotation, 300, this.ship.body.acceleration);
        } else {
            this.ship.setAcceleration(0);
        }
    
        if (this.cursor.left.isDown){
            this.ship.setAngularVelocity(-300);
        } else if (this.cursor.right.isDown){
            this.ship.setAngularVelocity(300);
        } else{
            this.ship.setAngularVelocity(0);
        }
    }
}
