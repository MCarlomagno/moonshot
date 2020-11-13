class MainScene extends Phaser.Scene {

    width = window.innerWidth;
    height = window.innerHeight;
    rocketVelocity = 5;
    isActive = true;


    constructor() {
        super({key: "main_scene"});
    }

    preload() {
        // assets
        this.load.image("rocket", "assets/rocket.png");
        this.load.image("background", "assets/background.jpg");
    }
    
    create() {
        // background
        this.background = this.add.tileSprite(0, 0, this.width*2, this.height*2, "background");
        
        // keyboard initialization
        this.cursor = this.input.keyboard.createCursorKeys();
    
        // rocket properties
        this.rocket = this.add.image(this.width/2, this.height/2, "rocket");
        this.rocket.setRotation(3.14 * 3/2);
        this.rocket.setScale(0.2);

        // text 
        this.add.text(
            this.width/2,
            100,
            "Moonshot",
            {
                fontSize: '64px',
                fontFamily: 'Arial',
                color: '#ffffff',
                align: 'center',
            },);
    }
    
    update(time, delta) {
        this.handleKeyboard(this.cursor, this.rocket);
    }
    
    handleKeyboard(cursor, rocket) {
        if(cursor.space.isDown && this.isActive) {
            this.scene.add("play_scene", new PlayScene);
            this.scene.start("play_scene");
            this.isActive = false;
        }
    }
}