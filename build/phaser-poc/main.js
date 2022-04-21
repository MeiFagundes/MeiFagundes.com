var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    pixelArt: true
};

var game = new Phaser.Game(config);
let gameHeight, gameWidth, keyVolUp, keyVolDown, actionKey, backgroundMusic, explosionSfx, keyYawMore, keyYawLess, keyRollRight, keyRollLeft, keyPitchLess, keyPitchMore;

function preload () {
    this.load.image('grass', 'assets/grass.jpg');
    this.load.image('tree', 'assets/tree1.png');
    this.load.spritesheet('mario', 
        'assets/mario.png',
        { frameWidth: 14, frameHeight: 20 }
    );

    this.load.audio('main_song', 'assets/audio/song_main.ogg');
    this.load.audio('sfx_bomb', 'assets/audio/sfx_bomb.ogg');
}

function create () {
    gameHeight = this.sys.canvas.height;
    gameWidth = this.sys.canvas.width;


    let background = this.add.image(gameWidth / 2, gameHeight / 2, 'grass');

    let trees = this.physics.add.staticGroup();

    let tree1 = trees.create(600, 50, 'tree').setScale(0.5).refreshBody();
    let tree2 = trees.create(500, 50, 'tree').setScale(0.5).refreshBody();
    let tree3 = trees.create(400, 50, 'tree').setScale(0.5).refreshBody();
    let tree4 = trees.create(300, 50, 'tree').setScale(0.5).refreshBody();
    let tree5 = trees.create(200, 50, 'tree').setScale(0.5).refreshBody();
    let tree6 = trees.create(100, 50, 'tree').setScale(0.5).refreshBody();
    let tree7 = trees.create(550, 150, 'tree').setScale(0.5).refreshBody();
    let tree8 = trees.create(450, 150, 'tree').setScale(0.5).refreshBody();
    let tree9 = trees.create(350, 150, 'tree').setScale(0.5).refreshBody();
    let tree10 = trees.create(250, 150, 'tree').setScale(0.5).refreshBody();
    let tree11 = trees.create(150, 150, 'tree').setScale(0.5).refreshBody();
    
    tree1.body.setSize(100, 120);
    tree2.body.setSize(100, 120);
    tree3.body.setSize(100, 120);
    tree4.body.setSize(100, 120);
    tree5.body.setSize(100, 120);
    tree6.body.setSize(100, 120);
    tree7.body.setSize(100, 120);
    tree8.body.setSize(100, 120);
    tree9.body.setSize(100, 120);
    tree10.body.setSize(100, 120);
    tree11.body.setSize(100, 120);

    player = this.physics.add.sprite(gameWidth / 2, gameHeight / 2, 'mario').setScale(3);

    let tree7b = trees.create(550, 450, 'tree').setScale(0.5).refreshBody();
    let tree8b = trees.create(450, 450, 'tree').setScale(0.5).refreshBody();
    let tree9b = trees.create(350, 450, 'tree').setScale(0.5).refreshBody();
    let tree10b = trees.create(250, 450, 'tree').setScale(0.5).refreshBody();
    let tree11b = trees.create(150, 450, 'tree').setScale(0.5).refreshBody();
    let tree1b = trees.create(600, 500, 'tree').setScale(0.5).refreshBody();
    let tree2b = trees.create(500, 500, 'tree').setScale(0.5).refreshBody();
    let tree3b = trees.create(400, 500, 'tree').setScale(0.5).refreshBody();
    let tree4b = trees.create(300, 500, 'tree').setScale(0.5).refreshBody();
    let tree5b = trees.create(200, 500, 'tree').setScale(0.5).refreshBody();
    let tree6b = trees.create(100, 500, 'tree').setScale(0.5).refreshBody();

    tree1b.body.setSize(100, 150);
    tree2b.body.setSize(100, 150);
    tree3b.body.setSize(100, 150);
    tree4b.body.setSize(100, 150);
    tree5b.body.setSize(100, 150);
    tree6b.body.setSize(100, 150);
    tree7b.body.setSize(0, -10);
    tree8b.body.setSize(0, -10);
    tree9b.body.setSize(0, -10);
    tree10b.body.setSize(0, -10);
    tree11b.body.setSize(0, -10);

    player.setCollideWorldBounds(true);

    this.physics.add.collider(trees, player);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('mario', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'front',
        frames: [ { key: 'mario', frame: 5 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'back',
        frames: [ { key: 'mario', frame: 9 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('mario', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    cursors = this.input.keyboard.createCursorKeys();

    backgroundMusic = this.sound.add('main_song', {loop: true});
    explosionSfx = this.sound.add('sfx_bomb');

    backgroundMusic.play();

    keyVolUp = this.input.keyboard.addKey('PLUS');
    keyVolDown = this.input.keyboard.addKey('MINUS');
    actionKey = this.input.keyboard.addKey('F');
    keyYawMore = this.input.keyboard.addKey('D');
    keyYawLess = this.input.keyboard.addKey('A');
    keyRollRight = this.input.keyboard.addKey('E');
    keyRollLeft = this.input.keyboard.addKey('Q');
    keyPitchMore = this.input.keyboard.addKey('W');
    keyPitchLess = this.input.keyboard.addKey('S');
}

function update () {
    

    // Audio

    if(Phaser.Input.Keyboard.JustDown(actionKey)) {
       let closeObjects = this.physics.overlapRect(player.x - 50, player.y - 50, 300, 200, true, true);
   
       if(closeObjects.filter((obj) => obj.gameObject.texture.key == 'tree').length != 0) {
           explosionSfx.play();
       }
    }

    if(isClose(player, {x: 550, y: 150}, 11) && Phaser.Input.Keyboard.JustDown(actionKey)) {
        console.log('Close');
        explosionSfx.play();
    }

    if(Phaser.Input.Keyboard.JustDown(keyVolUp)) {

        
        backgroundMusic.setVolume(backgroundMusic.volume + 0.2);
        console.log(backgroundMusic.volume);
    }

    if(Phaser.Input.Keyboard.JustDown(keyVolDown)) {

        if (0.2 > backgroundMusic.volume) {
            backgroundMusic.volume = 0;
        }
        else{
            backgroundMusic.setVolume(backgroundMusic.volume - 0.2);

            if(backgroundMusic.volume < 0)
                backgroundMusic.volume = 0;
        }
        console.log(backgroundMusic.volume);
    }

    // Rotation

    // Yaw

    // Less
    if(Phaser.Input.Keyboard.JustDown(keyYawLess)) {
        
        console.log("Player width: " + player.displayWidth + "px");
        
        
        if (player.displayWidth <= 42 && player.displayWidth >= -42) {
            player.displayWidth -= 10;
        }
        if (player.displayWidth < -42) {
            player.displayWidth = -42;
        }
    }

    // More
    if(Phaser.Input.Keyboard.JustDown(keyYawMore)) {

        console.log("Player width: " + player.displayWidth + "px");
        
        if (player.displayWidth <= 42 && player.displayWidth >= -42) {
            player.displayWidth += 10;
        }
        if (player.displayWidth > 42) {
            player.displayWidth = 42;
        }
    }

    // Pitch

    // Less
    if(Phaser.Input.Keyboard.JustDown(keyPitchLess)) {

        console.log("Player height: " + player.displayHeight + "px");

        if (player.displayHeight <= 60 && player.displayHeight >= -60) {
            player.displayHeight -= 10;
        }
        if (player.displayHeight < -60) {
            player.displayHeight = -60;
        }
    }

    // More
    if(Phaser.Input.Keyboard.JustDown(keyPitchMore)) {

        console.log("Player height: " + player.displayHeight + "px");
        
        if (player.displayHeight <= 60 && player.displayHeight >= -60) {
            player.displayHeight += 10;
        }
        if (player.displayHeight > 60) {
            player.displayHeight = 60;
        }
    }

    // Roll

    // Right
    if(Phaser.Input.Keyboard.JustDown(keyRollRight)) {

        console.log("Player angle: " + player.angle + "º");
        
        player.angle += 5;
    }

    // Left
    if(Phaser.Input.Keyboard.JustDown(keyRollLeft)) {

        console.log("Player angle: " + player.angle + "º");
        
        player.angle -= 5;
    }

    // Movement

    if (cursors.left.isDown && !cursors.right.isDown) {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }

    if (cursors.right.isDown && !cursors.left.isDown) {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }

    if (cursors.up.isDown && !cursors.down.isDown) {
        player.setVelocityY(-160);

        player.anims.play('right', true);
    }

    if (cursors.down.isDown && !cursors.up.isDown) {
        player.setVelocityY(+160);

        player.anims.play('left', true);
    }

    if (!cursors.left.isDown && !cursors.right.isDown) {
        player.setVelocityX(0);

    }

    if (!cursors.down.isDown && !cursors.up.isDown) {
        player.setVelocityY(0);

    }

    if (!cursors.down.isDown && !cursors.up.isDown && !cursors.left.isDown && !cursors.right.isDown) {
        player.anims.play('front', true);
    }
}

function isClose(a, b, radius) {
    return Math.sqrt(Phaser.Math.Distance.Between(a.x, a.y, b.x, b.y)) <= radius;
}