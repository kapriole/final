
    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: "game",
        physics: {
            default: "arcade",
            arcade: {
                gravity: { y: 300 },
                debug: false// what happens here?
            }
        },
        scene: {
            key: 'game',
            preload: preload,
            create: create,
            update: update,
        },
};
    // FIRST LEVEL SCENE

    const game = new Phaser.Game(config);

    let map;
    let groundLayer;
    let player;
    let stars;
    let bombs;
    let platforms;
    let cursors;
    let score = 0;
    let gameOver = false;
    let scoreText;

    function preload() {
        console.log("this", this);
        console.log("game", game);
        //this.load.image("sky", "assets/sky.png");
        //this.load.image("ground", "assets/platform.png"); // check if this can be seperate
        this.load.image("star", "assets/star.png"); //pizza
        this.load.image("bomb", "assets/bomb.png"); //corona
        this.load.image("gameover", "assets/gameover.gif");
          // Load player animations from the player spritesheet and atlas JSON / or atlas
        this.load.spritesheet("dude", "assets/dude.png", { // change the dude to ninja
            frameWidth: 32,
            frameHeight: 48,
        });
        /// LOADING MY TILES
        this.load.image("tiles", "assets/tilemaps/corona_tiles.png");
        this.load.tilemapTiledJSON(
                    "map",
                    "assets/tilemaps/level1.json"
        );
        //also import the "spikes"

        // also add every element so phaser can render it
    }
        function create() {

            /////////////// test tiles

            const map = this.make.tilemap({ key: 'map' });
            const tileset = map.addTilesetImage("corona_tiles", "tiles"); //this must be the name of the tiles file inside tiled
            // check what exactly is platformer?

            console.log("tileset", tileset);
            // didnt work
            // const backgroundLayer = this.add.image(0, 0, "Background").setOrigin(0, 0);
            // backgroundImage.setScale(2, 0.8);

            const platforms = map.createDynamicLayer("Platform", tileset, 0, 200); // 3 is the layer in the file not in json why?
            platforms.setCollisionByExclusion([-1]);

            
            // set the boundaries of our game world
            this.physics.world.bounds.width = platforms.width;
            this.physics.world.bounds.height = platforms.height;

            // The player and its settings
            player = this.physics.add.sprite(100, 300, "dude");
            player.setBounce(0.2);
            player.setCollideWorldBounds(true);

            // in case I have to resize
            player.body.setSize(player.width, player.height - 8);
            
            //  Our player animations, turning, walking left and walking right.
            this.anims.create({
                key: "left",
                frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
                frameRate: 10,
                repeat: -1,
            });

            this.anims.create({
                key: "turn",
                frames: [{ key: "dude", frame: 4 }],
                frameRate: 20,
            });

            this.anims.create({
                key: "right",
                frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
                frameRate: 10,
                repeat: -1,
            });

            //  Input Events
            cursors = this.input.keyboard.createCursorKeys();

            //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
            stars = this.physics.add.group({
                key: "star",
                repeat: 0, // use to be 11
                setXY: { x: 12, y: 0, stepX: 70 },
            });

            stars.children.iterate(function (child) {
                //  Give each star a slightly different bounce
                child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            });

            bombs = this.physics.add.group();


            // you have to set this after you created the object
            this.physics.add.collider(platforms, player);
            this.physics.add.collider(platforms, stars);
            this.physics.add.collider(platforms, bombs);            

            //  The score
            scoreText = this.add.text(16, 16, "score: 0", {
                fontSize: "32px",
                fill: "#f111d4"
            });

            scoreText.setScrollFactor(0);


            /// do the same with platforms and everything that colides

            //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
            this.physics.add.overlap(player, stars, collectStar, null, this);

            this.physics.add.collider(player, bombs, hitBomb, null, this);

            
            // set bounds so the camera won't go outside the game world
            this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
            // make the camera follow the player
            this.cameras.main.startFollow(player);

            // set background color, so the sky is not black    
            this.cameras.main.setBackgroundColor('#ccccff');

        }


        function update() {
            if (gameOver) {
                return;
            }

            if (cursors.left.isDown) {
                player.setVelocityX(-200);

                player.anims.play("left", true);
            } else if (cursors.right.isDown) {
                player.setVelocityX(200);

                player.anims.play("right", true);
            } else {
                player.setVelocityX(0);

                player.anims.play("turn");
            }

            if (cursors.up.isDown && player.body.onFloor()) {
            // add && player.body.touching.down
            player.setVelocityY(-330);
                                   }
        }

        /// star is pizza pieces now

        // add hearts and big pizza pieces and make a life score 


        function collectStar(player, star) {
            star.disableBody(true, true);

            //  Add and update the score
            score += 10;
            scoreText.setText("Score: " + score);

            if (stars.countActive(true) === 0) {
                //  A new batch of stars to collect
                stars.children.iterate(function (child) {
                    child.enableBody(true, child.x, 0, true, true);
                });

                let x =
                    player.x < 400
                        ? Phaser.Math.Between(400, 800)
                        : Phaser.Math.Between(0, 400);

                let bomb = bombs.create(x, 16, "bomb");
                bomb.setBounce(0.8);
                bomb.setCollideWorldBounds(true);
                bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
                bomb.allowGravity = false;
            }
        }

        function hitBomb(player, bomb) {
            this.physics.pause();

            player.setTint(0x7cc233);
            // here you can change the color or whatever should happen

            player.anims.play("turn");

            gameOver = true;

            // add a game over screen

            if (gameOver) {
                let gameoverscreen = this.physics.add.image(
                                  400,
                                  320,
                                  "gameover"
                              );
                gameoverscreen.setScrollFactor(0);
                              // works but make it happen on mouseclickevent
                //this.registry.destroy();
                //this.events.off();
                this.scene.restart();
                        

                              // https://photonstorm.github.io/phaser3-docs/Phaser.Scenes.SceneManager.html
                              // https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scenemanager/
                              // https://phaser.io/phaser3/contributing/part5
                          }

        }
