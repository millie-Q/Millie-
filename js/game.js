// Game Configuration
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// Create the game
const game = new Phaser.Game(config);

// Preload game assets
function preload() {
    // Load images, sprites, audio, etc. here
    // Example: this.load.image('sky', 'assets/images/sky.png');
}

// Create game objects
function create() {
    // Add background color
    this.cameras.main.setBackgroundColor('#87CEEB');

    // Create a simple player (white rectangle)
    this.player = this.add.rectangle(400, 500, 32, 32, 0xffffff);
    this.physics.add.existing(this.player);
    this.player.body.setBounce(0.2);
    this.player.body.setCollideWorldBounds(true);

    // Create some platforms (ground)
    const platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, null).setScale(2).refreshBody();
    platforms.create(600, 400);
    platforms.create(50, 250);
    platforms.create(750, 220);

    // Add physics collider between player and platforms
    this.physics.add.collider(this.player, platforms);

    // Create keyboard input
    this.cursors = this.input.keyboard.createCursorKeys();

    // Add a simple text display
    this.scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });

    this.score = 0;
}

// Update game state
function update() {
    // Player movement
    if (this.cursors.left.isDown) {
        this.player.body.setVelocityX(-160);
    } else if (this.cursors.right.isDown) {
        this.player.body.setVelocityX(160);
    } else {
        this.player.body.setVelocityX(0);
    }

    // Jump
    if (this.cursors.up.isDown && this.player.body.touching.down) {
        this.player.body.setVelocityY(-330);
    }

    // Update score display
    this.scoreText.setText('Score: ' + this.score);
}
