class MainMenu extends Phaser.Scene {
  constructor() {
    super('MainMenu');
  }

  preload() {
    // Load menu assets
    this.load.atlas('menu', 'Assets/MainMenu/Menu_Spritesheet.png', 'Assets/MainMenu/Menu_Spritesheet.json');
    this.load.audio('Water_Sound', 'Assets/MainMenu/Water_Sound.mp3');
  }

  create() {
    // Create menu elements using the atlas
    this.add.sprite(960, 540, 'menu', 'MM_Background.png').setDepth(-3);
    this.add.sprite(960, 250, 'menu', 'DDM_Logo.png').setDepth(1);

    // Menu buttons
    const startButton = this.add.sprite(960, 500, 'menu', 'Start_Button.png')
      .setInteractive()
      .on('pointerup', () => this.scene.start('FishingScene'));
 create() {
    this.swayTime = 0;
    this.add.image(960, 540, 'MM_Background').setDepth(-3);

    this.music = this.sound.add('Water_Sound', { loop: true, volume: 1 });
    this.music.play();

    const correctFrameOrder = [0, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2];
    this.anims.create({
      key: 'bubbleFloat',
      frames: correctFrameOrder.map(i => ({ key: 'Bubble_Sheet', frame: i })),
      frameRate: 3,
      repeat: -1
    });
    this.bubble = this.add.sprite(960, 540, 'Bubble_Sheet').play('bubbleFloat').setDepth(-2);

    this.backgroundBubbles = [];
    for (let i = 0; i < 15; i++) {
      const g = this.add.graphics();
      g.lineStyle(4, 0xFFFFFF, 0.3);
      g.strokeCircle(0, 0, Phaser.Math.Between(5, 15));
      const container = this.add.container(Phaser.Math.Between(0, 1920), Phaser.Math.Between(1080, 2000), [g]);
      container.speed = Phaser.Math.FloatBetween(0.8, 1.4);
      container.setDepth(-1);
      this.backgroundBubbles.push(container);
    } // Added missing closing bracket for the for loop

    this.add.image(960, 250, 'DDM_Logo').setDepth(1);

    const startButton = this.add.image(960, 500, 'Start_Button').setInteractive().setDepth(1);
    const quitButton = this.add.image(960, 620, 'Quit_Button').setInteractive().setDepth(1);
    const settingsButton = this.add.image(960, 740, 'Settings_Button').setInteractive().setScale(0.5).setDepth(1);

    startButton.on('pointerover', () => startButton.setScale(1.05));
    startButton.on('pointerout', () => startButton.setScale(1));
    startButton.on('pointerdown', () => startButton.setTint(0xcccccc));
    startButton.on('pointerup', () => {
      startButton.clearTint();
      this.scene.start('FishingScene');
    });

    quitButton.on('pointerover', () => quitButton.setScale(1.05));
    quitButton.on('pointerout', () => quitButton.setScale(1));
    quitButton.on('pointerdown', () => quitButton.setTint(0xcccccc));
    quitButton.on('pointerup', () => {
      quitButton.clearTint();
      // Add quit game functionality
    });

    settingsButton.on('pointerover', () => settingsButton.setScale(0.55));
    settingsButton.on('pointerout', () => settingsButton.setScale(0.5));
    settingsButton.on('pointerdown', () => settingsButton.setTint(0xcccccc));
    settingsButton.on('pointerup', () => {
      settingsButton.clearTint();
      this.showSettings();
    });

    const vignette = this.add.graphics().setDepth(0);
    vignette.fillStyle(0x032e3e, 0.4);
    vignette.fillRect(0, 0, 1920, 1080);
    this.tweens.add({ targets: vignette, alpha: { from: 0.2, to: 0.4 }, duration: 4000, yoyo: true, repeat: -1 });
  }

{
    const bg = this.add.image(960, 540, 'UI_Short').setDepth(10);
    const bar = this.add.image(960, 550, 'Sound_Bar').setDepth(11);
    const toggle = this.add.image(1200, 550, 'Sound_Toggle').setInteractive().setDepth(12);
    const close = this.add.image(960, 670, 'Settings_Close').setInteractive().setDepth(12).setScale(0.5);
    const text = this.add.text(960, 600, '100%', { fontSize: '32px', color: '#000' }).setOrigin(0.5).setDepth(12);

    let isDragging = false;
    toggle.on('pointerdown', () => isDragging = true);
    this.input.on('pointerup', () => isDragging = false);
    this.input.on('pointermove', (pointer) => {
      if (!isDragging) return;
      const minX = 720;
      const maxX = 1200;
      toggle.x = Phaser.Math.Clamp(pointer.x, minX, maxX);
      const percent = Math.round(((toggle.x - minX) / (maxX - minX)) * 100);
      text.setText(`${percent}%`);
      this.music.setVolume(percent / 100);
    });

    close.on('pointerup', () => {
      bg.destroy(); bar.destroy(); toggle.destroy(); close.destroy(); text.destroy();
    });
  }

  update(_, delta) {
    this.swayTime += delta * 0.001;
    this.bubble.x = 960 + Math.sin(this.swayTime) * 30;
    const scale = 1 + Math.sin(this.swayTime * 1.5) * 0.01;
    this.bubble.setScale(scale);
    this.backgroundBubbles.forEach(b => {
      b.y -= b.speed;
      if (b.y < -50) {
        b.x = Phaser.Math.Between(0, 1920);
        b.y = Phaser.Math.Between(1100, 1500);
      }
    });
  }
}

class FishingScene extends Phaser.Scene {
  constructor() {
    super('FishingScene');
    this.fishTypes = [
      { name: 'Goldfish', points: 10, rarity: 0.4, frame: 'fish1.png' },
      { name: 'Trout', points: 30, rarity: 0.3, frame: 'fish2.png' },
      { name: 'Bass', points: 50, rarity: 0.2, frame: 'fish3.png' }
    ];
  }

