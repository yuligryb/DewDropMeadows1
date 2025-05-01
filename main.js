class MainMenu extends Phaser.Scene {
    constructor() {
        super('MainMenu');
    }

    preload() {
        // Load assets with encoded spaces
        this.load.image('MM_Background', 'Assets/Main%20Menu/MM_Background.png');
        this.load.image('DDM_Logo', 'Assets/Main%20Menu/DDM_Logo.png');
        this.load.image('Start_Button', 'Assets/Main%20Menu/Start_Button.png');
        this.load.audio('Water_Sound', 'Assets/Main%20Menu/Water_Sound.mp3');

        // Debugging
        this.load.on('loaderror', (file) => {
            console.error("Failed to load:", file.key);
            this.add.text(100, 100, `Failed to load: ${file.key}`, { fill: '#ff0000' });
        });
    }

    create() {
        // Show background
        this.add.image(960, 540, 'MM_Background')
            .setName('bg')
            .setDepth(-1);

        // Add logo
        this.add.image(960, 250, 'DDM_Logo')
            .setName('logo');

        // Add start button
        const startBtn = this.add.image(960, 540, 'Start_Button')
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('FishingScene');
            });

        // Play music
        this.sound.add('Water_Sound', { loop: true }).play();

        console.log("MainMenu created");
    }
}

class FishingScene extends Phaser.Scene {
    constructor() {
        super('FishingScene');
    }

    preload() {
        // Load test fish asset
        this.load.image('testFish', 'Assets/Game%20Scene/Select_1.png');
    }

    create() {
        // Blue background for visibility
        this.add.rectangle(0, 0, 1920, 1080, 0x227722)
            .setOrigin(0)
            .setName('bg');

        // Test fish display
        this.add.image(960, 540, 'testFish')
            .setName('testFish');

        // Debug text
        this.add.text(960, 100, "Fishing Scene Works!", { 
            fontSize: '64px', 
            color: '#ffffff' 
        }).setOrigin(0.5);

        console.log("FishingScene created");
    }
}

const config = {
    type: Phaser.AUTO,
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

// Debug game instance
const game = new Phaser.Game(config);
game.events.on('ready', () => console.log("Game ready"));
game.events.on('error', (err) => console.error("Game error:", err));
