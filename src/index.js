
const config = {
	width: window.innerWidth,
	height: window.innerHeight,
	parent: 'container',
	type: Phaser.AUTO,
	scene: [MainScene],
	rocketVelocity: 5,
	physics: {
		default: "arcade",
	} 
}

var game = new Phaser.Game(config);

