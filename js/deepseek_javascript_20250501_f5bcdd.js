class FishingScene extends Phaser.Scene {
    constructor() {
        super('FishingScene');
    }

    preload() {
        // Load fishing assets
        this.load.image('Fish1', 'Assets/Game Scene/Select_1.png');
        this.load.image('Fish2', 'Assets/Game Scene/Select_2.png');
    }

    create() {
        // Show transition debug
        this.cameras.main.fadeIn(500);
        
        // Add background color
        this.add.rectangle(0, 0, 1920, 1080, 0x336699)
            .setOrigin(0)
            .setDepth(0);
        
        // Add test fish
        this.add.image(960, 540, 'Fish1')
            .setScale(2)
            .setDepth(1);
        
        // Add debug text
        this.add.text(960, 100, 'Fishing Scene is Working!', {
            fontSize: '64px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5).setDepth(2);
        
        // Add return to menu button
        const backButton = this.add.text(960, 900, 'Back to Menu', {
            fontSize: '48px',
            color: '#ffffff',
            backgroundColor: '#333333',
            padding: { x: 20, y: 10 }
        })
        .setOrigin(0.5)
        .setInteractive()
        .on('pointerdown', () => {
            this.scene.start('MainMenu');
        });
    }
}