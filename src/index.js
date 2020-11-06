
const config = {
	width: window.innerWidth,
	height: window.innerHeight,
	parent: 'container',
	type: Phaser.AUTO,
	scene: {
		preload: preload,
		create: create,
		update: update,
	},
	rocketVelocity: 5,

	// physics enabled
	physics: {
		default: "arcade",
	} 
}

var game = new Phaser.Game(config);

function preload() {
	// assets
	this.load.image("rocket", "assets/rocket.png");
	this.load.image("background", "assets/background.jpg");
}

function create() {
	// background
	this.background = this.add.tileSprite(0, 0, config.width*2, config.height*2, "background");
	
	// keyboard initialization
	this.cursor = this.input.keyboard.createCursorKeys();

	// rocket properties
	this.rocket = this.physics.add.image(config.width/2,config.height/2, "rocket");
	this.rocket.setScale(0.2);
	this.rocket.setCollideWorldBounds(true);
}

function update(time, delta) {
	this.background.tilePositionY -= 0.5;

	handleKeyboard(this.cursor, this.rocket);

}

function handleKeyboard(cursor, rocket) {
	if(cursor.right.isDown) {
		rocket.x += config.rocketVelocity;
	}
	if (cursor.left.isDown) {
		rocket.x -= config.rocketVelocity;
	}
	if(cursor.down.isDown) {
		rocket.y += config.rocketVelocity;
	}
	if(cursor.up.isDown) {
		rocket.y -= config.rocketVelocity;
	}
}