  preload() {
    this.load.atlas('game', 'Assets/GameScene/Game_Spritesheet.png', 'Assets/GameScene/Game_Spritesheet.json');
    this.load.atlas('characters', 'Assets/GameScene/Char_Spritesheet.png', 'Assets/GameScene/CharSheet.json');
    this.load.atlas('fish', 'Assets/GameScene/Fish_Spritesheet.png', 'Assets/GameScene/FishSheet.json');
  }

  create() {
    // Setup background using atlas
    this.setupBackground();
    
    // Create character with animations
    this.setupCharacter();
    
    // Setup fishing mechanics
    this.setupFishing();
    
    // Create UI
    this.createUI();
  }

  setupBackground() {
    // Create parallax background layers
    for (let i = 1; i <= 8; i++) {
      this.add.sprite(960, 540, 'game', `bg${i}.png`)
        .setScrollFactor(i * 0.1)
        .setDepth(i);
    }
  }

  setupCharacter() {
    // Character animations
    this.anims.create({
      key: 'idle',
      frames: [
        { key: 'characters', frame: 'char_idle1.png' },
        { key: 'characters', frame: 'char_idle2.png' }
      ],
      frameRate: 2,
      repeat: -1
    });

    this.anims.create({
      key: 'casting',
      frames: [
        { key: 'characters', frame: 'char_throw.png' },
        { key: 'characters', frame: 'char_throw2.png' }
      ],
      frameRate: 5,
      repeat: 0
    });

    this.char = this.add.sprite(960, 640, 'characters')
      .play('idle')
      .setDepth(10);
  }

  setupFishing() {
    // Fishing line and bobber
    this.fishingLine = this.add.graphics();
    this.bobber = this.add.sprite(960, 740, 'game', 'fishing_bobber.png');
    
    // Fishing state machine
    this.gameState = 'idle';
  }

  startCasting() {
    this.gameState = 'casting';
    this.char.play('casting').once('animationcomplete', () => {
      // Casting animation complete logic
    });
  }

  update() {
    // Update fishing line position
    if (this.fishingLine.visible) {
      this.fishingLine.clear()
        .lineStyle(2, 0xffffff)
        .lineBetween(
          this.char.x, this.char.y + 50,
          this.bobber.x, this.bobber.y
        );
    }
  }
}

const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  scene: [MainMenu, FishingScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  audio: {
    disableWebAudio: false
  }
};

new Phaser.Game(config);
