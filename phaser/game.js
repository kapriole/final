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

const game = new Phaser.Game(config);

    let map;
    let groundLayer;
    let player;
    let stars;
    let bombs;
    let platforms;
    let cursors;
let score = 0;
let life = 0;
    let gameOver = false;
    let scoreText;
    let gameStart = false;


function preload() {
        /// load assets
        this.load.image("title", "assets/images/title.png");
        this.load.image("star", "assets/star.png"); //pizza
        this.load.image("bomb", "assets/bomb.png"); //corona

        // Load player animations from the player spritesheet and atlas JSON / or atlas
        this.load.spritesheet("dude", "assets/dude.png", { 
            frameWidth: 32,
            frameHeight: 48,
        });

        /// GAMEOVER
        this.load.image("gameover", "assets/gameover.gif");

        /// LOADING MY TILES
        this.load.image("background", "assets/tilemaps/urban_night_black.png"); // I dont think I need this
        this.load.image("obstacle", "assets/tilemaps/toxic_water.png"); // the cactuses are also obstacle / just hide the same object behind?
        this.load.image("water", "assets/tilemaps/water.png");
        this.load.image("tiles", "assets/tilemaps/corona_tiles.png");
        this.load.tilemapTiledJSON(
                    "map",
                    "assets/tilemaps/level_one.json"
        );

        // also add every element so phaser can render it

        // moving platform
        this.load.image("block", "assets/platform.png");


    }
