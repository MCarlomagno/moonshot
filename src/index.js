
const config = {
	width: window.innerWidth,
	height: window.innerHeight,
	parent: 'container',
	type: Phaser.AUTO,
	scene: [MainScene],
	rocketVelocity: 5,
	physics: {
		default: "arcade",
		arcade: {
			gravity: {
				y: 500,
			}
		}
	} 
}

var game = new Phaser.Game(config);

