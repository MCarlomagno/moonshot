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
        this.load.image("moon", "assets/moon.png");
        this.load.image("fire", "assets/explosion04.png");
    }
    
    create() {
        // background
        this.background = this.add.tileSprite(0, 0, this.width*2, this.height*2, "background");

        // keyboard initialization
        this.cursor = this.input.keyboard.createCursorKeys();
    
        // ship boost
        this.particles = this.add.particles("fire");

        // rocket properties
        this.ship = this.physics.add.sprite(this.width/2, this.height-200, "rocket");
        this.ship.setScale(0.2);
        this.ship.setCollideWorldBounds(true);
        this.ship.body.drag.set(0.99);
        this.ship.setAngle(-90);
        this.ship.body.maxVelocity.set(200);

        // ship vector
        const direction = new Phaser.Math.Vector2(1,0);
        direction.setToPolar(this.ship.rotation, 1);
        const dirX = -direction.x;
        const dirY = -direction.y;
        const offsetX = dirX * this.ship.width * 0.5;
        const offsetY = dirY * this.ship.height * 0.5;

        // ship boost configs
        this.exhaustEmitter = this.particles.createEmitter({
            quantity: 10,
            scale: { start: 0.065, end: 0.0002 },
            speedX: { min: -10 * dirX, max: 10 * dirX},
            speedY: { min: 20 * dirY, max: 50 * dirY},
            accelerationY: 1000 * dirX,
            accelerationY: 1000 * dirY,
            lifespan: { min: 100 , max: 300 },
            alpha: { start: 0.5, end: 0, ease: 'Sine'},
            rotate: { min: -180, max: 180 },
            angle: { min: 30, max: 110},
            blendMode: 'ADD',
            frequency: 15,
            follow: this.ship,
            followOffset: { x: offsetX, y: offsetY },
        });
        
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
            this.ship.setAngularVelocity(-200);
        } else if (this.cursor.right.isDown){
            this.ship.setAngularVelocity(200);
        } else{
            this.ship.setAngularVelocity(0);
        }

        if(this.exhaustEmitter) {
            // ship vector
            const direction = new Phaser.Math.Vector2(1,0);
            direction.setToPolar(this.ship.rotation, 1);
            const dirX = -direction.x;
            const dirY = -direction.y;
            const offsetX = dirX * this.ship.width * 0.15;
            const offsetY = dirY * this.ship.width * 0.15;

            this.exhaustEmitter.setSpeedX({ min: -10 * dirX, max: 10 * dirX});
            this.exhaustEmitter.setSpeedY({ min: 20 * dirY, max: 50 * dirY});
            this.exhaustEmitter.accelerationX.propertyValue = 1000 * dirX;
            this.exhaustEmitter.accelerationY.propertyValue = 1000 * dirY;
            this.exhaustEmitter.followOffset.x = offsetX;
            this.exhaustEmitter.followOffset.y = offsetY;
            this.exhaustEmitter.setVisible(this.cursor.up.isDown);
        }

    }
}