function create() {

            // title = this.add.image(400, 300, "title");
            ///////// set the object from background to foreground

            const map = this.make.tilemap({ key: "map" });
            const tileset = map.addTilesetImage("corona_tiles", "tiles"); //this must be the same name as the file inside tiled/the loaded image
            //let obstacles = map.addTilesetImage("toxic_water", "obstacle");

            ////
            function resetPlayer() {
                player.reset(200, 600); // postion of the player
            };

            map.setTileIndexCallback(294, this.resetPlayer, this); // the tile ID

            // check what exactly is platformer?
            const backGroundPicture = map.addTilesetImage(
                "urban_night_black",
                "background"
            );

            const backgroundLayer = map.createDynamicLayer(
                "Background",
                backGroundPicture,
                0,
                0
            );

            console.log("tileset", tileset);

            const platforms = map.createDynamicLayer(
                "Platforms",
                tileset,
                0,
                0
            );

            platforms.setCollisionByExclusion([-1]);

            /// add obstacels
            
            obstacles = this.physics.add.group({
                key: "obstacle",
                allowGravity: false,
                immovable: true,
            });


            const obstacleObjects = map.getObjectLayer("Toxic")["objects"]; // check this Layer name is "Toxic" and another property is objects
            console.log("obstacleObjects", obstacleObjects);

            /// obstacleObjects has all the objects in it but they have no name

            obstacleObjects.forEach((obstacleObject) => {
                // Add new spikes to our sprite group, change the start y position to meet the platform
                const obstacle = obstacles
                    .create(
                        obstacleObject.x,
                        obstacleObject.y - obstacleObject.height,
                        "obstacle"
                    )
                    .setOrigin(0, 0);
                obstacle.body
                    .setSize(obstacle.width, obstacle.height - 20)
                    .setOffset(0, 20);
                return obstacle;
            });


            //// add rotating plaforms

            /*
            Create platforms at the point locations in the "Platform Locations" layer created in Tiled
            map.getObjectLayer("Platform Locations").objects.forEach(point => {
                createRotatingPlatform(this, point.x, point.y);
            });
            */
        
            // set coliision with player Collision with Player

            // set the boundaries of our game world
            this.physics.world.bounds.width = platforms.width;
            this.physics.world.bounds.height = platforms.height;

            // The player and its settings
            player = this.physics.add.sprite(100, 300, "dude");
            player.setBounce(0.1);
            player.setCollideWorldBounds(true);

            // in case I have to resize
            player.body.setSize(player.width - 10, player.height - 18);

            //  Our player animations, turning, walking left and walking right.
            this.anims.create({
                key: "left",
                frames: this.anims.generateFrameNumbers("dude", {
                    start: 0,
                    end: 3,
                }),
                frameRate: 12,
                repeat: -1,
            });

            this.anims.create({
                key: "turn",
                frames: [{ key: "dude", frame: 4 }],
                frameRate: 20,
            });

            this.anims.create({
                key: "right",
                frames: this.anims.generateFrameNumbers("dude", {
                    start: 5,
                    end: 8,
                }),
                frameRate: 12,
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

            // why is obstacle undefined?
         
            //  The score 
    scoreText = this.add.text(16, 16, "score: 0", {
        visibility: "visible",
        fontFamily: "font1",
                fontSize: "32px",
                fill: "#f111d4",
            });

            scoreText.setScrollFactor(0);

            /// why does score disappear?

             //  The score
            scoreTextLife = this.add.text(32, 32, "<3: 0", {
                visibility: "hidden",
                fontFamily: "font1",
                fontSize: "32px",
                fill: "#f111d4",
            });

            scoreTextLife.setScrollFactor(0);

            /// do the same with platforms and everything that colides

            //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
            this.physics.add.overlap(player, stars, collectStar, null, this);

            this.physics.add.collider(player, bombs, hitBomb, null, this);

    // obstacle is undefined :(
            /*
            this.physics.add.collider(
                obstacle,
                player,
                playerCollide,
                null,
                this
            );
            */
    

    /// add some more plattform thruout the game
    
            let block = this.physics.add
                .image(100, 320, "block")
                .setImmovable(true)
                .setVelocity(100, -100);

            block.body.setAllowGravity(false);

            
            this.physics.add.collider(block, player);

            this.physics.add.collider(block, platforms);
    

            // set bounds so the camera won't go outside the game world
            this.cameras.main.setBounds(
                0,
                0,
                map.widthInPixels,
                map.heightInPixels
            );
            // make the camera follow the player
            this.cameras.main.startFollow(player);

            // set background color, so the sky is not black
            //this.cameras.main.setBackgroundColor('#ccccff');
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

            if (
                (cursors.space.isDown || cursors.up.isDown) &&
                player.body.onFloor()
            ) {
                player.setVelocityY(-280);
                player.setGravityY(150);
            }

            //// add a score for extra Life OKK
            if (score >= 500) {
                console.log("add a life and delte score");
                score -= 500;
                //tint the color depending on the current score
                life += 1;
                
                scoreTextLife.setText("<3: " + life, { visibility: "visible" });
                
                console.log("score", score);
                console.log("life", life);

            } 
        }

        /// star is pizza pieces now

        // add hearts and big pizza pieces and make a life score 


        function collectStar(player, star) {
            star.disableBody(true, true);

            //  Add and update the score
            score += 400;
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

        /*
        
function playerCollide(player, obstacle) {
    score -= 10;
    scoreText.setText("Score: " + score);

    player.setVelocity(0, 0);
    player.setX(100);
    player.setY(300);
    player.play("right", true);
    player.setAlpha(0);
   /// make the player lose some score 
}
*/

function hitBomb(player, bomb) {

    console.log("life", life);
            
    if (life >= 1) {
        life--;
        scoreTextLife.setText("<3:" + life);

        player.anims.play("turn");

        /// it works add a cool effect

        // make the a bit green
        return;
    } else {

          player.setTint(0x7cc233);

          // here you can change the color or whatever should happen

          player.anims.play("turn");

          gameOver = true;

    }

          
            // add a game over screen

            if (gameOver) {
                              this.physics.pause(); // apparently stays pause when restarted

                              let gameoverscreen = this.physics.add.image(
                                  400,
                                  320,
                                  "gameover"
                              );
                              gameoverscreen.setScrollFactor(0);
                              gameoverscreen.setInteractive();

                              console.log("gameoverscreen", gameoverscreen);

                              gameoverscreen.on(
                                  "pointerdown",
                                  function () {
                                      console.log("mouse is down!");
                                      //text.setText("Game OVER");
                                      //this.scene.restart();
                                      console.log("this", this);
                                      this.scene.restart("game");
                                      console.log("gameOver", gameOver);                                         
                                      gameOver = false;
                                      return;
                                  },
                                  this
                              );

                              return;

                              // yeah it worked! don't forget to put this inside the parenthesis

                              // works but make it happen on mouseclickevent
                              //this.registry.destroy();
                              //this.events.off();

                              // character is not movin when restarted
                              // had to set gameOver to false !

                              // https://photonstorm.github.io/phaser3-docs/Phaser.Scenes.SceneManager.html
                              // https://rexrainbow.github.io/phaser3-rex-notes/docs/site/scenemanager/
                              // https://phaser.io/phaser3/contributing/part5
                          }

}



/*
function startScreen() {
    gameStart = true;
    console.log("gameStart happening?");

    // add a game over screen

    if (gameStart) {
        let title;

        title.add.image(400, 350, "title");

        title.setInteractive();

        console.log("startscreen", title);

        title.on(
            "pointerdown",
            function () {
                console.log("mouse is down!");
                //text.setText("Game OVER");
                //this.scene.restart();
                console.log("gameOver", gameStart);
                gameStart = false;
                return;
            },
            this
        );
    }
}
*/
/// just make a function for the titlescreeen 

/// wit a clickhandler



        
              

        ///// put sth in middle of the canvas
        //this.face = this.add.image(game.config.width / 2, game.config.height / 2, "face");

        /// listen for clicks on an object
        //gameoverscreen

        /// Mutations-Ereignisse sollten nicht mehr verwendet werden. Verwenden Sie MutationObserver stattdessen.

        // make another scene

