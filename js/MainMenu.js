class MainMenu extends Phaser.Scene {
    constructor() {
        super('MainMenu');
    }

    preload() {
        // Show loading progress
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(760, 540, 400, 50);
        
        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(770, 550, 380 * value, 30);
        });

        // Load assets
        this.load.image('MM_Background', 'Assets/Main Menu/MM_Background.png');
        this.load.image('DDM_Logo', 'Assets/Main Menu/DDM_Logo.png');
        this.load.image('Start_Button', 'Assets/Main Menu/Start_Button.png');
        this.load.audio('Water_Sound', 'Assets/Main Menu/Water_Sound.mp3');
    }

    create() {
        // Add background
        this.add.image(960, 540, 'MM_Background').setDepth(0);
        
        // Add logo
        this.add.image(960, 250, 'DDM_Logo').setDepth(1);
        
        // Add start button
        const startButton = this.add.image(960, 600, 'Start_Button')
            .setInteractive()
            .setDepth(1);
        
        // Button hover effects
        startButton.on('pointerover', () => startButton.setScale(1.05));
        startButton.on('pointerout', () => startButton.setScale(1));
        startButton.on('pointerdown', () => {
            this.sound.play('Water_Sound');
            this.cameras.main.fadeOut(500);
        });
        
        // Handle fade complete
        this.cameras.main.once('camerafadeoutcomplete', () => {
            this.scene.start('FishingScene');
        });
        
        // Play background music
        this.sound.add('Water_Sound', { loop: true, volume: 0.5 }).play();
    }
}
