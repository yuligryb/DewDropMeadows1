class MainMenu extends Phaser.Scene {
  constructor() {
    super('MainMenu');
  }

  preload() {
    this.load.image('MM_Background', 'Assets/Main%20Menu/MM_Background.png');
    this.load.image('DDM_Logo', 'Assets/Main%20Menu/DDM_Logo.png');
    this.load.image('Start_Button', 'Assets/Main%20Menu/Start_Button.png');
    this.load.image('Quit_Button', 'Assets/Main%20Menu/Quit_Button.png');
    this.load.image('Settings_Button', 'Assets/Main%20Menu/Settings_Button.png');
    this.load.image('UI_Short', 'Assets/Main%20Menu/UI_Short.png');
    this.load.image('Sound_Bar', 'Assets/Main%20Menu/Sound_Bar.png');
    this.load.image('Sound_Toggle', 'Assets/Main%20Menu/Sound_Toggle.png');
    this.load.image('Settings_Close', 'Assets/Main%20Menu/Settings_Close.png');
    this.load.audio('Water_Sound', 'Assets/Main%20Menu/Water_Sound.mp3');
    this.load.spritesheet('Bubble_Sheet', 'Assets/Main%20Menu/Bubble_Sheet.png', {
      frameWidth: 1920,
      frameHeight: 1080
    });
    for (let i = 1; i <= 8; i++) {
      this.load.image(`BG${i}`, `Assets/Game%20Scene/BG${i}.png`);
    }
    this.load.image('PG_Fish_Book', 'Assets/Game%20Scene/PG_Fish_Book.png');
    this.load.image('PG_Shopping_Cart', 'Assets/Game%20Scene/PG_Shopping_Cart.png');

    this.load.image('Char_throw', 'Assets/Game%20Scene/Char_throw.png');
    this.load.image('Char_throw2', 'Assets/Game%20Scene/Char_throw2.png');
    this.load.image('Char_idle1', 'Assets/Game%20Scene/Char_idle1.png');
    this.load.image('Char_idle2', 'Assets/Game%20Scene/Char_idle2.png');
    this.load.image('Select_1', 'Assets/Game%20Scene/Select_1.png');
    this.load.image('Select_2', 'Assets/Game%20Scene/Select_2.png');
  }

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
      { name: 'Goldfish', points: 10, rarity: 0.4, texture: 'fish1' },
      { name: 'Trout', points: 30, rarity: 0.3, texture: 'fish2' },
      { name: 'Bass', points: 50, rarity: 0.2, texture: 'fish3' },
      { name: 'Legendary', points: 100, rarity: 0.1, texture: 'fish4' }
    ];
    this.score = 0;
    this.inventory = [];
  }

  preload() {
    // Load fishing-related assets
    for (let i = 1; i <= 8; i++) {
      this.load.image(`BG${i}`, `Assets/Game%20Scene/BG${i}.png`);
    }
    
    // Character sprites
    this.load.image('Char_idle1', 'Assets/Game%20Scene/Char_idle1.png');
    this.load.image('Char_idle2', 'Assets/Game%20Scene/Char_idle2.png');
    this.load.image('Char_throw', 'Assets/Game%20Scene/Char_throw.png');
    this.load.image('Char_throw2', 'Assets/Game%20Scene/Char_throw2.png');
    this.load.image('Char_reel', 'Assets/Game%20Scene/Char_reel.png');
    this.load.image('Char_catch', 'Assets/Game%20Scene/Char_catch.png');
    
    // UI elements
    this.load.image('Select_1', 'Assets/Game%20Scene/Select_1.png');
    this.load.image('Select_2', 'Assets/Game%20Scene/Select_2.png');
    this.load.image('PG_Fish_Book', 'Assets/Game%20Scene/PG_Fish_Book.png');
    this.load.image('PG_Shopping_Cart', 'Assets/Game%20Scene/PG_Shopping_Cart.png');
    
    // Fishing elements
    this.load.image('fishing_line', 'Assets/Game%20Scene/fishing_line.png');
    this.load.image('fishing_bobber', 'Assets/Game%20Scene/fishing_bobber.png');
    for (let i = 1; i <= 4; i++) {
      this.load.image(`fish${i}`, `Assets/Game%20Scene/fish${i}.png`);
    }
    this.load.image('splash', 'Assets/Game%20Scene/splash.png');
  }

  create() {
    // Setup background (same as NextScene)
    const cx = this.cameras.main.centerX;
    const cy = this.cameras.main.centerY;

    this.add.image(cx, cy, 'BG1').setDisplaySize(this.scale.width, this.scale.height).setDepth(1);
    this.sun = this.add.image(cx + 250, cy - 300, 'BG4').setScale(0.8).setDepth(4);
    this.tweens.add({ targets: this.sun, alpha: { from: 1, to: 0.7 }, duration: 2000, yoyo: true, repeat: -1 });

    this.clouds = this.add.image(cx, cy - 100, 'BG5').setDepth(5);
    this.trees = this.add.image(cx, cy, 'BG2').setDepth(2);
    this.add.image(cx, cy, 'BG3').setDepth(3);
    this.foilage = this.add.image(cx, cy, 'BG6').setDepth(6);
    this.add.image(cx, cy, 'BG7').setDepth(7);
    this.add.image(cx, cy, 'BG8').setDepth(8);

    // Create UI
    this.createUI();
    
    // Create character
    this.char = this.add.image(cx, cy + 100, 'Char_idle1').setDepth(9);
    this.idleState = 0;
    
    // Create idle animation
    this.time.addEvent({
      delay: 800,
      callback: () => {
        if (this.gameState === 'idle') {
          this.idleState = 1 - this.idleState;
          this.char.setTexture(this.idleState === 0 ? 'Char_idle1' : 'Char_idle2');
        }
      },
      loop: true
    });
    
    // Fishing elements
    this.fishingLine = this.add.image(cx, cy + 100, 'fishing_line').setVisible(false).setDepth(8);
    this.bobber = this.add.image(cx, cy + 200, 'fishing_bobber').setVisible(false).setDepth(8);
    
    // Game state
    this.gameState = 'idle'; // 'idle', 'casting', 'waiting', 'reeling', 'caught'
    
    // Score text
    this.scoreText = this.add.text(50, 50, 'Score: 0', { 
      fontSize: '32px', 
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 4
    }).setDepth(20);
    
    // Set up fishing interaction
    this.setupFishing();
  }
  
  createUI() {
    const book = this.add.image(0, 0, 'PG_Fish_Book')
      .setOrigin(1, 1)
      .setScale(0.5)
      .setInteractive()
      .setDepth(10);
    const cart = this.add.image(0, 0, 'PG_Shopping_Cart')
      .setOrigin(1, 1)
      .setScale(0.5)
      .setInteractive()
      .setDepth(10);
    
    cart.setPosition(this.cameras.main.width - 40, this.cameras.main.height - 40);
    book.setPosition(cart.x - cart.displayWidth - 20, this.cameras.main.height - 40);

    book.on('pointerdown', () => {
      book.setTint(0xcccccc);
      this.showInventory();
    });
    book.on('pointerup', () => book.clearTint());
    
    cart.on('pointerdown', () => cart.setTint(0xcccccc));
    cart.on('pointerup', () => {
      cart.clearTint();
      // Add shop functionality here
    });
  }
  
  showInventory() {
    // Create inventory display
    const inventoryWindow = this.add.graphics()
      .fillStyle(0x032e3e, 0.9)
      .fillRoundedRect(200, 100, 1520, 880, 20)
      .setDepth(15);
    
    const closeButton = this.add.text(1800, 120, 'X', { 
      fontSize: '48px', 
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 4
    }).setInteractive().setDepth(16);
    
    closeButton.on('pointerup', () => {
      inventoryWindow.destroy();
      closeButton.destroy();
      // Destroy any inventory items displayed
    });
    
    // Display caught fish
    if (this.inventory.length === 0) {
      this.add.text(960, 540, 'No fish caught yet!', { 
        fontSize: '48px', 
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 4
      }).setOrigin(0.5).setDepth(16);
    } else {
      // Display fish in inventory
      // Implement grid or list display of caught fish
    }
  }
  
  setupFishing() {
    this.input.on('pointerdown', () => {
      if (this.gameState === 'idle') {
        this.startCasting();
      } else if (this.gameState === 'waiting') {
        // Too early - scare fish away
        this.bobber.setTexture('fishing_bobber');
        this.time.delayedCall(500, () => {
          this.resetFishing();
          this.showMessage('Too early! Fish got away!');
        });
      } else if (this.gameState === 'reeling') {
        this.catchFish();
      }
    });
  }
  
  startCasting() {
    this.gameState = 'casting';
    this.char.setTexture('Char_throw');
    
    this.time.delayedCall(300, () => {
      this.char.setTexture('Char_throw2');
      this.fishingLine.setVisible(true);
      this.bobber.setVisible(true);
      
      // Animate casting
      const castTween = this.tweens.add({
        targets: [this.bobber, this.fishingLine],
        y: `+=300`,
        duration: 500,
        ease: 'Power2',
        onComplete: () => {
          this.gameState = 'waiting';
          this.startWaitingForFish();
        }
      });
    });
  }
  
  startWaitingForFish() {
    // Random wait time between 2-8 seconds
    const waitTime = Phaser.Math.Between(2000, 8000);
    
    this.waitTimer = this.time.delayedCall(waitTime, () => {
      if (this.gameState === 'waiting') {
        this.bobber.setTexture('splash');
        this.gameState = 'reeling';
        
        // Fish will escape if not caught soon
        this.escapeTimer = this.time.delayedCall(1500, () => {
          if (this.gameState === 'reeling') {
            this.resetFishing();
            this.showMessage('Too slow! Fish got away!');
          }
        });
      }
    });
  }
  
  catchFish() {
    this.gameState = 'caught';
    this.char.setTexture('Char_reel');
    
    // Determine which fish was caught based on rarity
    const rand = Math.random();
    let cumulativeRarity = 0;
    let caughtFish = null;
    
    for (const fish of this.fishTypes) {
      cumulativeRarity += fish.rarity;
      if (rand <= cumulativeRarity) {
        caughtFish = fish;
        break;
      }
    }
    
    // Add to inventory and score
    this.inventory.push(caughtFish);
    this.score += caughtFish.points;
    this.scoreText.setText(`Score: ${this.score}`);
    
    // Show fish caught
    const fishSprite = this.add.image(this.bobber.x, this.bobber.y, caughtFish.texture)
      .setScale(0.5)
      .setDepth(9);
    
    // Animate reeling in
    this.tweens.add({
      targets: [this.bobber, this.fishingLine, fishSprite],
      y: `-=300`,
      duration: 800,
      ease: 'Power2',
      onComplete: () => {
        this.char.setTexture('Char_catch');
        this.showMessage(`Caught a ${caughtFish.name}! +${caughtFish.points}pts`);
        
        this.time.delayedCall(1000, () => {
          fishSprite.destroy();
          this.resetFishing();
        });
      }
    });
  }
  
  resetFishing() {
    this.fishingLine.setVisible(false);
    this.bobber.setVisible(false);
    this.bobber.setTexture('fishing_bobber');
    
    if (this.waitTimer) this.waitTimer.destroy();
    if (this.escapeTimer) this.escapeTimer.destroy();
    
    this.gameState = 'idle';
    this.char.setTexture('Char_idle1');
  }
  
  showMessage(text) {
    const message = this.add.text(960, 200, text, {
      fontSize: '36px',
      color: '#ffffff',
      stroke: '#000000',
      strokeThickness: 4,
      backgroundColor: '#032e3e',
      padding: { x: 20, y: 10 }
    }).setOrigin(0.5).setDepth(20);
    
    this.tweens.add({
      targets: message,
      alpha: 0,
      delay: 1500,
      duration: 500,
      onComplete: () => message.destroy()
    });
  }

  update(_, delta) {
    // Update background animations
    this.swayTime = (this.swayTime || 0) + delta * 0.001;
    this.trees.x = this.cameras.main.centerX + Math.sin(this.swayTime) * 5;
    this.foilage.x = this.cameras.main.centerX + Math.sin(this.swayTime + 1) * 5;
    this.clouds.x += 0.8;
    if (this.clouds.x > this.cameras.main.width + 200) this.clouds.x = -200;
    
    // Update fishing line position to follow character
    if (this.fishingLine.visible) {
      this.fishingLine.x = this.char.x;
      this.fishingLine.y = this.char.y + 50;
      this.fishingLine.setRotation(Phaser.Math.Angle.BetweenPoints(
        { x: this.char.x, y: this.char.y + 50 },
        { x: this.bobber.x, y: this.bobber.y }
      ));
      this.fishingLine.setDisplaySize(10, Phaser.Math.Distance.Between(
        this.char.x, this.char.y + 50,
        this.bobber.x, this.bobber.y
      ));
    }
  }
}


const config = {
  type: Phaser.AUTO,
  width: 1920,
  height: 1080,
  backgroundColor: '#000000',
  scene: [MainMenu, FishingScene], // Updated scene list
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  audio: {
    disableWebAudio: false
  }
};

new Phaser.Game(config);
