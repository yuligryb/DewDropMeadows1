// Main game configuration
const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: 1920,
    height: 1080,
    backgroundColor: '#000000',
    scene: [MainMenu, FishingScene],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    audio: {
        disableWebAudio: false
    }
};

// Create game instance
const game = new Phaser.Game(config);

// Debug listeners
game.events.on('ready', () => {
    console.log('Game is ready');
    game.scene.start('MainMenu');
});

game.events.on('error', (error) => {
    console.error('Game error:', error);
});
